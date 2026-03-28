import React from 'react';
import { motion } from 'framer-motion';

const logs = [
  '> Initializing temporal lattice...',
  '> Syncing branch deltas...',
  '> Verifying anomaly signatures...',
  '> Access granted.',
];

export const TerminalPanel: React.FC = () => {
  return (
    <section className="tva-surface p-5 md:p-6">
      <h2 className="tva-section-title mb-4">Terminal Relay</h2>
      <div className="terminal-shell">
        {logs.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.12 }}
            className="terminal-line"
          >
            {line}
          </motion.p>
        ))}
        <span className="terminal-cursor" aria-hidden="true" />
      </div>
    </section>
  );
};
