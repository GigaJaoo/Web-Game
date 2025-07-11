import React, { useState, useEffect, useRef } from 'react';
import Board from './Board';
import './App.css';
import { initialMap, tileTypes } from './mapData.js';
import Inventory from './Inventory';
import Score from './Score';
import InfoPanel from './InfoPanel';
import Ranking from './Ranking';
import { getRandomResourceType } from './resourceUtils';
import { resourcesData } from './resourcesData.js';

export default function App() {
  const numRows = 21;
  const numCols = 21;
  const initialTime = 3 * 60; // 3 minutos

  const [mapData, setMapData] = useState(initialMap);
  const [player, setPlayer] = useState({
    position: { x: 10, y: 10 },
    inventory: null,
  });
  const [resources, setResources] = useState([]);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gameStatus, setGameStatus] = useState('idle'); // 'idle', 'running', 'paused', 'ended'
  const [score, setScore] = useState(0); // Novo estado para o score
  
  // Estado para eventos de bónus
  const [bonusEvent, setBonusEvent] = useState({
    active: false,
    resourceType: null,
    timeRemaining: 0
  });
  
  const intervalRef = useRef(null);
  const resourceIntervalRef = useRef(null);

  // Função para verificar se deve haver um evento ativo
  const checkForBonusEvent = (currentTime) => {
    // Períodos de eventos: 2:30-2:00 (150-120), 1:30-1:00 (90-60), 0:30-0:00 (30-0)
    const eventPeriods = [
      { start: 150, end: 120 }, // 2:30 - 2:00
      { start: 90, end: 60 },   // 1:30 - 1:00
      { start: 30, end: 0 }     // 0:30 - 0:00
    ];

    const currentPeriod = eventPeriods.find(period => 
      currentTime <= period.start && currentTime > period.end
    );

    if (currentPeriod) {
      setBonusEvent(prev => {
        // Se já há um evento ativo do mesmo período, apenas atualiza o tempo
        if (prev.active && prev.timeRemaining > 0) {
          return {
            ...prev,
            timeRemaining: currentTime - currentPeriod.end
          };
        }
        // Se é um novo evento, seleciona um novo tipo de recurso
        else {
          const resourceTypes = Object.keys(resourcesData);
          const randomResourceType = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
          return {
            active: true,
            resourceType: randomResourceType,
            timeRemaining: currentTime - currentPeriod.end
          };
        }
      });
    } else {
      // Não há evento ativo
      setBonusEvent({
        active: false,
        resourceType: null,
        timeRemaining: 0
      });
    }
  };

  // Função para determinar cores do timer baseado no tempo restante
  const getTimerClass = (timeLeft, initialTime) => {
    const percentage = timeLeft / initialTime;
    if (percentage > 0.5) return 'safe';      // Verde: mais de 50%
    if (percentage > 0.25) return 'warning';  // Amarelo: 25-50%
    return 'danger';                          // Vermelho: menos de 25%
  };

  // Função para determinar o intervalo de geração baseado no tempo restante
  const getResourceSpawnInterval = (timeLeft) => {
    if (timeLeft > 110) return 5000; // 3:00 - 1:50 = 5 segundos
    if (timeLeft > 80) return 4000; // 1:50 - 1:20 = 4 segundos
    if (timeLeft > 45) return 3000; // 1:20 - 0:45 = 3 segundos
    return 2000; // 0:45 - 0:00 = 2 segundos
  };

  // Controlador de tempo 
  useEffect(() => {
    if (gameStatus === 'running') {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          
          // Verificar eventos de bónus
          checkForBonusEvent(newTime);
          
          if (newTime <= 0) {
            clearInterval(intervalRef.current);
            clearInterval(resourceIntervalRef.current);
            setGameStatus('ended');
            return 0;
          }
          return newTime;
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
  }, [gameStatus]);

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

  // Gerar recursos
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

  // Mexer o Player
  const movePlayer = (dx, dy) => {
    if (gameStatus !== 'running') return;

    setPlayer(prev => {
      const newX = Math.max(0, Math.min(numCols - 1, prev.position.x + dx));
      const newY = Math.max(0, Math.min(numRows - 1, prev.position.y + dy));

      if (mapData[newY][newX] === tileTypes.OBSTACLE || 
          mapData[newY][newX] === tileTypes.MOUNTAIN || 
          mapData[newY][newX] === tileTypes.LAKE     || 
          mapData[newY][newX] === tileTypes.FOREST) return prev;

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
        if (player.inventory !== null) {
          // Verificar se há bónus ativo para este tipo de recurso
          const hasBonus = bonusEvent.active && bonusEvent.resourceType === player.inventory;
          
          if (mapData[y][x] === tileTypes.CAUSE) {
            // Entregar em causa = 2 pontos (4 com bónus)
            const basePoints = 2;
            const points = hasBonus ? basePoints * 2 : basePoints;
            setPlayer(prev => ({ ...prev, inventory: null }));
            setScore(prev => prev + points);
          } else if (mapData[y][x] === tileTypes.CENTER) {
            // Entregar no centro = 1 ponto (2 com bónus)
            const basePoints = 1;
            const points = hasBonus ? basePoints * 2 : basePoints;
            setPlayer(prev => ({ ...prev, inventory: null }));
            setScore(prev => prev + points);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, mapData, gameStatus, bonusEvent]); // Adicionada dependência bonusEvent

  // Botões de controlo 
  const startGame = () => {
    setGameStatus('running');
    setTimeLeft(initialTime);
    setResources([]);
    setScore(0); // Reset do score
    setPlayer({ position: { x: 10, y: 10 }, inventory: null });
    setBonusEvent({ active: false, resourceType: null, timeRemaining: 0 }); 
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
    setScore(0); // Reset do score
    setPlayer({ position: { x: 10, y: 10 }, inventory: null });
    setBonusEvent({ active: false, resourceType: null, timeRemaining: 0 });
  };

  return (
    <div className="game-layout">
      <InfoPanel />
      
      <div className="app-container">
        <h1>Humanitarian Manager</h1>
        <h2>Olá Mundo</h2>

        <div className="controls">
          <button onClick={startGame} disabled={gameStatus === 'running'}>Start</button>
          <button onClick={pauseGame} disabled={gameStatus !== 'running'}>Pause</button>
          <button onClick={resumeGame} disabled={gameStatus !== 'paused'}>Resume</button>
          <button onClick={restartGame}>Restart</button>
        </div>

        <div className="game-info">
          <div className={`timer ${getTimerClass(timeLeft, initialTime)}`}>
            Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
          <Score score={score} />
        </div>

        <div className="inventory-row">
          <Inventory inventory={player.inventory} resourcesData={resourcesData} />
          
          {/* Painel de evento sempre visível */}
          <div className={`event-panel ${bonusEvent.active ? 'active' : 'inactive'}`}>
            {bonusEvent.active ? (
              <>
                <div className="bonus-header">
                  <span className="bonus-icon">⚡</span>
                  SPECIAL REQUEST
                  <span className="bonus-icon">⚡</span>
                </div>
                <div className="bonus-content">
                  <div className="bonus-resource">
                    <span 
                      className="bonus-resource-icon"
                      style={{ backgroundColor: resourcesData[bonusEvent.resourceType]?.color }}
                    >
                      {resourcesData[bonusEvent.resourceType]?.icon}
                    </span>
                    <span className="bonus-resource-name">
                      {resourcesData[bonusEvent.resourceType]?.name}
                    </span>
                  </div>
                  <div className="bonus-details">
                    <div className="bonus-multiplier">x2 POINTS</div>
                    <div className="bonus-timer">
                      {Math.floor(bonusEvent.timeRemaining / 60)}:{String(bonusEvent.timeRemaining % 60).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="event-empty">No Special Requests</div>
            )}
          </div>
        </div>
        <Board
          player={player}
          map={mapData}
          rows={numRows}
          cols={numCols}
          resources={resources}
          resourcesData={resourcesData}
        />
      </div>

      <Ranking currentScore={score} gameStatus={gameStatus} />
    </div>
  );
}