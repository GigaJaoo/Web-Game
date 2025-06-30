import React, { useState, useEffect } from 'react';

export default function Player({ rows, cols, onPositionChange }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const movePlayer = (dx, dy) => {
    setPosition(prev => {
      const newX = Math.max(0, Math.min(cols - 1, prev.x + dx));
      const newY = Math.max(0, Math.min(rows - 1, prev.y + dy));
      const newPos = { x: newX, y: newY };
      if (onPositionChange) onPositionChange(newPos);
      return newPos;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') movePlayer(0, -1);
      if (e.key === 'ArrowDown' || e.key === 's') movePlayer(0, 1);
      if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') movePlayer(1, 0);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;  // O Player não renderiza nada, só controla o estado
}