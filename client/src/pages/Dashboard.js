import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const API_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard/${user?.role}`);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchDashboard();
    } else {
      setLoading(false);
    }
  }, [user]);

  const roleNames = {
    PROJECT_MANAGER: 'Прораб',
    PTO_ENGINEER: 'Инженер ПТО',
    SUPPLY_ENGINEER: 'Снабженец',
    DIRECTOR: 'Руководитель'
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--background)'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid var(--primary)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const tasks = dashboardData?.tasks || [];
  const chart = dashboardData?.chart;
  const recentActivities = dashboardData?.recentActivities || [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      <Sidebar activePage="dashboard" />
      
      <main style={{
        flex: 1,
        marginLeft: '280px',
        padding: '32px 40px',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--primary)',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif'
          }}>
            Добро пожаловать, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'var(--secondary)',
            lineHeight: '1.5'
          }}>
            Вот что происходит с вашими проектами сегодня
          </p>
        </div>

        {/* Stats Cards with modern design */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(0,0,0,0.03)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)'
            }} />
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>🏗️</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>
              {stats.activeObjects || 3}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--secondary)' }}>Активных объектов</div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--success)' }}>↑ 12% с прошлого месяца</div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(0,0,0,0.03)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)'
            }} />
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>📊</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>
              {stats.monthProgress || 68}%
            </div>
            <div style={{ fontSize: '14px', color: 'var(--secondary)' }}>Выполнение плана</div>
            <div style={{ marginTop: '12px', height: '6px', background: '#e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${stats.monthProgress || 68}%`, height: '100%', background: 'var(--accent)', borderRadius: '10px' }} />
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(0,0,0,0.03)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)'
            }} />
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>⏳</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>
              {stats.pendingApprovals || 4}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--secondary)' }}>Ожидают согласования</div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--warning)' }}>Требуют внимания</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #1a3a5c 100%)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: 'var(--shadow-md)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)',
              borderRadius: '50%'
            }} />
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>🤖</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>
              ИИ-аналитика
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>
              Анализ завершён. Рекомендации готовы.
            </div>
            <button style={{
              marginTop: '16px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              Открыть аналитику →
            </button>
          </div>
        </div>

        {/* Two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Tasks Section */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary)' }}>Активные задачи</h2>
              <button style={{
                fontSize: '13px',
                color: 'var(--accent)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}>
                Все задачи →
              </button>
            </div>
            {tasks.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--secondary)' }}>
                ✨ Нет активных задач
              </div>
            ) : (
              <div>
                {tasks.map((task, idx) => (
                  <div key={task.id} style={{
                    padding: '16px',
                    borderBottom: idx === tasks.length - 1 ? 'none' : '1px solid rgba(108, 117, 125, 0.1)',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: task.priority === 'high' ? 'var(--danger)' : task.priority === 'medium' ? 'var(--warning)' : 'var(--success)'
                      }} />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--primary)', flex: 1 }}>{task.title}</span>
                      <span style={{
                        fontSize: '11px',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        background: task.status === 'pending' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(45, 198, 83, 0.1)',
                        color: task.status === 'pending' ? 'var(--warning)' : 'var(--success)'
                      }}>
                        {task.status === 'pending' ? 'В ожидании' : 'В работе'}
                      </span>
                    </div>
                    {task.deadline && (
                      <div style={{ fontSize: '11px', color: 'var(--secondary)', marginLeft: '20px' }}>
                        📅 Срок: {task.deadline}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chart Section */}
          {chart && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary)', marginBottom: '20px' }}>
                Выполнение плана работ
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '220px' }}>
                {chart.labels.map((label, idx) => (
                  <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'flex-end', height: '160px' }}>
                      <div style={{
                        width: '28px',
                        background: 'var(--primary)',
                        height: `${chart.plan[idx]}%`,
                        borderRadius: '8px 8px 4px 4px',
                        transition: 'height 0.5s ease'
                      }}>
                        <div style={{
                          textAlign: 'center',
                          fontSize: '10px',
                          color: 'white',
                          marginTop: '-18px'
                        }}>
                          {chart.plan[idx]}%
                        </div>
                      </div>
                      <div style={{
                        width: '28px',
                        background: 'var(--accent)',
                        height: `${chart.fact[idx]}%`,
                        borderRadius: '8px 8px 4px 4px',
                        transition: 'height 0.5s ease'
                      }}>
                        <div style={{
                          textAlign: 'center',
                          fontSize: '10px',
                          color: 'white',
                          marginTop: '-18px'
                        }}>
                          {chart.fact[idx]}%
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--secondary)' }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(108, 117, 125, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '3px' }} />
                  <span style={{ fontSize: '12px', color: 'var(--secondary)' }}>План</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', background: 'var(--accent)', borderRadius: '3px' }} />
                  <span style={{ fontSize: '12px', color: 'var(--secondary)' }}>Факт</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {recentActivities.length > 0 && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary)', marginBottom: '20px' }}>
              Последние действия
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivities.map((activity, idx) => (
                <div key={activity.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px',
                  background: 'rgba(248, 249, 250, 0.5)',
                  borderRadius: '12px',
                  transition: 'all 0.2s'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255, 107, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    👤
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: 'var(--primary)' }}>
                      <strong>{activity.user}</strong> {activity.action}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--secondary)', marginTop: '2px' }}>
                      {activity.object} • {activity.time}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--accent)' }}>→</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;