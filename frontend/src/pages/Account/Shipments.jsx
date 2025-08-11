import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

const mockShipments = [
  { id: 'SEA-1001', origin: 'Douala Warehouse', destination: 'Yaoundé', eta: 'Today 16:30', status: 'In Transit', progress: 62 },
  { id: 'SEA-1002', origin: 'Paris Hub', destination: 'Douala', eta: 'Tue 10:00', status: 'Customs', progress: 45 },
  { id: 'SEA-1003', origin: 'Berlin', destination: 'Buea', eta: 'Fri 14:00', status: 'Delivered', progress: 100 },
  { id: 'SEA-1004', origin: 'Lagos', destination: 'Bamenda', eta: 'Tomorrow 12:00', status: 'Delayed', progress: 30 },
];

const statusToMeta = {
  'In Transit': { color: '#3b82f6', icon: <Truck size={18} /> },
  'Customs': { color: '#a16207', icon: <AlertCircle size={18} /> },
  'Delivered': { color: '#16a34a', icon: <CheckCircle2 size={18} /> },
  'Delayed': { color: '#dc2626', icon: <AlertCircle size={18} /> },
};

const Shipments = () => {
  const shipments = useMemo(() => mockShipments, []);

  return (
    <div style={{ 
      paddingTop: 100, 
      minHeight: '100vh', 
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ margin: '8px 0 16px', color: 'var(--text-primary)' }}
        >
          Your Shipments
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
          {shipments.map((s) => {
            const meta = statusToMeta[s.status] || { color: 'var(--text-secondary)', icon: <Package size={18} /> };
            return (
              <motion.div 
                key={s.id} 
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.25 }}
                style={{ 
                  background: 'var(--bg-card)', 
                  borderRadius: 16, 
                  padding: 16, 
                  boxShadow: 'var(--shadow-light)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{s.id}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: meta.color }}>
                    {meta.icon}
                    <span style={{ fontWeight: 700 }}>{s.status}</span>
                  </div>
                </div>
                <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={16} />{s.origin}</div>
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>→</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={16} />{s.destination}</div>
                </div>
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                  <Clock size={16} /> ETA: <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.eta}</span>
                </div>
                <div style={{ marginTop: 12, height: 8, background: 'var(--border-color)', borderRadius: 999 }}>
                  <div style={{ width: `${s.progress}%`, height: '100%', borderRadius: 999, background: `linear-gradient(135deg, ${meta.color}, var(--text-muted))` }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shipments;


