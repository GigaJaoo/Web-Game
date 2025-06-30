import React, { useState, useEffect } from 'react';
import Board from './Board';
import './App.css';  // importa o css do container

export default function App() {
  const numRows = 15;
  const numCols = 15;

  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  const movePlayer = (dx, dy) => {
    setPlayerPosition((prev) => {
      const newX = Math.max(0, Math.min(numCols - 1, prev.x + dx));
      const newY = Math.max(0, Math.min(numRows - 1, prev.y + dy));
      return { x: newX, y: newY };
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

  return (
    <div className="app-container">
      <h1>Gestor Humanitário</h1>
      <Board playerPosition={playerPosition} rows={numRows} cols={numCols} />
    </div>
  );
}
