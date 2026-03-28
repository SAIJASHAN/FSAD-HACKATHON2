import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useNotifications } from '../context/NotificationContext';
import { ProjectForm, useToast, Toaster } from '../components';
import type { Project } from '../utils/mockData';

export const AddProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const { toasts, addToast, removeToast } = useToast();
  const { addNotification } = useNotifications();

  // ✅ FIXED: async + await
  const handleSubmit = useCallback(
    async (data: Omit<Project, 'id' | 'createdAt'>) => {
      try {
        await addProject(data); // 🔥 important fix

        addToast('Project created successfully!', 'success');

        addNotification({
          title: 'Project Created',
          message: `New project "${data.title}" has been created successfully!`,
          type: 'success',
        });

        setTimeout(() => navigate('/projects'), 1000);

      } catch (error) {
        addToast('Failed to create project', 'error');

        addNotification({
          title: 'Error',
          message: 'Failed to create project',
          type: 'error',
        });
      }
    },
    [addProject, addToast, addNotification, navigate]
  );

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

        <h1 className="text-3xl font-bold text-[#eaeaea]">
          Create New Project
        </h1>

        <p className="text-[#bcc3b8] mt-2">
          Fill in the details to create a new freelance project
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <div className="card">
          <ProjectForm onSubmit={handleSubmit} isEditing={false} />
        </div>
      </motion.div>

      {/* Toaster */}
      <Toaster toasts={toasts} onClose={removeToast} />
    </div>
  );
};