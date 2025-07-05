import React from 'react';
import './Inventory.css';

export default function Inventory({ inventory, resourcesData }) {
  if (!inventory) return (
    <div className="inventory empty">
      Inventory Empty
    </div>
  );

  const resource = resourcesData[inventory];

  return (
    <div className="inventory filled">
      <div 
        className="inventory-icon" 
        style={{ backgroundColor: resource.color }}
        role="img" 
        aria-label={resource.name}
      >
        {resource.icon}
      </div>
      <div className="inventory-info">
        <span className="inventory-name">{resource.name}</span>
      </div>
    </div>
  );
}
