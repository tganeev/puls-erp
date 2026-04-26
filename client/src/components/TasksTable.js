import React from 'react';

const TasksTable = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#6C757D' }}>Нет активных задач</div>;
  }

  return (
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
  );
};

export default TasksTable;