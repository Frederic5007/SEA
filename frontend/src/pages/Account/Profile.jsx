import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { CalendarDays, Mail, UserCircle2, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center' }}>
        Please log in to view your profile.
      </div>
    );
  }

  const joined = new Date(user.joinedAt).toLocaleDateString();

  return (
    <div style={{ 
      paddingTop: 100, 
      minHeight: '100vh', 
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4 }}
          style={{ 
            background: 'var(--bg-card)', 
            borderRadius: 16, 
            padding: 24, 
            boxShadow: 'var(--shadow-light)',
            border: '1px solid var(--border-color)'
          }}
        >
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', 
              display: 'grid', 
              placeItems: 'center', 
              color: 'white' 
            }}>
              <UserCircle2 size={40} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--text-primary)' }}>{user.name}</h2>
              <div style={{ color: 'var(--text-secondary)' }}>Your SEA Account</div>
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
            <div style={{ 
              background: 'var(--bg-primary)', 
              borderRadius: 12, 
              padding: 16, 
              display: 'flex', 
              gap: 12, 
              alignItems: 'center',
              border: '1px solid var(--border-color)'
            }}>
              <Mail size={20} style={{ color: 'var(--text-accent)' }} />
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Email</div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.email}</div>
              </div>
            </div>
            <div style={{ 
              background: 'var(--bg-primary)', 
              borderRadius: 12, 
              padding: 16, 
              display: 'flex', 
              gap: 12, 
              alignItems: 'center',
              border: '1px solid var(--border-color)'
            }}>
              <CalendarDays size={20} style={{ color: 'var(--text-accent)' }} />
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Member since</div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{joined}</div>
              </div>
                         </div>
           </div>
           
           {/* Logout Button */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 0.4, delay: 0.2 }}
             style={{ marginTop: 24 }}
           >
             <button 
               onClick={logout}
               style={{
                 width: '100%',
                 padding: '12px 24px',
                 background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                 color: 'white',
                 border: 'none',
                 borderRadius: '12px',
                 fontWeight: '600',
                 fontSize: '1rem',
                 cursor: 'pointer',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 gap: '8px',
                 transition: 'all 0.2s ease',
                 boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
               }}
               onMouseEnter={(e) => {
                 e.target.style.transform = 'translateY(-2px)';
                 e.target.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)';
               }}
               onMouseLeave={(e) => {
                 e.target.style.transform = 'translateY(0)';
                 e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
               }}
             >
               <LogOut size={18} />
               Logout
             </button>
           </motion.div>
         </motion.div>
       </div>
     </div>
  );
};

export default Profile;


