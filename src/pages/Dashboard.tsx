import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  CheckCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';
import { useProjects } from '../context/ProjectContext';
import { useSettings, CURRENCY_RATES, getCurrencySymbol } from '../context/SettingsContext';
import { AnalyticsCard } from '../components';
import { PROJECT_STATUS } from '../utils/constants';
import { formatNumberByCurrency } from '../utils/formatters';

const COLORS = {
  [PROJECT_STATUS.COMPLETED]: '#10b981',
  [PROJECT_STATUS.IN_PROGRESS]: '#f59e0b',
  [PROJECT_STATUS.NOT_STARTED]: '#3b82f6',
  [PROJECT_STATUS.ON_HOLD]: '#ef4444',
};

export const Dashboard: React.FC = () => {
  const { projects } = useProjects();
  const { settings } = useSettings();

  // ✅ REAL ANALYTICS
  const analytics = useMemo(() => {
    const total = projects.length;

    const completed = projects.filter(p => p.status === PROJECT_STATUS.COMPLETED).length;
    const inProgress = projects.filter(p => p.status === PROJECT_STATUS.IN_PROGRESS).length;
    const notStarted = projects.filter(p => p.status === PROJECT_STATUS.NOT_STARTED).length;
    const onHold = projects.filter(p => p.status === PROJECT_STATUS.ON_HOLD).length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      inProgress,
      notStarted,
      onHold,
      completionRate,
    };
  }, [projects]);

  // 💰 Currency
  const convertCurrency = (amount: number): number => {
    return amount * (CURRENCY_RATES[settings.currencyFormat] || 1);
  };

  const totalRevenueInSelectedCurrency = convertCurrency(
    projects.reduce((sum, p) => sum + (p.budget || 0), 0)
  );

  // 🥧 PIE DATA
  const pieData = [
    { name: 'Completed', value: analytics.completed, color: COLORS[PROJECT_STATUS.COMPLETED] },
    { name: 'In Progress', value: analytics.inProgress, color: COLORS[PROJECT_STATUS.IN_PROGRESS] },
    { name: 'Not Started', value: analytics.notStarted, color: COLORS[PROJECT_STATUS.NOT_STARTED] },
    { name: 'On Hold', value: analytics.onHold, color: COLORS[PROJECT_STATUS.ON_HOLD] },
  ];

  // 📊 BAR DATA (🔥 DEADLINE BASED)
  const barData = useMemo(() => {
    const now = new Date();

    const months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);

      return {
        key: `${date.getFullYear()}-${date.getMonth()}`,
        month: date.toLocaleString('en-US', { month: 'short' }),
      };
    });

    const monthCounter = new Map<string, number>();

    // ✅ COUNT USING DEADLINE
    projects.forEach(project => {
      if (!project.deadline) return;

      const deadline = new Date(project.deadline);

      if (isNaN(deadline.getTime())) return;

      const key = `${deadline.getFullYear()}-${deadline.getMonth()}`;

      monthCounter.set(key, (monthCounter.get(key) || 0) + 1);
    });

    return months.map(month => ({
      month: month.month,
      projects: monthCounter.get(month.key) || 0,
    }));
  }, [projects]);

  return (
    <div className="space-y-5 md:space-y-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="tva-surface p-5 md:p-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="mt-2">Project overview and live metrics</p>
      </motion.div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard title="Total Projects" value={analytics.total} icon={Briefcase} color="indigo" index={0} />
        <AnalyticsCard title="Completed" value={analytics.completed} icon={CheckCircle} color="green" index={1} />
        <AnalyticsCard title="In Progress" value={analytics.inProgress} icon={Clock} color="amber" index={2} />
        <AnalyticsCard title="Completion Rate" value={`${analytics.completionRate}%`} icon={TrendingUp} color="indigo" index={3} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* PIE */}
        <div className="card">
          <h2 className="text-sm font-semibold mb-4">Project Status Mix</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="45%" outerRadius={80} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="card">
          <h2 className="text-sm font-semibold mb-4">Projects by Deadline (Last 6 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="2 6" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="projects" fill="#e0a84c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Revenue */}
      <div className="card">
        <h2 className="text-sm font-semibold mb-4">Total Revenue</h2>
        <p className="text-lg font-bold">
          {getCurrencySymbol(settings.currencyFormat)}{" "}
          {formatNumberByCurrency(totalRevenueInSelectedCurrency, settings.currencyFormat)}
        </p>
      </div>

    </div>
  );
};