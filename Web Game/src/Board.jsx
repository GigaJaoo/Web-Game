// Board.jsx
import React from 'react';
import './Board.css';

export default function Board({ map, player, rows, cols, activeResource, resourcesData }) {
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
          const isResourceHere = activeResource && activeResource.x === x && activeResource.y === y;

          let className = 'cell';
          if (tile === 'center') className += ' center';
          if (tile === 'resource') className += ' resource';
          if (tile === 'cause') className += ' cause';
          if (tile === 'obstacle') className += ' obstacle';

          return (
            <div key={`${x}-${y}`} className={className}>
              {isPlayer && <div className="player" />}
              {isResourceHere && (
                <span
                  className="resource-icon"
                  style={{ color: resourcesData[activeResource.type].color, fontSize: '20px' }}
                  role="img"
                  aria-label={resourcesData[activeResource.type].name}
                >
                  {resourcesData[activeResource.type].icon}
                </span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

