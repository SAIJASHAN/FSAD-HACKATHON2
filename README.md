# 🚀 Freelancer Project Management Dashboard

A production-ready, modern SaaS-style freelancer project management dashboard built with React, Vite, Tailwind CSS, and Framer Motion.

## 🎯 Overview

This dashboard helps freelancers efficiently manage their projects with:
- **Dashboard**: Real-time analytics with charts and project metrics
- **Projects List**: Table view with filtering, searching, and sorting capabilities
- **Add/Edit Projects**: Clean form-based interface for project management
- **Status Tracking**: Visual project status indicators
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🔧 Tech Stack

- **React 19** - UI Framework
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Analytics visualizations
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Sidebar.tsx                 # Navigation sidebar
│   ├── Navbar.tsx                  # Top navigation bar
│   ├── AnalyticsCard.tsx           # Stat cards
│   ├── ProjectTable.tsx            # Projects table
│   ├── ProjectForm.tsx             # Form for add/edit
│   ├── FilterBar.tsx               # Search & filter controls
│   ├── StatusBadge.tsx             # Status indicator
│   ├── Toast.tsx                   # Notification system
│   └── index.ts                    # Component exports
├── pages/             # Page components
│   ├── Dashboard.tsx               # Main dashboard
│   ├── ProjectsPage.tsx            # Projects list page
│   ├── AddProjectPage.tsx          # Create project page
│   └── EditProjectPage.tsx         # Edit project page
├── layouts/           # Layout components
│   └── MainLayout.tsx              # Main app layout wrapper
├── context/           # React context for state management
│   └── ProjectContext.tsx          # Global project state
├── services/          # API integration
│   └── projectService.ts           # Project API calls
├── utils/             # Utility functions
│   ├── constants.ts                # App constants
│   ├── formatters.ts               # Date/currency formatters
│   └── mockData.ts                 # Mock data & analytics
├── App.tsx            # App root with routing
├── main.tsx           # Entry point
├── index.css          # Tailwind CSS import
└── globals.css        # Global styles
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Access the Application

- **Development**: local Vite dev server (`npm run dev`)
- **Dashboard**: Home page with analytics
- **Projects**: Full list of all projects
- **New Project**: Create a new project
- **Edit Project**: Modify project details

## 📊 Features

### Dashboard Page
- **Summary Cards**: Total, completed, in-progress, and not-started projects
- **Project Status Pie Chart**: Visual distribution of project statuses
- **Trend Bar Chart**: Projects over time
- **Quick Stats**: Average duration, on-time delivery rate, and total revenue

### Projects Page
- **Advanced Table**: Displays all projects with:
  - Client name and project title
  - Current status with color-coded badges
  - Deadline information
  - Budget details
  - Quick action buttons (Edit/Delete)
- **Search Bar**: Find projects by client or title
- **Filtering**: Filter by project status
- **Sorting**: Sort by deadline or creation date

### Add/Edit Project
- **Form Validation**: Required fields with error messages
- **Status Selection**: Choose from Not Started, In Progress, Completed, On Hold
- **Deadline Picker**: Date selection for project deadline
- **Budget Input**: Optional budget tracking
- **Loading States**: Visual feedback during submission

### User Experience
- **Smooth Animations**: Framer Motion transitions
- **Toast Notifications**: Feedback for user actions
- **Loading Skeletons**: Better perceived performance
- **Empty States**: Clear messaging when no data
- **Collapsible Sidebar**: Save screen real estate

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#4f46e5)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Info**: Blue (#3b82f6)
- **Background**: Slate (#f9fafb)

## 📝 Mock Data

The application comes with sample data for demonstration:
- 6 pre-configured projects
- Various status types
- Budget and deadline information
- Client names and descriptions

## 🔌 API Integration

The app is prepared for backend integration. Update `src/services/projectService.ts` to connect to your backend:

```typescript
// API Base URL: set via VITE_API_BASE_URL (falls back to /api)

GET    /projects              - Get all projects
POST   /projects              - Create new project
PUT    /projects/:id          - Update project
DELETE /projects/:id          - Delete project
```

## 🛠 State Management

Uses React Context API for global state management. Can be replaced with Redux/Zustand for larger applications.

## 📦 Build & Deployment

```bash
# Production build
npm run build

# Deploy the dist/ folder to your hosting service
```

## 🎯 Performance

- Optimized bundle size
- Code splitting ready
- Lazy loading support
- Smooth 60fps animations

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

Built as a production-ready SaaS dashboard template. Happy coding! 🎉


The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
