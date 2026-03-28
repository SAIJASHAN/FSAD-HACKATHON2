import { PROJECT_STATUS } from './constants';

// ✅ Strong typing
export type ProjectStatus =
  | typeof PROJECT_STATUS.NOT_STARTED
  | typeof PROJECT_STATUS.IN_PROGRESS
  | typeof PROJECT_STATUS.COMPLETED
  | typeof PROJECT_STATUS.ON_HOLD;

// ✅ Interface (safe dates)
export interface Project {
  id: string;
  clientName: string;
  title: string;
  description: string;
  status: ProjectStatus;
  deadline: string | null;      // ✅ safe
  createdAt: string;            // ✅ must always exist
  budget?: number;
  completedAt?: string | null;
}

// ✅ Mock Data (FIXED FORMATS)
export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    clientName: 'Acme Corp',
    title: 'Website Redesign',
    description: 'Modern UI/UX redesign',
    status: PROJECT_STATUS.IN_PROGRESS,
    deadline: '15-04-2026',        
    createdAt: '10-10-2025',   
    budget: 5000,
  },
 
];

// ✅ Analytics (no change needed)
export const generateAnalytics = (projects: Project[]) => {
  const total = projects.length;

  const completed = projects.filter(p => p.status === PROJECT_STATUS.COMPLETED).length;
  const inProgress = projects.filter(p => p.status === PROJECT_STATUS.IN_PROGRESS).length;
  const notStarted = projects.filter(p => p.status === PROJECT_STATUS.NOT_STARTED).length;
  const onHold = projects.filter(p => p.status === PROJECT_STATUS.ON_HOLD).length;

  return {
    total,
    completed,
    inProgress,
    notStarted,
    onHold,
    completionRate: total > 0
      ? Math.round((completed / total) * 100)
      : 0,
  };
};