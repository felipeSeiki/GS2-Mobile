export interface User {
  id: string;
  name: string;
  email: string;
  type: 'candidate' | 'company';
  skills?: string[];
  company?: string;
  companyDescription?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  skills?: string[];
  type: 'candidate' | 'company';
  company?: string;
  companyDescription?: string;
}

export class AuthService {
  private static currentUser: User | null = null;
  private static users: User[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      type: 'candidate',
      skills: ['React Native', 'TypeScript', 'Node.js'],
    },
    {
      id: '2',
      name: 'TechCorp',
      email: 'maria@empresa.com',
      type: 'company',
      company: 'TechCorp',
      companyDescription: 'Empresa líder em soluções tecnológicas inovadoras, focada em transformação digital.',
    },
  ];

  static async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = this.users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // For demo purposes, accept any password
    this.currentUser = user;
    return user;
  }

  static async register(data: RegisterData): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = this.users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('E-mail já cadastrado');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      type: data.type,
      skills: data.skills,
      company: data.type === 'company' ? data.name : data.company,
      companyDescription: data.companyDescription,
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    return newUser;
  }

  static async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    this.currentUser = null;
  }

  static getCurrentUser(): User | null {
    return this.currentUser;
  }

  static isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}