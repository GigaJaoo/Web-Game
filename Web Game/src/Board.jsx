import React from 'react';
import './Board.css';

export default function Board({ playerPosition, rows, cols }) {
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${cols}, 40px)`,
        gridTemplateRows: `repeat(${rows}, 40px)`
      }}
    >
      {Array.from({ length: rows * cols }, (_, i) => {
        const x = i % cols;
        const y = Math.floor(i / cols);
        const isPlayer = playerPosition.x === x && playerPosition.y === y;

        return (
          <div key={i} className="cell">
            {isPlayer && <div className="player" />}
          </div>
        );
      })}
    </div>
  );
}