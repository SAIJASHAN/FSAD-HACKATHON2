import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import projectService from '../services/projectService';
import type { Project } from '../utils/mockData';

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setProjects: (projects: Project[]) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// ✅ STATE TYPE
interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

// ✅ NO MOCK DATA HERE
const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

// ✅ REDUCER
const projectReducer = (state: ProjectState, action: any): ProjectState => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload, loading: false };

    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? action.payload.data : p
        ),
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
      };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

// ✅ PROVIDER
export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // 🔥 LOAD PROJECTS FROM BACKEND
  useEffect(() => {
    const fetchProjects = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const data = await projectService.getProjects();

        dispatch({
          type: 'SET_PROJECTS',
          payload: data,
        });

      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to fetch projects',
        });
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  // ✅ ADD PROJECT
  const addProject = async (project: Omit<Project, 'id' | 'createdAt'>) => {
    try {
      const saved = await projectService.createProject(project);

      dispatch({
        type: 'ADD_PROJECT',
        payload: saved,
      });

    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // ✅ UPDATE PROJECT
  const updateProject = async (id: string, data: Partial<Project>) => {
    try {
      const updated = await projectService.updateProject(id, data);

      dispatch({
        type: 'UPDATE_PROJECT',
        payload: { id, data: updated },
      });

    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // ✅ DELETE PROJECT
  const deleteProject = async (id: string) => {
    try {
      await projectService.deleteProject(id);

      dispatch({
        type: 'DELETE_PROJECT',
        payload: id,
      });

    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // ✅ SET PROJECTS (manual)
  const setProjects = (projects: Project[]) => {
    dispatch({ type: 'SET_PROJECTS', payload: projects });
  };

  const value: ProjectContextType = {
    projects: state.projects,
    loading: state.loading,
    error: state.error,
    addProject,
    updateProject,
    deleteProject,
    setProjects,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

// ✅ HOOK
export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectProvider');
  }
  return context;
};