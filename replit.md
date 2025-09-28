# Kv Tours & Travels Website

## Overview

This is a full-stack travel agency website for "Kv Tours & Travels" built with a modern technology stack. The application features a React frontend with TypeScript, an Express.js backend, and includes user authentication, contact management, and travel package browsing functionality. The website allows users to explore travel packages, submit contact inquiries, request custom packages, and create user accounts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Icons**: Lucide React icons with React Icons for social media icons

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured through environment variables
- **Session Management**: In-memory storage for development (expandable to database sessions)
- **API Design**: RESTful API with structured error handling and logging middleware

### Database Schema
The application uses three main database tables:
- **users**: Stores user authentication data (firstName, lastName, email, phone, password)
- **contact_messages**: Handles contact form submissions
- **custom_package_requests**: Manages custom travel package requests with details like destination, budget, and travel dates

### Authentication System
- Simple email/password authentication without JWT tokens
- Password validation with minimum 6 characters requirement
- User registration with duplicate email prevention
- Form validation using Zod schemas for both client and server

### Component Structure
- **Layout Components**: Fixed header with navigation and footer across all pages
- **Page Components**: Home (hero section), Packages, About, Contact, Login, Signup
- **UI Components**: Reusable shadcn/ui components for forms, cards, dialogs, and navigation
- **Custom Components**: Package browsing, contact forms, and custom package request modals

### Styling and Design
- **Design System**: shadcn/ui with "new-york" style variant
- **Typography**: Custom fonts including Inter, Playfair Display, and Google Fonts integration
- **Color Scheme**: Neutral base color with CSS custom properties for theming
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

### Development Tools
- **Build System**: Vite with hot module replacement for development
- **Code Quality**: TypeScript for type safety across frontend and backend
- **Database Migrations**: Drizzle Kit for schema management and database migrations
- **Development Server**: Concurrent frontend and backend development with proxy setup

## External Dependencies

### Core Dependencies
- **Database**: Neon Database serverless PostgreSQL connection
- **Email Service**: SendGrid for email functionality (configured but not actively used)
- **UI Components**: Radix UI primitives for accessible component foundation
- **Development**: Replit-specific plugins for development environment integration

### Third-party Services
- **Image Hosting**: Unsplash for travel photography and gallery images
- **Communication**: WhatsApp integration for customer contact
- **Social Media**: Facebook, Instagram, Twitter integration placeholders

### Build and Deployment
- **Production Build**: Vite build for frontend static assets, esbuild for backend bundling
- **Environment**: Configured for both development and production environments
- **Asset Management**: Static file serving with proper caching headers