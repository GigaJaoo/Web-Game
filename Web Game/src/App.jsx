// App.jsx
import React, { useState, useEffect } from 'react';
import Board from './Board';
import './App.css';
import { initialMap, tileTypes } from './mapData.js';
import Inventory from './Inventory';
import { getRandomResourceType } from './resourceUtils';
import { resourcesData } from './resourcesData.js';


export default function App() {
  const numRows = 15;
  const numCols = 15;
  const resourceSpawnInterval = 5000; // 10 segundos, ajusta como quiseres

  const [mapData, setMapData] = useState(initialMap);
  const [player, setPlayer] = useState({
    position: { x: 7, y: 7 },
    inventory: null,
  });
  const [activeResource, setActiveResource] = useState(null); 
  // Exemplo: { x: 3, y: 5, type: 'food supplies' }

  // Função para gerar recurso numa tile resource vazia
  const generateResource = () => {
    if (activeResource) return; // Já existe recurso no mapa, não gerar

    // Encontra todas as tiles resource sem recurso
    const resourceTiles = [];
    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        if (
          mapData[y][x] === tileTypes.RESOURCE &&
          (!activeResource || (activeResource.x !== x || activeResource.y !== y))
        ) {
          resourceTiles.push({ x, y });
        }
      }
    }

    if (resourceTiles.length === 0) return;

    // Escolhe aleatoriamente uma tile resource
    const randomIndex = Math.floor(Math.random() * resourceTiles.length);
    const chosenTile = resourceTiles[randomIndex];
    const resourceType = getRandomResourceType();

    setActiveResource({
      x: chosenTile.x,
      y: chosenTile.y,
      type: resourceType,
    });
  };

  const movePlayer = (dx, dy) => {
    setPlayer((prev) => {
      const newX = Math.max(0, Math.min(numCols - 1, prev.position.x + dx));
      const newY = Math.max(0, Math.min(numRows - 1, prev.position.y + dy));

      // Impede movimento em obstáculo
      if (mapData[newY][newX] === tileTypes.OBSTACLE) {
        return prev;
      }

      return {
        ...prev,
        position: { x: newX, y: newY }
      };
    });
  };

  // Coleta recurso automaticamente se pisar tile com recurso e inventário vazio
  useEffect(() => {
    if (
      activeResource &&
      player.position.x === activeResource.x &&
      player.position.y === activeResource.y &&
      player.inventory === null
    ) {
      setPlayer((prev) => ({ ...prev, inventory: activeResource.type }));
      setActiveResource(null);
    }
  }, [player.position, activeResource]);

  // Lógica de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') movePlayer(0, -1);
      if (e.key === 'ArrowDown' || e.key === 's') movePlayer(0, 1);
      if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') movePlayer(1, 0);

      // Entregar recurso ao carregar espaço numa tile cause
      if (e.key === ' ' || e.code === 'Space') {
        const { x, y } = player.position;
        if (mapData[y][x] === tileTypes.CAUSE && player.inventory !== null) {
          setPlayer((prev) => ({ ...prev, inventory: null }));
          // Aqui podes acrescentar lógica para contabilizar entrega, pontos etc.
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, mapData]);

  // Gerar recurso a cada X segundos
  useEffect(() => {
    const interval = setInterval(() => {
      generateResource();
    }, resourceSpawnInterval);

    return () => clearInterval(interval);
  }, [activeResource, mapData]);

  return (
    <div className="app-container">
      <h1>Humanitarian Manager</h1>
      <Inventory inventory={player.inventory} resourcesData={resourcesData} />
      <Board
        player={player}
        map={mapData}
        rows={numRows}
        cols={numCols}
        activeResource={activeResource}
        resourcesData={resourcesData}
      />
    </div>
  );
}
