import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ activePage }) => {
  const { user, logout } = useAuth();
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Дашборд', path: '/' },
    { id: 'objects', icon: '🏗️', label: 'Объекты', path: '/objects' },
    { id: 'analytics', icon: '📈', label: 'Аналитика', path: '/analytics' },
    { id: 'documents', icon: '📄', label: 'Документы', path: '/documents' },
    { id: 'chat', icon: '💬', label: 'Чат', path: '/chat' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <aside style={{
      width: '280px',
      background: 'white',
      borderRight: '1px solid rgba(108, 117, 125, 0.1)',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      backdropFilter: 'blur(10px)',
    }}>
      {/* Logo */}
      <div style={{
        padding: '32px 24px',
        borderBottom: '1px solid rgba(108, 117, 125, 0.1)',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            animation: 'pulse 2s infinite'
          }}>
            ⚡
          </div>
          <div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              Пульс ERP
            </h1>
            <p style={{
              fontSize: '11px',
              color: 'var(--secondary)',
              margin: '4px 0 0 0'
            }}>
              AI-powered construction
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '0 16px' }}>
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.path}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 16px',
              borderRadius: '14px',
              textDecoration: 'none',
              marginBottom: '8px',
              transition: 'all 0.2s ease',
              background: activePage === item.id 
                ? 'linear-gradient(135deg, rgba(15, 43, 77, 0.05) 0%, rgba(255, 107, 0, 0.05) 100%)'
                : 'transparent',
              color: activePage === item.id ? 'var(--accent)' : 'var(--secondary)',
              borderLeft: activePage === item.id ? `3px solid var(--accent)` : '3px solid transparent',
              transform: hoveredItem === item.id ? 'translateX(4px)' : 'translateX(0)'
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif'
            }}>
              {item.label}
            </span>
            {activePage === item.id && (
              <span style={{
                marginLeft: 'auto',
                fontSize: '12px',
                opacity: 0.7
              }}>
                →
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* User Section */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid rgba(108, 117, 125, 0.1)',
        background: 'rgba(248, 249, 250, 0.5)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            color: 'white'
          }}>
            👤
          </div>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--primary)'
            }}>
              {user?.name || 'Пользователь'}
            </div>
            <div style={{
              fontSize: '11px',
              color: 'var(--secondary)'
            }}>
              {user?.role?.replace('_', ' ') || 'Роль'}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: '1px solid rgba(230, 57, 70, 0.2)',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '500',
            color: 'var(--danger)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            fontFamily: 'Inter, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(230, 57, 70, 0.05)';
            e.currentTarget.style.borderColor = 'var(--danger)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(230, 57, 70, 0.2)';
          }}
        >
          <span>🚪</span>
          Выйти
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;