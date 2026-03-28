import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'indigo' | 'green' | 'amber' | 'red';
  trend?: number;
  index?: number;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  index = 0,
}) => {
  const colorClasses = {
    indigo: 'bg-[#2d3029] text-[#e0a84c]',
    green: 'bg-[#243129] text-[#86b38a]',
    amber: 'bg-[#322a1b] text-[#e0a84c]',
    red: 'bg-[#352320] text-[#d68474]',
  };

  const trendColor = (trend && trend > 0) ? 'text-[#86b38a]' : 'text-[#d68474]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card uiverse-card-glow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[11px] text-[#9fa79b] mb-1 uppercase tracking-[0.11em] font-semibold">{title}</p>
          <p className="text-2xl font-bold text-[#eaeaea]">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs font-medium mt-2 ${trendColor}`}>
              {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}% vs last month
            </p>
          )}
        </div>
        <div className={`${colorClasses[color]} p-2 rounded-lg border border-[#3a3d35]`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
};
