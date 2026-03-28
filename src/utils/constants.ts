// ✅ Project Status Constants
export const PROJECT_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ON_HOLD: 'on_hold',
} as const;

// ✅ Labels for UI
export const STATUS_LABEL = {
  [PROJECT_STATUS.NOT_STARTED]: 'Not Started',
  [PROJECT_STATUS.IN_PROGRESS]: 'In Progress',
  [PROJECT_STATUS.COMPLETED]: 'Completed',
  [PROJECT_STATUS.ON_HOLD]: 'On Hold',
} as const;

// ✅ Colors for UI badges
export const STATUS_COLOR = {
  [PROJECT_STATUS.NOT_STARTED]: 'badge-info',
  [PROJECT_STATUS.IN_PROGRESS]: 'badge-warning',
  [PROJECT_STATUS.COMPLETED]: 'badge-success',
  [PROJECT_STATUS.ON_HOLD]: 'badge-danger',
} as const;

// ✅ API Base URL (SAFE)
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';