import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

const API_URL = 'http://localhost:5000/api';

const ObjectsList = () => {
  const { user } = useAuth();
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/objects`);
        setObjects(response.data);
      } catch (error) {
        console.error('Error fetching objects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchObjects();
  }, []);

  const getStatusStyle = (status) => {
    const styles = {
      IN_PROGRESS: { bg: 'rgba(45, 198, 83, 0.1)', color: 'var(--success)', text: 'В работе' },
      PLANNING: { bg: 'rgba(255, 193, 7, 0.1)', color: 'var(--warning)', text: 'Планирование' },
      COMPLETED: { bg: 'rgba(108, 117, 125, 0.1)', color: 'var(--secondary)', text: 'Завершён' }
    };
    return styles[status] || styles.PLANNING;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
        <Sidebar activePage="objects" />
        <main style={{ flex: 1, marginLeft: '280px', padding: '32px 40px' }}>
          <div style={{ textAlign: 'center', padding: '60px' }}>Загрузка...</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <Sidebar activePage="objects" />
      
      <main style={{
        flex: 1,
        marginLeft: '280px',
        padding: '32px 40px'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--primary)',
            marginBottom: '8px'
          }}>
            Объекты строительства
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--secondary)' }}>
            Управляйте всеми строительными проектами в одном месте
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '24px'
        }}>
          {objects.map((object) => {
            const status = getStatusStyle(object.status);
            return (
              <Link
                key={object.id}
                to={`/objects/${object.id}`}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid rgba(0,0,0,0.03)',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏗️</div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: 'var(--primary)',
                      margin: 0
                    }}>
                      {object.name}
                    </h3>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: status.bg,
                    color: status.color
                  }}>
                    {status.text}
                  </span>
                </div>

                <p style={{
                  fontSize: '13px',
                  color: 'var(--secondary)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  📍 {object.address}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '16px',
                  padding: '12px 0',
                  borderTop: '1px solid rgba(108, 117, 125, 0.1)',
                  borderBottom: '1px solid rgba(108, 117, 125, 0.1)'
                }}>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--secondary)', marginBottom: '2px' }}>ЗАКАЗЧИК</div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--primary)' }}>
                      {object.customer?.length > 20 ? object.customer.slice(0, 20) + '...' : object.customer}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--secondary)', marginBottom: '2px' }}>БЮДЖЕТ</div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--primary)' }}>
                      {(object.budget / 1000000).toFixed(1)} млн ₽
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--secondary)', marginBottom: '2px' }}>РУКОВОДИТЕЛЬ</div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--primary)' }}>
                      {object.manager?.split(' ')[0]}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--secondary)', marginBottom: '2px' }}>СРОК</div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--primary)' }}>
                      {object.endDate?.slice(5)}
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--secondary)' }}>Выполнение</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--accent)' }}>{object.progress}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${object.progress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)',
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                <div style={{
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent)',
                  fontSize: '13px',
                  fontWeight: '500'
                }}>
                  Подробнее →
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ObjectsList;