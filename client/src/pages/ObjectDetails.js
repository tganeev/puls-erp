import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

const API_URL = 'http://localhost:5000/api';

const ObjectDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [object, setObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchObject = async () => {
      try {
        const response = await axios.get(`${API_URL}/objects/${id}`);
        setObject(response.data);
      } catch (error) {
        console.error('Error fetching object:', error);
        if (error.response?.status === 404) {
          navigate('/objects');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchObject();
  }, [id, navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: '260px', padding: '24px' }}>
          <div>Загрузка объекта...</div>
        </main>
      </div>
    );
  }

  if (!object) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: '260px', padding: '24px' }}>
          <div>Объект не найден</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      <main style={{ flex: 1, marginLeft: '260px', padding: '24px 32px', background: '#F8F9FA' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button 
            onClick={() => navigate('/objects')} 
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #6C757D', borderRadius: '14px', cursor: 'pointer' }}
          >
            ← Назад
          </button>
          <button style={{ padding: '8px 24px', background: '#FF6B00', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer' }}>
            Редактировать
          </button>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', color: '#0F2B4D', marginBottom: '8px' }}>{object.name}</h1>
          <p style={{ color: '#6C757D' }}>{object.address}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{ padding: '12px 24px', background: 'transparent', border: 'none', color: activeTab === 'overview' ? '#FF6B00' : '#6C757D', borderBottom: activeTab === 'overview' ? '2px solid #FF6B00' : 'none', cursor: 'pointer' }}
          >
            Обзор
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            style={{ padding: '12px 24px', background: 'transparent', border: 'none', color: activeTab === 'tasks' ? '#FF6B00' : '#6C757D', borderBottom: activeTab === 'tasks' ? '2px solid #FF6B00' : 'none', cursor: 'pointer' }}
          >
            Задачи
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
              <h3 style={{ marginBottom: '20px', color: '#0F2B4D' }}>Общая информация</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ color: '#6C757D' }}>Заказчик:</span>
                <span>{object.customer}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ color: '#6C757D' }}>РП:</span>
                <span>{object.manager}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                <span style={{ color: '#6C757D' }}>Сроки:</span>
                <span>{object.startDate} — {object.endDate}</span>
              </div>
            </div>
            
            <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
              <h3 style={{ marginBottom: '20px', color: '#0F2B4D' }}>Бюджет</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                <span style={{ color: '#6C757D' }}>Плановый бюджет:</span>
                <span>{(object.budget / 1000000).toFixed(1)} млн ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                <span style={{ color: '#6C757D' }}>Фактические затраты:</span>
                <span>{(object.actualCost / 1000000).toFixed(1)} млн ₽</span>
              </div>
              <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '10px', marginTop: '16px' }}>
                <div style={{ width: `${(object.actualCost / object.budget) * 100}%`, height: '100%', background: '#FF6B00', borderRadius: '10px' }}></div>
              </div>
            </div>
            
            <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
              <h3 style={{ marginBottom: '20px', color: '#0F2B4D' }}>Выполнение</h3>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#FF6B00', marginBottom: '16px' }}>{object.progress}%</div>
                <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '10px' }}>
                  <div style={{ width: `${object.progress}%`, height: '100%', background: '#2DC653', borderRadius: '10px' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'tasks' && (
          <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
            {object.tasks && object.tasks.map(task => (
              <div key={task.id} style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4>{task.title}</h4>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', background: task.status === 'completed' ? '#d1fae5' : '#fed7aa', color: task.status === 'completed' ? '#065f46' : '#92400e' }}>
                    {task.status === 'completed' ? 'Выполнено' : task.status === 'in_progress' ? 'В работе' : 'Ожидает'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '10px' }}>
                    <div style={{ width: `${task.progress}%`, height: '100%', background: '#FF6B00', borderRadius: '10px' }}></div>
                  </div>
                  <span style={{ fontSize: '14px' }}>{task.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ObjectDetails;