import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import type { Project } from '../utils/mockData';
import { formatDate } from '../utils/formatters';
import { StatusBadge } from './StatusBadge';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onEdit,
  onDelete,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="card">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-[#1f221d] rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-[#bcc3b8]">No projects found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card p-0 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#d7d9dc] border-b border-[#a9afb5]">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1c2127]">Client</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1c2127]">Project</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1c2127]">Status</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1c2127]">Deadline</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1c2127]">Budget</th>
              <th className="px-4 py-2 text-center text-xs font-semibold text-[#1c2127]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3a3e36]">
            {projects.map((project, idx) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-[#232720] transition-colors"
              >
                <td className="px-4 py-2">
                  <p className="font-medium text-[#eaeaea] text-sm">{project.clientName}</p>
                </td>
                <td className="px-4 py-2">
                  <p className="text-[#d6dbd3] text-sm">{project.title}</p>
                  <p className="text-xs text-[#9fa79b] line-clamp-1">
                    {project.description}
                  </p>
                </td>
                <td className="px-4 py-2">
                  <StatusBadge status={project.status} />
                </td>
                <td className="px-4 py-2">
                  <p className="text-[#c5ccc2] text-sm">{formatDate(project.deadline)}</p>
                </td>
                <td className="px-4 py-2">
                  <p className="font-medium text-[#e0a84c] text-sm">
                    {project.budget ? `$${project.budget.toLocaleString()}` : '-'}
                  </p>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onEdit(project)}
                      className="p-1.5 hover:bg-[#2a2f38] text-[#9ec6df] rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(project.id)}
                      className="p-1.5 hover:bg-[#3a2321] text-[#e5a39b] rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
