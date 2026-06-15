import React from 'react';

export function StatCard({ icon: Icon, label, value }) {
  return (
    <article className="stat-card panel">
      <div className="stat-icon">
        <Icon size={22} />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
