import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../utils/mockData';
import { PROJECT_STATUS, STATUS_LABEL } from '../utils/constants';

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Omit<Project, 'id' | 'createdAt'>) => void;
  isLoading?: boolean;
  isEditing?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    clientName: initialData?.clientName || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || PROJECT_STATUS.NOT_STARTED,
    deadline: initialData?.deadline || '',
    budget: initialData?.budget || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      ...formData,
      budget: formData.budget ? parseInt(formData.budget as string) : undefined,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Client Name */}
      <div>
        <label className="block text-sm font-medium text-[#d6dbd3] mb-2">
          Client Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          className={`input-field ${errors.clientName ? 'border-red-500' : ''}`}
          placeholder="Enter client name"
        />
        {errors.clientName && (
          <p className="text-sm text-red-600 mt-1">{errors.clientName}</p>
        )}
      </div>

      {/* Project Title */}
      <div>
        <label className="block text-sm font-medium text-[#d6dbd3] mb-2">
          Project Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`input-field ${errors.title ? 'border-red-500' : ''}`}
          placeholder="Enter project title"
        />
        {errors.title && (
          <p className="text-sm text-red-600 mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-[#d6dbd3] mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Enter project description"
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-[#d6dbd3] mb-2">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="input-field"
        >
          {Object.values(PROJECT_STATUS).map(status => (
            <option key={status} value={status}>
              {STATUS_LABEL[status as keyof typeof STATUS_LABEL]}
            </option>
          ))}
        </select>
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-medium text-[#d6dbd3] mb-2">
          Deadline <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className={`input-field ${errors.deadline ? 'border-red-500' : ''}`}
        />
        {errors.deadline && (
          <p className="text-sm text-red-600 mt-1">{errors.deadline}</p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-[#d6dbd3] mb-2">
          Budget (Optional)
        </label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter budget amount"
          min="0"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
      </motion.button>
    </motion.form>
  );
};
