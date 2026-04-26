import React from 'react';

const ProgressChart = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '200px' }}>
        {data.labels.map((label, idx) => (
          <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'flex-end', height: '150px' }}>
              <div style={{ width: '30px', background: '#0F2B4D', height: `${data.plan[idx]}%`, borderRadius: '4px' }}></div>
              <div style={{ width: '30px', background: '#FF6B00', height: `${data.fact[idx]}%`, borderRadius: '4px' }}></div>
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
  );
};

export default ProgressChart;