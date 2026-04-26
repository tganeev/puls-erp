import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа');
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'prorab@puls.ru', password: '123456', role: 'Прораб' },
    { email: 'pto@puls.ru', password: '123456', role: 'Инженер ПТО' },
    { email: 'snab@puls.ru', password: '123456', role: 'Снабженец' },
    { email: 'director@puls.ru', password: '123456', role: 'Директор' },
  ];

  const fillDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #0F2B4D, #1a3a5c)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px' }}>
        <div style={{ marginBottom: '60px' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>⚡</div>
          <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>Пульс ERP</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>Управление строительными проектами<br />с искусственным интеллектом</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ fontSize: '40px' }}>🤖</span>
            <div><strong style={{ fontSize: '18px' }}>ИИ-ассистент для каждой роли</strong><br /><small style={{ opacity: 0.8 }}>Персональные помощники для всех сотрудников</small></div>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ fontSize: '40px' }}>📊</span>
            <div><strong style={{ fontSize: '18px' }}>Умная аналитика</strong><br /><small style={{ opacity: 0.8 }}>Прогнозы и рекомендации на основе данных</small></div>
          </div>
        </div>
      </div>
      
      <div style={{ flex: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', padding: '40px' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '32px', color: '#0F2B4D', marginBottom: '32px' }}>Вход в систему</h2>
          
          {error && (
            <div style={{ background: '#fee2e2', color: '#E63946', padding: '12px', borderRadius: '14px', marginBottom: '20px', fontSize: '14px' }}>
              {error}
            </div>
          )}
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#0F2B4D' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@puls.ru"
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '14px', fontSize: '16px' }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#0F2B4D' }}>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '14px', fontSize: '16px' }}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: '#FF6B00', 
              color: 'white', 
              border: 'none', 
              borderRadius: '14px', 
              fontSize: '16px', 
              fontWeight: '600', 
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
          
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '13px', color: '#6C757D', marginBottom: '12px' }}>Демо-аккаунты (пароль: 123456):</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {demoAccounts.map((acc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => fillDemo(acc.email, acc.password)}
                  style={{ padding: '8px 16px', background: '#f3f4f6', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px' }}
                >
                  {acc.role}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;