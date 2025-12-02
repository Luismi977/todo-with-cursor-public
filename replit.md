# Next.js Todo List Application

## Overview
This is a Next.js 16 application featuring a todo list component. The app allows users to create, edit, delete, and mark tasks as completed. It uses modern React patterns with TypeScript and Tailwind CSS for styling.

## Project Setup
- **Framework**: Next.js 16.0.3 with Turbopack
- **Language**: TypeScript
- **UI Library**: React 19.2.0
- **Styling**: Tailwind CSS 4.x
- **Components**: Radix UI components with custom styling

## Architecture
- **App Router**: Using Next.js App Router (`app/` directory)
- **Client Components**: Todo list is a client component with React hooks
- **UI Components**: Reusable UI components in `components/ui/`
- **Utilities**: Helper functions in `lib/utils.ts`

## Key Files
- `app/page.tsx`: Main home page that renders the todo list
- `app/layout.tsx`: Root layout with fonts and metadata
- `components/todo-list.tsx`: Main todo list component with full CRUD functionality
- `components/ui/`: Reusable UI components (button, card, checkbox, input)
- `next.config.ts`: Next.js configuration for Replit environment

## Configuration for Replit
The application has been configured to run in the Replit environment:
- Development server runs on port 5000 with host 0.0.0.0
- Turbopack enabled for faster builds
- Allowed dev origins set to accept all origins for iframe proxy compatibility
- Workflow configured to run `npm run dev`

## Development
To start the development server:
```bash
npm run dev
```

The app will be available at http://0.0.0.0:5000

## Deployment
The deployment is configured with:
- **Target**: Autoscale (stateless web application)
- **Build**: `npm run build`
- **Run**: `npm run start`

## Features
- Create new tasks
- Edit existing tasks
- Mark tasks as completed/incomplete
- Delete tasks
- Task counter showing total, completed, and pending tasks
- Responsive design with dark mode support

## Recent Changes
- December 2, 2025: Initial import and setup for Replit environment
  - Configured Next.js for port 5000 and host 0.0.0.0
  - Set up Turbopack configuration
  - Added allowedDevOrigins for iframe compatibility
  - Configured deployment settings
  - Set up workflow for development server
