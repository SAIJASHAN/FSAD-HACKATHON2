import React from 'react';
import { motion } from 'framer-motion';

interface HeroControlProps {
  totalProjects: number;
  completionRate: number;
}

export const HeroControl: React.FC<HeroControlProps> = ({ totalProjects, completionRate }) => {
  return (
    <section className="tva-hero tva-surface relative overflow-hidden">
      <div className="tva-branch-bg" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10"
      >
        <p className="tva-eyebrow">Temporal Operations Authority</p>
        <h1 className="tva-title tva-glitch" data-text="CONTROL TIME. CONTROL SYSTEMS.">
          CONTROL TIME. CONTROL SYSTEMS.
        </h1>
        <p className="mt-4 max-w-2xl text-sm md:text-base text-[var(--tva-text-secondary)]">
          Classified control interface for branch surveillance, anomaly response, and synchronized system governance.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
          <div className="tva-stat-chip">
            <span className="label">Active Projects</span>
            <span className="value">{totalProjects}</span>
          </div>
          <div className="tva-stat-chip">
            <span className="label">Completion Rate</span>
            <span className="value">{completionRate}%</span>
          </div>
          <div className="tva-stat-chip">
            <span className="label">Security Tier</span>
            <span className="value">OMEGA</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
