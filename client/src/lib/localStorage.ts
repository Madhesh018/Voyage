import type { 
  User, 
  InsertUser, 
  ContactMessage,
  InsertContactMessage,
  CustomPackageRequest,
  InsertCustomPackageRequest,
  LoginCredentials
} from "../../../shared/schema";

export interface ILocalStorage {
  // User methods
  getUser(id: string): User | undefined;
  getUserByEmail(email: string): User | undefined;
  createUser(user: InsertUser): User;
  validateUser(credentials: LoginCredentials): User | null;
  getCurrentUser(): User | null;
  setCurrentUser(user: User | null): void;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): ContactMessage;
  getContactMessages(): ContactMessage[];
  
  // Custom package request methods
  createCustomPackageRequest(request: InsertCustomPackageRequest): CustomPackageRequest;
  getCustomPackageRequests(): CustomPackageRequest[];
}

export class LocalStorageService implements ILocalStorage {
  private readonly STORAGE_KEYS = {
    USERS: 'kv_travel_users',
    CONTACT_MESSAGES: 'kv_travel_contact_messages',
    CUSTOM_PACKAGES: 'kv_travel_custom_packages',
    CURRENT_USER: 'kv_travel_current_user'
  };

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  private getFromStorage<T>(key: string): T[] {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage<T>(key: string, data: T[]): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  // User methods
  getUser(id: string): User | undefined {
    const users = this.getFromStorage<User>(this.STORAGE_KEYS.USERS);
    return users.find(user => user.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    const users = this.getFromStorage<User>(this.STORAGE_KEYS.USERS);
    return users.find(user => user.email === email);
  }

  createUser(insertUser: InsertUser): User {
    const users = this.getFromStorage<User>(this.STORAGE_KEYS.USERS);
    const newUser: User = {
      id: this.generateId(),
      ...insertUser,
      createdAt: new Date()
    };
    
    users.push(newUser);
    this.saveToStorage(this.STORAGE_KEYS.USERS, users);
    return newUser;
  }

  validateUser(credentials: LoginCredentials): User | null {
    const user = this.getUserByEmail(credentials.email);
    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  }

  getCurrentUser(): User | null {
    const userData = window.localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
    return userData ? JSON.parse(userData) : null;
  }

  setCurrentUser(user: User | null): void {
    if (user) {
      window.localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
    }
  }

  // Contact message methods
  createContactMessage(insertMessage: InsertContactMessage): ContactMessage {
    const messages = this.getFromStorage<ContactMessage>(this.STORAGE_KEYS.CONTACT_MESSAGES);
    const newMessage: ContactMessage = {
      id: this.generateId(),
      ...insertMessage,
      createdAt: new Date()
    };
    
    messages.push(newMessage);
    this.saveToStorage(this.STORAGE_KEYS.CONTACT_MESSAGES, messages);
    return newMessage;
  }

  getContactMessages(): ContactMessage[] {
    return this.getFromStorage<ContactMessage>(this.STORAGE_KEYS.CONTACT_MESSAGES);
  }

  // Custom package request methods
  createCustomPackageRequest(insertRequest: InsertCustomPackageRequest): CustomPackageRequest {
    const requests = this.getFromStorage<CustomPackageRequest>(this.STORAGE_KEYS.CUSTOM_PACKAGES);
    const newRequest: CustomPackageRequest = {
      id: this.generateId(),
      ...insertRequest,
      children: insertRequest.children ?? 0,
      startDate: insertRequest.startDate ?? null,
      additionalDetails: insertRequest.additionalDetails ?? null,
      createdAt: new Date()
    };
    
    requests.push(newRequest);
    this.saveToStorage(this.STORAGE_KEYS.CUSTOM_PACKAGES, requests);
    return newRequest;
  }

  getCustomPackageRequests(): CustomPackageRequest[] {
    return this.getFromStorage<CustomPackageRequest>(this.STORAGE_KEYS.CUSTOM_PACKAGES);
  }
}

export const localStorageService = new LocalStorageService();