import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Save, Bell, Globe, Clock } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { CURRENCY_RATES, getCurrencySymbol } from '../context/SettingsContext';
import { useToast } from '../components/Toast';
import { formatNumberByCurrency } from '../utils/formatters';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();
  const { addToast } = useToast();

  const [formData, setFormData] = useState(settings);
  const [usdAmount, setUsdAmount] = useState(1000);

  const handleChange = (field: keyof typeof settings, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    updateSettings(formData);
    addToast('Settings saved successfully!', 'success');
  };

  // Calculate conversion
  const convertCurrency = (amount: number, from: string, to: string): number => {
    const usdAmount = amount / (CURRENCY_RATES[from] || 1);
    return usdAmount * (CURRENCY_RATES[to] || 1);
  };

  const convertedAmount = convertCurrency(usdAmount, 'USD', formData.currencyFormat);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#e0a84c] hover:text-[#efc37b] font-medium mb-4 hover:translate-x-1 transition-all"
        >
          <ChevronLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="text-4xl font-bold text-[#eaeaea]">Settings</h1>
        <p className="text-[#bcc3b8] mt-2 text-lg">Manage your preferences and application settings</p>
      </motion.div>

      {/* Settings Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card space-y-2">
            <motion.button
              whileHover={{ x: 4 }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg font-medium text-[#1f180c] bg-[#e0a84c] transition-all"
            >
              <Bell size={20} />
              <span>Notifications</span>
            </motion.button>
            <motion.button
              whileHover={{ x: 4 }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg font-medium text-[#d6dbd3] hover:bg-[#22261f] transition-all"
            >
              <Globe size={20} />
              <span>Regional</span>
            </motion.button>
            <motion.button
              whileHover={{ x: 4 }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg font-medium text-[#d6dbd3] hover:bg-[#22261f] transition-all"
            >
              <Clock size={20} />
              <span>Advanced</span>
            </motion.button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#243442] rounded-lg">
                <Bell size={24} className="text-[#355169]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#eaeaea]">Notifications</h2>
                <p className="text-sm text-[#bcc3b8]">Control how you receive updates</p>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 rounded-lg bg-[#1d201b] hover:bg-[#22261f] transition-all flex items-center justify-between border border-[#33382f]"
              >
                <div>
                  <p className="font-medium text-[#eaeaea]">Enable Notifications</p>
                  <p className="text-sm text-[#9fa79b]">Get alerts for project updates</p>
                </div>
                <button
                  onClick={() => handleChange('notifications', !formData.notifications)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    formData.notifications ? 'bg-[#e0a84c]' : 'bg-[#586057]'
                  }`}
                >
                  <motion.span
                    layout
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      formData.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-[#31372e] pt-4"
              >
                <label className="block text-sm font-semibold text-[#eaeaea] mb-3">Email Digest</label>
                <select
                  value={formData.emailDigest}
                  onChange={(e) => handleChange('emailDigest', e.target.value)}
                  className="input-field"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="never">Never</option>
                </select>
              </motion.div>
            </div>
          </motion.div>

          {/* Regional */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#233328] rounded-lg">
                <Globe size={24} className="text-[#3f6d48]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#eaeaea]">Regional Settings</h2>
                <p className="text-sm text-[#bcc3b8]">Customize for your location</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#eaeaea] mb-3">Currency</label>
                <select
                  value={formData.currencyFormat}
                  onChange={(e) => handleChange('currencyFormat', e.target.value)}
                  className="input-field"
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="INR">Indian Rupee (INR)</option>
                </select>
              </div>

              {/* Currency Conversion */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="border-t border-[#31372e] pt-4"
              >
                <label className="block text-sm font-semibold text-[#eaeaea] mb-4">Live Currency Conversion</label>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-[#bcc3b8] mb-2 block font-medium">Amount in USD</label>
                    <input
                      type="number"
                      value={usdAmount}
                      onChange={(e) => setUsdAmount(Number(e.target.value) || 0)}
                      className="input-field w-full"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-4 bg-[#1f231d] rounded-lg transition-all border border-[#3c4438]"
                  >
                    <span className="text-[#e3e8df] font-semibold">{formatNumberByCurrency(usdAmount, 'USD')} USD</span>
                    <span className="text-[#9fa79b] text-lg">=</span>
                    <span className="text-[#e0a84c] font-bold text-lg">{getCurrencySymbol(formData.currencyFormat)} {formatNumberByCurrency(convertedAmount, formData.currencyFormat)}</span>
                  </motion.div>
                  <p className="text-xs text-[#d6dbd3] bg-[#1d201b] p-2 rounded border border-[#33382f]">
                    📊 Exchange Rate: 1 USD = {CURRENCY_RATES[formData.currencyFormat]?.toFixed(2)} {formData.currencyFormat}
                  </p>
                </div>
              </motion.div>

              <div>
                <label className="block text-sm font-semibold text-[#eaeaea] mb-3">Timezone</label>
                <input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="input-field"
                  placeholder="e.g., UTC, EST, PST"
                />
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.01, boxShadow: '0 20px 40px rgba(224, 168, 76, 0.24)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
          >
            <Save size={22} />
            Save Changes
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
