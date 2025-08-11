import React from 'react';
import { Bus, Train, MapPin } from 'lucide-react';

const RoutesPage = () => {
  return (
    <div style={{ padding: '120px 24px 60px', textAlign: 'center', minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <MapPin size={64} style={{ color: '#3b82f6', marginBottom: '24px' }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>
          Routes & Planning
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '40px' }}>
          Explore our comprehensive network of bus and train routes across the metropolitan area.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '60px' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Bus size={32} style={{ color: '#3b82f6', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Bus Routes</h3>
            <p style={{ color: '#64748b' }}>150+ bus routes covering all city areas</p>
          </div>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Train size={32} style={{ color: '#3b82f6', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Train Routes</h3>
            <p style={{ color: '#64748b' }}>8 metro lines with express services</p>
          </div>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <MapPin size={32} style={{ color: '#3b82f6', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Route Planner</h3>
            <p style={{ color: '#64748b' }}>Smart journey planning with real-time updates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
