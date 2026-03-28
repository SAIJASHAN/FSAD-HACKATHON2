import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(email, password);
      addToast('Login successful!', 'success');
      navigate('/');
    } catch (error) {
      addToast('Login failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_10%,rgba(224,168,76,0.18),transparent_34%),linear-gradient(165deg,#141611_0%,#0e0f0c_100%)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-14 h-14 bg-[#e0a84c] rounded-2xl mb-4"
          >
            <Briefcase size={28} className="text-[#251c0f]" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#eaeaea]">FreelanceCore</h1>
          <p className="text-[#bcc3b8] mt-2">Manage your projects with ease</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="uiverse-panel p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#d6dbd3] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  className={`input-field pl-10 uiverse-input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#d6dbd3] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  className={`input-field pl-10 uiverse-input ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="uiverse-accent-btn uiverse-shine-btn w-full disabled:opacity-50 mt-6"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-[#1c211b] rounded-lg border border-[#353c32]">
            <p className="text-xs text-[#e0a84c] font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-[#d5dbd2]">Email: <code className="font-mono">demo@freelancehub.com</code></p>
            <p className="text-xs text-[#d5dbd2]">Password: <code className="font-mono">password123</code></p>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-sm text-[#aeb6aa] mt-6">
          © 2026 FreelanceCore. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};
