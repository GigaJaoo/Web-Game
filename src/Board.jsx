import React from 'react';
import './Board.css';

export default function Board({ map, player, rows, cols, resources, resourcesData }) {
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${cols}, 35px)`,
        gridTemplateRows: `repeat(${rows}, 35px)`
      }}
    >
      {map.map((row, y) =>
        row.map((tile, x) => {
          const isPlayer = player.position.x === x && player.position.y === y;
          const resource = resources.find(r => r.x === x && r.y === y);

          let className = 'cell';
          if (tile === 'center') className += ' center';
          if (tile === 'resource') className += ' resource';
          if (tile === 'empty') className += ' empty';
          if (tile === 'cause') className += ' cause';
          if (tile === 'obstacle') className += ' obstacle';
          if (tile === 'lake') className += ' lake';
          if (tile === 'forest') className += ' forest';
          if (tile === 'mountain') className += ' mountain';

          return (
            <div key={`${x}-${y}`} className={className}>
              {isPlayer && <div className="player" />}
              {resource && (
                <span className="resource-icon">
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