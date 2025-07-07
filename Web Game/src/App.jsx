import React, { useState, useEffect, useRef } from 'react';
import Board from './Board';
import './App.css';
import { initialMap, tileTypes } from './mapData.js';
import Inventory from './Inventory';
import { getRandomResourceType } from './resourceUtils';
import { resourcesData } from './resourcesData.js';

export default function App() {
  const numRows = 15;
  const numCols = 15;
  const initialTime = 2 * 60; // 2 minutos

  const [mapData, setMapData] = useState(initialMap);
  const [player, setPlayer] = useState({
    position: { x: 7, y: 7 },
    inventory: null,
  });
  const [resources, setResources] = useState([]);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gameStatus, setGameStatus] = useState('idle'); // 'idle', 'running', 'paused', 'ended'
  const intervalRef = useRef(null);
  const resourceIntervalRef = useRef(null);

  // Função para determinar o intervalo de geração baseado no tempo restante
  const getResourceSpawnInterval = (timeLeft) => {
    if (timeLeft > 90) return 5000; // 2:00 - 1:30 = 5 segundos
    if (timeLeft > 60) return 4000; // 1:30 - 1:00 = 4 segundos
    if (timeLeft > 30) return 3000; // 1:00 - 0:30 = 3 segundos
    return 2000; // 0:30 - 0:00 = 2 segundos
  };

  // Controlador de tempo
  useEffect(() => {
    if (gameStatus === 'running') {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            clearInterval(resourceIntervalRef.current);
            setGameStatus('ended');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [gameStatus]);

  // Geração de recursos quando o jogo está a correr
  useEffect(() => {
    if (gameStatus === 'running') {
      const spawnInterval = getResourceSpawnInterval(timeLeft);
      
      // Limpar o intervalo anterior se existir
      if (resourceIntervalRef.current) {
        clearInterval(resourceIntervalRef.current);
      }
      
      resourceIntervalRef.current = setInterval(() => {
        generateResource();
      }, spawnInterval);
    }
    
    return () => {
      if (resourceIntervalRef.current) {
        clearInterval(resourceIntervalRef.current);
      }
    };
  }, [gameStatus]); // Remover timeLeft da dependência

  // Atualizar o intervalo apenas quando mudamos de faixa de tempo
  useEffect(() => {
    if (gameStatus === 'running') {
      const currentInterval = getResourceSpawnInterval(timeLeft);
      const previousInterval = getResourceSpawnInterval(timeLeft + 1);
      
      // Só atualizar se mudamos de faixa (intervalo diferente)
      if (currentInterval !== previousInterval) {
        if (resourceIntervalRef.current) {
          clearInterval(resourceIntervalRef.current);
        }
        
        resourceIntervalRef.current = setInterval(() => {
          generateResource();
        }, currentInterval);
      }
    }
  }, [timeLeft, gameStatus]);

  const generateResource = () => {
    const emptyTiles = [];
    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        const alreadyHasResource = resources.some(r => r.x === x && r.y === y);
        if (mapData[y][x] === tileTypes.RESOURCE && !alreadyHasResource) {
          emptyTiles.push({ x, y });
        }
      }
    }

    if (emptyTiles.length === 0) return;

    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    const resourceType = getRandomResourceType();

    setResources(prev => [...prev, { x: randomTile.x, y: randomTile.y, type: resourceType }]);
  };

  const movePlayer = (dx, dy) => {
    if (gameStatus !== 'running') return;

    setPlayer(prev => {
      const newX = Math.max(0, Math.min(numCols - 1, prev.position.x + dx));
      const newY = Math.max(0, Math.min(numRows - 1, prev.position.y + dy));

      if (mapData[newY][newX] === tileTypes.OBSTACLE) return prev;

      return {
        ...prev,
        position: { x: newX, y: newY }
      };
    });
  };

  // Apanhar recurso automaticamente
  useEffect(() => {
    if (player.inventory === null) {
      const resource = resources.find(r =>
        r.x === player.position.x && r.y === player.position.y
      );
      if (resource) {
        setPlayer(prev => ({ ...prev, inventory: resource.type }));
        setResources(prev => prev.filter(r => !(r.x === resource.x && r.y === resource.y)));
      }
    }
  }, [player.position, resources]);

  // Entregar recurso
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== 'running') return;

      if (e.key === 'ArrowUp' || e.key === 'w') movePlayer(0, -1);
      if (e.key === 'ArrowDown' || e.key === 's') movePlayer(0, 1);
      if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') movePlayer(1, 0);

      if (e.key === ' ' || e.code === 'Space') {
        const { x, y } = player.position;
        if (mapData[y][x] === tileTypes.CAUSE && player.inventory !== null) {
          setPlayer(prev => ({ ...prev, inventory: null }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, mapData, gameStatus]);

  // Botões de controlo
  const startGame = () => {
    setGameStatus('running');
    setTimeLeft(initialTime);
    setResources([]);
    setPlayer({ position: { x: 7, y: 7 }, inventory: null });
  };

  const pauseGame = () => {
    setGameStatus('paused');
    clearInterval(intervalRef.current);
    clearInterval(resourceIntervalRef.current);
  };

  const resumeGame = () => {
    setGameStatus('running');
  };

  const restartGame = () => {
    setGameStatus('idle');
    setTimeLeft(initialTime);
    setResources([]);
    setPlayer({ position: { x: 7, y: 7 }, inventory: null });
  };

  return (
    <div className="app-container">
      <h1>Humanitarian Manager</h1>

      <div className="controls">
        <button onClick={startGame} disabled={gameStatus === 'running'}>Start</button>
        <button onClick={pauseGame} disabled={gameStatus !== 'running'}>Pause</button>
        <button onClick={resumeGame} disabled={gameStatus !== 'paused'}>Resume</button>
        <button onClick={restartGame}>Restart</button>
      </div>

      <div className="timer">Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>

      <Inventory inventory={player.inventory} resourcesData={resourcesData} />
      <Board
        player={player}
        map={mapData}
        rows={numRows}
        cols={numCols}
        resources={resources}
        resourcesData={resourcesData}
      />
    </div>
  );
}