import React from 'react';

export function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal panel">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="ghost" onClick={onClose}>fechar</button>
        </div>
        {children}
      </div>
    </div>
  );
}
