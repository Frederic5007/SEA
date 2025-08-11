import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Shield, Globe2 } from 'lucide-react';

const Settings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [locale, setLocale] = useState('en');

  return (
    <div style={{ 
      paddingTop: 100, 
      minHeight: '100vh', 
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <motion.div 
          initial={{ opacity: 0, y: 12 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.25 }}
          style={{ 
            background: 'var(--bg-card)', 
            borderRadius: 16, 
            padding: 20, 
            boxShadow: 'var(--shadow-light)',
            border: '1px solid var(--border-color)'
          }}
        >
          <h2 style={{ marginTop: 0, color: 'var(--text-primary)' }}>Settings</h2>

          <div style={{ display: 'grid', gap: 16 }}>
            <Section title="Notifications" icon={<Bell size={18} />}> 
              <Toggle label="Email alerts" checked={emailAlerts} onChange={setEmailAlerts} />
              <Toggle label="SMS alerts" checked={smsAlerts} onChange={setSmsAlerts} />
            </Section>

            <Section title="Appearance" icon={<Moon size={18} />}> 
              <Toggle label="Dark mode" checked={darkMode} onChange={setDarkMode} />
            </Section>

            <Section title="Privacy" icon={<Shield size={18} />}> 
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Your data is protected with enterprise-grade security.</p>
            </Section>

            <Section title="Language" icon={<Globe2 size={18} />}> 
              <select 
                value={locale} 
                onChange={(e) => setLocale(e.target.value)} 
                style={{ 
                  padding: 10, 
                  borderRadius: 10, 
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, children }) => (
  <div style={{ 
    border: '1px solid var(--border-color)', 
    borderRadius: 12, 
    padding: 16,
    background: 'var(--bg-primary)'
  }}>
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 8, 
      marginBottom: 10, 
      color: 'var(--text-primary)', 
      fontWeight: 700 
    }}>
      {icon}
      <span>{title}</span>
    </div>
    <div style={{ display: 'grid', gap: 10 }}>
      {children}
    </div>
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
  </label>
);

export default Settings;


