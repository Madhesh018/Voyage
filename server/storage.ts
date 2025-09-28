import { 
  type User, 
  type InsertUser, 
  type ContactMessage,
  type InsertContactMessage,
  type CustomPackageRequest,
  type InsertCustomPackageRequest,
  type LoginCredentials
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUser(credentials: LoginCredentials): Promise<User | null>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Custom package request methods
  createCustomPackageRequest(request: InsertCustomPackageRequest): Promise<CustomPackageRequest>;
  getCustomPackageRequests(): Promise<CustomPackageRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private customPackageRequests: Map<string, CustomPackageRequest>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.customPackageRequests = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async validateUser(credentials: LoginCredentials): Promise<User | null> {
    const user = await this.getUserByEmail(credentials.email);
    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createCustomPackageRequest(insertRequest: InsertCustomPackageRequest): Promise<CustomPackageRequest> {
    const id = randomUUID();
    const request: CustomPackageRequest = {
      ...insertRequest,
      id,
      children: insertRequest.children ?? 0,
      createdAt: new Date()
    };
    this.customPackageRequests.set(id, request);
    return request;
  }

  async getCustomPackageRequests(): Promise<CustomPackageRequest[]> {
    return Array.from(this.customPackageRequests.values());
  }
}

export const storage = new MemStorage();
