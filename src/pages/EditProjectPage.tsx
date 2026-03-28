import React, { useMemo, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useNotifications } from '../context/NotificationContext';
import { ProjectForm, useToast, Toaster } from '../components';
import type { Project } from '../utils/mockData';

export const EditProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { projects, updateProject } = useProjects();
  const { toasts, addToast, removeToast } = useToast();
  const { addNotification } = useNotifications();

  const project = useMemo(() => {
    // Try to get from location state first
    if (location.state?.project) {
      return location.state.project;
    }
    // Otherwise search in projects
    return projects.find(p => p.id === id);
  }, [id, projects, location.state]);

  const handleSubmit = useCallback(
  async (data: Omit<Project, 'id' | 'createdAt'>) => {
    if (!id) return;

    try {
      await updateProject(id, data); // ✅ FIX

      addToast('Project updated successfully!', 'success');

      addNotification({
        title: 'Project Updated',
        message: `Project "${data.title}" has been updated successfully!`,
        type: 'success',
      });

      setTimeout(() => navigate('/projects'), 1000);

    } catch (error) {
      addToast('Failed to update project', 'error');

      addNotification({
        title: 'Error',
        message: 'Failed to update project',
        type: 'error',
      });
    }
  },
  [id, updateProject, addToast, addNotification, navigate]
);

  if (!project) {
    return (
      <div className="space-y-8">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-[#e0a84c] hover:text-[#efc37b] font-medium"
        >
          <ChevronLeft size={20} />
          Back to Projects
        </button>
        <div className="card text-center py-12">
          <p className="text-[#bcc3b8]">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-[#e0a84c] hover:text-[#efc37b] font-medium mb-4 hover:translate-x-1 transition-all"
        >
          <ChevronLeft size={20} />
          Back to Projects
        </button>
        <h1 className="text-3xl font-bold text-[#eaeaea]">Edit Project</h1>
        <p className="text-[#bcc3b8] mt-2">
          Updating: <span className="font-semibold">{project.title}</span>
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <div className="card">
          <ProjectForm
            initialData={project}
            onSubmit={handleSubmit}
            isEditing={true}
          />
        </div>
      </motion.div>

      {/* Toaster */}
      <Toaster toasts={toasts} onClose={removeToast} />
    </div>
  );
};
