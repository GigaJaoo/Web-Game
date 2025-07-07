import React from 'react';
import './Board.css';

export default function Board({ map, player, rows, cols, resources, resourcesData }) {
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${cols}, 40px)`,
        gridTemplateRows: `repeat(${rows}, 40px)`
      }}
    >
      {map.map((row, y) =>
        row.map((tile, x) => {
          const isPlayer = player.position.x === x && player.position.y === y;
          const resource = resources.find(r => r.x === x && r.y === y);

          let className = 'cell';
          if (tile === 'center') className += ' center';
          if (tile === 'resource') className += ' resource';
          if (tile === 'cause') className += ' cause';
          if (tile === 'obstacle') className += ' obstacle';

          return (
            <div key={`${x}-${y}`} className={className}>
              {isPlayer && <div className="player" />}
              {resource && (
                <span style={{ fontSize: '22px', lineHeight: '40px' }}>
                  {resourcesData[resource.type].icon}
                </span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
