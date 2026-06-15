import React from 'react';

export function BarList({ title, items }) {
  const max = Math.max(...items.map((item) => item.total), 1);

  return (
    <div className="bar-list">
      <h3>{title}</h3>
      {items.map((item) => (
        <div className="bar-row" key={item.label}>
          <div className="bar-label">
            <span>{item.label}</span>
            <strong>{item.total}</strong>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(item.total / max) * 100}%` }} />
          </div>
        </div>
      ))}
      {!items.length && <p className="muted small">Sem dados ainda.</p>}
    </div>
  );
}
