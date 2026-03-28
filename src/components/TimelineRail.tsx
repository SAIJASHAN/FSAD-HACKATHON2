import React from 'react';
import { motion } from 'framer-motion';

interface TimelineNode {
  id: string;
  label: string;
  timestamp: string;
  state: 'stable' | 'volatile' | 'critical';
}

interface TimelineRailProps {
  nodes: TimelineNode[];
}

const stateClassMap: Record<TimelineNode['state'], string> = {
  stable: 'node-stable',
  volatile: 'node-volatile',
  critical: 'node-critical',
};

export const TimelineRail: React.FC<TimelineRailProps> = ({ nodes }) => {
  return (
    <section id="timeline" className="tva-surface p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="tva-section-title">Timeline Branch Matrix</h2>
        <span className="tva-badge">Live stream</span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[760px] relative pt-6 pb-2">
          <div className="timeline-backbone" aria-hidden="true" />
          <div className="grid grid-cols-5 gap-4">
            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="timeline-node"
              >
                <div className={`timeline-dot ${stateClassMap[node.state]}`} />
                <p className="timeline-label">{node.label}</p>
                <p className="timeline-time">{node.timestamp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
