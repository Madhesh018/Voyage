import { 
  type User, 
  type InsertUser, 
  type ContactMessage,
  type InsertContactMessage,
  type CustomPackageRequest,
  type InsertCustomPackageRequest,
  type LoginCredentials,
  users,
  contactMessages,
  customPackageRequests
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
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

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export class PostgresStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async validateUser(credentials: LoginCredentials): Promise<User | null> {
    const user = await this.getUserByEmail(credentials.email);
    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const result = await db.insert(contactMessages).values(insertMessage).returning();
    return result[0];
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  async createCustomPackageRequest(insertRequest: InsertCustomPackageRequest): Promise<CustomPackageRequest> {
    const result = await db.insert(customPackageRequests).values(insertRequest).returning();
    return result[0];
  }

  async getCustomPackageRequests(): Promise<CustomPackageRequest[]> {
    return await db.select().from(customPackageRequests);
  }
}

export const storage = new PostgresStorage();
