# RelaxMap FrontEnd

This is the frontend application for RelaxMap, built with [Next.js](https://nextjs.org/) (App Router) and React.

## Project Structure

The project follows a standard, scalable Next.js architecture. Below is an overview of the key directories and their purposes:

- **`src/app/`**: The core Next.js App Router directory. Contains pages (`page.tsx`), layouts (`layout.tsx`), and global styles (`globals.css`).
- **`src/components/ui/`**: Reusable, base UI components (e.g., buttons, inputs, modals) that are used across the application.
- **`src/lib/`**: Utility functions and helpers that are not React components (e.g., `utils.ts`).
- **`src/hooks/`**: Custom React hooks (e.g., `useAuth`, `useToggle`).
- **`src/types/`**: Global TypeScript interfaces and types for the application.
- **`src/services/`**: API calls, network requests, and external service integrations.
- **`src/store/`**: Global state management configuration (e.g., Zustand, Redux, Context API).
- **`src/constants/`**: Application-wide constants such as routes, API endpoints, and configuration variables.

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
