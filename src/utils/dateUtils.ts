/**
 * Utility functions for handling dates in AsyncStorage
 */

/**
 * Interface to define which fields should be converted to Date objects
 */
export interface DateFields {
  [key: string]: string[] | DateFields;
}

/**
 * Convert string dates back to Date objects after AsyncStorage retrieval
 */
export function deserializeDates<T>(obj: T, dateFields: string[]): T {
  if (!obj || typeof obj !== 'object') return obj;

  const result = { ...obj } as any;

  dateFields.forEach(field => {
    if (result[field] && typeof result[field] === 'string') {
      const date = new Date(result[field]);
      // Only convert if it's a valid date
      if (!isNaN(date.getTime())) {
        result[field] = date;
      }
    }
  });

  return result;
}

/**
 * Convert dates in an array of objects
 */
export function deserializeDatesInArray<T>(array: T[], dateFields: string[]): T[] {
  return array.map(item => deserializeDates(item, dateFields));
}

/**
 * Safe date formatting function that handles both Date objects and strings
 */
export function formatDate(date: Date | string, locale: string = 'pt-BR', options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  
  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(dateObj);
}

/**
 * Parse ISO date string safely
 */
export function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}