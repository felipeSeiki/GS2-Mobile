import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Generic AsyncStorage service for CRUD operations
 * Provides a base for all data persistence in the app
 */
export class BaseStorageService<T extends { id: string }> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  /**
   * Get all items from storage
   */
  async getAll(): Promise<T[]> {
    try {
      const data = await AsyncStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error getting all ${this.storageKey}:`, error);
      return [];
    }
  }

  /**
   * Get item by ID
   */
  async getById(id: string): Promise<T | null> {
    try {
      const items = await this.getAll();
      return items.find(item => item.id === id) || null;
    } catch (error) {
      console.error(`Error getting ${this.storageKey} by id:`, error);
      return null;
    }
  }

  /**
   * Create new item
   */
  async create(item: Omit<T, 'id'> & { id?: string }): Promise<T> {
    try {
      const items = await this.getAll();
      
      // Generate ID if not provided
      const newItem: T = {
        ...item,
        id: item.id || this.generateId(),
      } as T;

      items.push(newItem);
      await this.saveAll(items);
      
      return newItem;
    } catch (error) {
      console.error(`Error creating ${this.storageKey}:`, error);
      throw error;
    }
  }

  /**
   * Update existing item
   */
  async update(id: string, updates: Partial<Omit<T, 'id'>>): Promise<T | null> {
    try {
      const items = await this.getAll();
      const index = items.findIndex(item => item.id === id);
      
      if (index === -1) {
        return null;
      }

      const updatedItem = { ...items[index], ...updates };
      items[index] = updatedItem;
      
      await this.saveAll(items);
      return updatedItem;
    } catch (error) {
      console.error(`Error updating ${this.storageKey}:`, error);
      throw error;
    }
  }

  /**
   * Delete item by ID
   */
  async delete(id: string): Promise<boolean> {
    try {
      const items = await this.getAll();
      const filteredItems = items.filter(item => item.id !== id);
      
      if (items.length === filteredItems.length) {
        return false; // Item not found
      }

      await this.saveAll(filteredItems);
      return true;
    } catch (error) {
      console.error(`Error deleting ${this.storageKey}:`, error);
      return false;
    }
  }

  /**
   * Save all items to storage
   */
  async saveAll(items: T[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error(`Error saving all ${this.storageKey}:`, error);
      throw error;
    }
  }

  /**
   * Clear all items from storage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error(`Error clearing ${this.storageKey}:`, error);
      throw error;
    }
  }

  /**
   * Check if item exists
   */
  async exists(id: string): Promise<boolean> {
    const item = await this.getById(id);
    return item !== null;
  }

  /**
   * Find items by condition
   */
  async findBy(predicate: (item: T) => boolean): Promise<T[]> {
    try {
      const items = await this.getAll();
      return items.filter(predicate);
    } catch (error) {
      console.error(`Error finding ${this.storageKey}:`, error);
      return [];
    }
  }

  /**
   * Find single item by condition
   */
  async findOneBy(predicate: (item: T) => boolean): Promise<T | null> {
    try {
      const items = await this.getAll();
      return items.find(predicate) || null;
    } catch (error) {
      console.error(`Error finding one ${this.storageKey}:`, error);
      return null;
    }
  }

  /**
   * Count items
   */
  async count(): Promise<number> {
    try {
      const items = await this.getAll();
      return items.length;
    } catch (error) {
      console.error(`Error counting ${this.storageKey}:`, error);
      return 0;
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Initialize storage with default data if empty
   */
  async initializeWithDefaults(defaultData: T[]): Promise<void> {
    try {
      const existingData = await this.getAll();
      if (existingData.length === 0) {
        await this.saveAll(defaultData);

      }
    } catch (error) {
      console.error(`Error initializing ${this.storageKey}:`, error);
      throw error;
    }
  }
}