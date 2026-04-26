import React from 'react';

const StatsCards = ({ stats, role }) => {
  if (!stats) return null;

  const getCards = () => {
    if (role === 'PROJECT_MANAGER') {
      return [
        { label: 'Активные объекты', value: stats.activeObjects, icon: '🏗️' },
        { label: 'Материалы в пути', value: `${stats.materialsInTransit} т`, icon: '🚚' },
        { label: 'Выполнение плана', value: `${stats.monthProgress}%`, icon: '📊' },
        { label: 'Ожидают согласования', value: stats.pendingApprovals, icon: '⏳' }
      ];
    }
    return [
      { label: 'Всего проектов', value: stats.totalProjects || 7, icon: '🏗️' },
      { label: 'Активные', value: stats.activeProjects || 4, icon: '⚡' },
      { label: 'Бюджет', value: '325 млн ₽', icon: '💰' },
      { label: 'Рентабельность', value: '18.5%', icon: '📈' }
    ];
  };

  const cards = getCards();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    }}>
      {cards.map((card, idx) => (
        <div key={idx} style={{
          background: 'white',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
        }}>
          <div style={{ fontSize: '32px' }}>{card.icon}</div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F2B4D' }}>{card.value}</div>
            <div style={{ fontSize: '14px', color: '#6C757D' }}>{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;