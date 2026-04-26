import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Загрузка дашборда...
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const tasks = dashboardData?.tasks || [];
  const chart = dashboardData?.chart;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: 'white',
        borderRight: '1px solid #e5e7eb',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 10
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ color: '#0F2B4D' }}>⚡ Пульс ERP</h2>
        </div>
        <nav style={{ padding: '20px 16px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '14px', textDecoration: 'none', color: '#FF6B00', background: '#fff7ed', marginBottom: '6px' }}>
            <span>📊</span> Дашборд
          </a>
          <a href="/objects" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '14px', textDecoration: 'none', color: '#4b5563', marginBottom: '6px' }}>
            <span>🏗️</span> Объекты
          </a>
        </nav>
      </aside>
      
      {/* Main content */}
      <main style={{
        flex: 1,
        marginLeft: '260px',
        padding: '24px 32px',
        background: '#F8F9FA'
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{ fontSize: '28px', color: '#0F2B4D' }}>Дашборд {roleNames[user?.role] || user?.role}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>{user?.name}</span>
            <img src={user?.avatar} alt="avatar" style={{ width: '44px', height: '44px', borderRadius: '50%' }} />
          </div>
        </header>
        
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {user?.role === 'PROJECT_MANAGER' && (
            <>
              <div style={{ background: 'white', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
                <span style={{ fontSize: '32px' }}>🏗️</span>
                <div><div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F2B4D' }}>{stats.activeObjects || 3}</div><div style={{ fontSize: '14px', color: '#6C757D' }}>Активные объекты</div></div>
              </div>
              <div style={{ background: 'white', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
                <span style={{ fontSize: '32px' }}>🚚</span>
                <div><div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F2B4D' }}>{stats.materialsInTransit || 125.5} т</div><div style={{ fontSize: '14px', color: '#6C757D' }}>Материалы в пути</div></div>
              </div>
              <div style={{ background: 'white', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
                <span style={{ fontSize: '32px' }}>📊</span>
                <div><div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F2B4D' }}>{stats.monthProgress || 68}%</div><div style={{ fontSize: '14px', color: '#6C757D' }}>Выполнение плана</div></div>
              </div>
              <div style={{ background: 'white', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
                <span style={{ fontSize: '32px' }}>⏳</span>
                <div><div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F2B4D' }}>{stats.pendingApprovals || 4}</div><div style={{ fontSize: '14px', color: '#6C757D' }}>Ожидают согласования</div></div>
              </div>
            </>
          )}
          {user?.role === 'DIRECTOR' && (
            <>
              <div style={{ background: 'white', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
                <span style={{ fontSize: '32px' }}>🏗️</span>
                <div><div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F2B4D' }}>7</div><div style={{ fontSize: '14px', color: '#6C757D' }}>Всего проектов</div></div>
              </div>
              <div style={{ background: 'white', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
                <span style={{ fontSize: '32px' }}>⚡</span>
                <div><div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F2B4D' }}>4</div><div style={{ fontSize: '14px', color: '#6C757D' }}>Активные</div></div>
              </div>
              <div style={{ background: 'white', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
                <span style={{ fontSize: '32px' }}>💰</span>
                <div><div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F2B4D' }}>325 млн ₽</div><div style={{ fontSize: '14px', color: '#6C757D' }}>Бюджет</div></div>
              </div>
              <div style={{ background: 'white', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
                <span style={{ fontSize: '32px' }}>📈</span>
                <div><div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F2B4D' }}>18.5%</div><div style={{ fontSize: '14px', color: '#6C757D' }}>Рентабельность</div></div>
              </div>
            </>
          )}
        </div>
        
        {/* Tasks Table */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#0F2B4D' }}>Активные задачи</h2>
          {tasks.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6C757D' }}>Нет активных задач</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Задача</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Срок</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Статус</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px' }}>{task.title}</td>
                    <td style={{ padding: '12px' }}>{task.deadline || '—'}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        background: task.priority === 'high' ? '#fed7aa' : '#dbeafe',
                        color: task.priority === 'high' ? '#92400e' : '#1e40af'
                      }}>
                        {task.status === 'pending' ? 'Ожидает' : 'В работе'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Chart */}
        {chart && (
          <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#0F2B4D' }}>Выполнение плана работ</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '200px' }}>
              {chart.labels.map((label, idx) => (
                <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'flex-end', height: '150px' }}>
                    <div style={{ width: '30px', background: '#0F2B4D', height: `${chart.plan[idx]}%`, borderRadius: '4px' }}></div>
                    <div style={{ width: '30px', background: '#FF6B00', height: `${chart.fact[idx]}%`, borderRadius: '4px' }}></div>
                  </div>
                  <div style={{ marginTop: '12px', fontSize: '12px' }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '16px', height: '16px', background: '#0F2B4D' }}></div>План</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '16px', height: '16px', background: '#FF6B00' }}></div>Факт</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;