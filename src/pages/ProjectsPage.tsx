import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useNotifications } from '../context/NotificationContext';
import { ProjectTable, FilterBar, useToast, Toaster } from '../components';
import type { Project } from '../utils/mockData';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { projects, deleteProject } = useProjects();
  const { addNotification } = useNotifications();
  const { toasts, addToast, removeToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'deadline' | 'created'>('created');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    setRefreshTrigger(prev => prev + 1);
  }, [projects]);

  // ✅ SAFE DATE FUNCTION
  const getSafeTime = (date: string | null | undefined) => {
    if (!date) return Infinity;
    const d = new Date(date);
    return isNaN(d.getTime()) ? Infinity : d.getTime();
  };

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // 🔍 Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.clientName.toLowerCase().includes(query) ||
        p.title.toLowerCase().includes(query)
      );
    }

    // 🎯 Status filter
    if (statusFilter) {
      result = result.filter(p => p.status === statusFilter);
    }

    // 🔃 Sorting (FIXED)
    if (sortBy === 'deadline') {
      result.sort((a, b) => getSafeTime(a.deadline) - getSafeTime(b.deadline));
    } else {
      result.sort((a, b) => getSafeTime(b.createdAt) - getSafeTime(a.createdAt));
    }

    return result;
  }, [projects, searchQuery, statusFilter, sortBy, refreshTrigger]);

  // ✏️ Edit
  const handleEdit = useCallback((project: Project) => {
    navigate(`/projects/${project.id}/edit`, { state: { project } });
  }, [navigate]);

  // ❌ Delete
  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);

        addToast('Project deleted successfully', 'success');

        addNotification({
          title: 'Project Deleted',
          message: 'Project deleted successfully!',
          type: 'success'
        });

      } catch (error) {
        addToast('Failed to delete project', 'error');

        addNotification({
          title: 'Error',
          message: 'Failed to delete project',
          type: 'error'
        });
      }
    }
  }, [deleteProject, addToast, addNotification]);

  // ➕ New Project
  const handleNewProject = useCallback(() => {
    navigate('/projects/new');
  }, [navigate]);

  return (
    <div className="space-y-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between"
        key={`header-${refreshTrigger}`}
      >
        <div>
          <h1 className="text-3xl font-bold text-[#eaeaea]">Projects</h1>
          <p className="text-[#bcc3b8] mt-2">
            Manage all your freelance projects. ({filteredProjects.length} total)
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNewProject}
          className="uiverse-accent-btn uiverse-shine-btn flex items-center gap-2"
        >
          <Plus size={20} />
          New Project
        </motion.button>
      </motion.div>

      {/* Filters */}
      <FilterBar
        onSearch={setSearchQuery}
        onStatusChange={setStatusFilter}
        onSort={setSortBy}
      />

      {/* Table */}
      <ProjectTable
        projects={filteredProjects}
        onEdit={handleEdit}
        onDelete={handleDelete}
        key={`table-${refreshTrigger}`}
      />

      {/* Toast */}
      <Toaster toasts={toasts} onClose={removeToast} />

    </div>
  );
};