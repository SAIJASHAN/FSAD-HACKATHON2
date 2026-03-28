import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LayoutDashboard, FolderOpen, Plus, SlidersHorizontal } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Projects', href: '/projects', icon: FolderOpen },
    { label: 'New Project', href: '/projects/new', icon: Plus },
    { label: 'Control Panel', href: '/settings', icon: SlidersHorizontal },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: isOpen ? 280 : 80 }}
        className="h-screen fixed left-0 top-0 z-40 flex flex-col transition-all duration-300 border-r border-[#2a2d27] bg-[#131510]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2a2d27]">
          <div className="flex items-center justify-between">
            {isOpen && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm tracking-[0.18em] font-semibold text-[#e0a84c] uppercase"
              >
                FreelanceCore
              </motion.h1>
            )}
            <button
              onClick={onToggle}
              className="p-2 hover:bg-[#21241f] rounded-lg transition-colors"
            >
              {isOpen ? (
                <X size={20} className="text-[#9fa79b]" />
              ) : (
                <Menu size={20} className="text-[#9fa79b]" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative ${
                  active
                    ? 'bg-[#24281f] text-[#e0a84c] font-semibold shadow-[0_0_0_1px_rgba(224,168,76,0.25)_inset]'
                    : 'text-[#9fa79b] hover:bg-[#1d201b] hover:text-[#eaeaea]'
                }`}
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Icon size={20} />
                </motion.div>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm uppercase tracking-[0.09em]"
                  >
                    {item.label}
                  </motion.span>
                )}
                
                {active && isOpen && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute right-0 top-0 bottom-0 w-1 bg-[#e0a84c]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#2a2d27]">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-all duration-200 font-medium ${
              isActive('/settings')
                ? 'bg-[#24281f] text-[#e0a84c] shadow-[0_0_0_1px_rgba(224,168,76,0.25)_inset]'
                : 'text-[#9fa79b] hover:bg-[#1f231d] hover:text-[#e0a84c]'
            }`}
          >
            <SlidersHorizontal size={20} />
            {isOpen && <span className="uppercase tracking-[0.08em]">System Access</span>}
          </Link>
        </div>
      </motion.div>

      {/* Mobile Menu Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};
