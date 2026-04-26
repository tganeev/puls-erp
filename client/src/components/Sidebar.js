import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: '📊', label: 'Дашборд' },
    { path: '/objects', icon: '🏗️', label: 'Объекты' },
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'white',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 10
    }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ color: '#0F2B4D' }}>⚡ Пульс ERP</h2>
      </div>
      
      <nav style={{ flex: 1, padding: '20px 16px' }}>
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '14px',
              textDecoration: 'none',
              color: location.pathname === item.path ? '#FF6B00' : '#4b5563',
              background: location.pathname === item.path ? '#fff7ed' : 'transparent',
              marginBottom: '6px'
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div style={{ padding: '20px', borderTop: '1px solid #e5e7eb' }}>
        <button onClick={logout} style={{
          width: '100%',
          padding: '10px',
          background: '#fee2e2',
          border: 'none',
          borderRadius: '14px',
          color: '#E63946',
          cursor: 'pointer'
        }}>🚪 Выйти</button>
      </div>
    </aside>
  );
};

export default Sidebar;