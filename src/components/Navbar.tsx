import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Settings, LogOut, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { motion } from 'framer-motion';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { notifications, removeNotification, markAsRead, clearAll } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings');
    setShowProfile(false);
  };

  return (
    <div className="sticky top-0 z-30 border-b border-[#2a2d27] bg-[#141610]/95 backdrop-blur-md">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b7beb3]" size={18} />
            <input
              type="text"
              placeholder="Search projects, clients..."
              value={searchQuery}
              onChange={handleSearch}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-[#20231e] rounded-lg transition-colors"
            >
              <Bell size={20} className="text-[#9fa79b]" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-[#e0a84c] text-[#1b1408] rounded-full text-xs flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-72 bg-[#171913] rounded-lg shadow-xl border border-[#2b2e28] py-1 z-50"
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#2b2e28] flex items-center justify-between">
                  <h3 className="font-semibold text-[#eaeaea]">Notifications</h3>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-[#e0a84c] hover:text-[#f0bc67] font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-[#9fa79b]">
                      <Info size={32} className="mx-auto mb-2 text-[#6e7f6b]" />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onClick={() => markAsRead(notification.id)}
                        className={`px-4 py-3 border-b border-[#272a24] hover:bg-[#1d201b] cursor-pointer transition-colors flex gap-3 ${
                          !notification.read ? 'bg-[#21241e]' : ''
                        }`}
                      >
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {notification.type === 'success' && (
                            <CheckCircle size={20} className="text-[#86b38a]" />
                          )}
                          {notification.type === 'error' && (
                            <AlertCircle size={20} className="text-[#d68474]" />
                          )}
                          {notification.type === 'warning' && (
                            <AlertCircle size={20} className="text-[#e0a84c]" />
                          )}
                          {notification.type === 'info' && (
                            <Info size={20} className="text-[#6e7f6b]" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#eaeaea] text-sm">{notification.title}</p>
                          <p className="text-sm text-[#9fa79b] mt-1">{notification.message}</p>
                          <p className="text-xs text-[#6e7f6b] mt-1">
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </p>
                        </div>

                        {/* Close Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="flex-shrink-0 text-[#6e7f6b] hover:text-[#9fa79b] transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 p-2 hover:bg-[#20231e] rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#6e7f6b] to-[#44503f] rounded-full flex items-center justify-center text-[#eaeaea] font-semibold text-sm overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full" />
                ) : (
                  user?.name?.charAt(0) || 'U'
                )}
              </div>
              <span className="text-sm font-medium text-[#eaeaea] hidden sm:block">
                {user?.name || 'User'}
              </span>
              <ChevronDown size={16} className="text-[#9fa79b]" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-[#171913] rounded-lg shadow-lg border border-[#2b2e28] py-2 z-50">
                <div className="px-4 py-2 text-sm text-[#9fa79b] border-b border-[#2b2e28]">
                  <p className="font-semibold text-[#eaeaea]">{user?.name}</p>
                  <p className="text-xs">{user?.email}</p>
                </div>
                <button
                  onClick={handleSettings}
                  className="w-full px-4 py-2 text-left text-sm text-[#eaeaea] hover:bg-[#20231e] flex items-center gap-3"
                >
                  <Settings size={16} /> Settings
                </button>
                <hr className="my-2 border-[#2b2e28]" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-[#f2a39d] hover:bg-[#2a1715] flex items-center gap-3"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
            </div>
        </div>
      </div>
  );
};
