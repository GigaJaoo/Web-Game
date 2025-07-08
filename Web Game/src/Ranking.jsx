import React, { useState } from 'react';
import './Ranking.css';

export default function Ranking({ currentScore, gameStatus }) {
  const [playerName, setPlayerName] = useState('');
  
  //Exemplos
  const mockRankings = [
    { rank: 1, name: 'Ana Silva', score: 142 },
    { rank: 2, name: 'João Santos', score: 128 },
    { rank: 3, name: 'Maria Costa', score: 115 },
    { rank: 4, name: 'Pedro Lima', score: 98 },
    { rank: 5, name: 'Sofia Reis', score: 87 },
    { rank: 6, name: 'Miguel Fonseca', score: 76 },
    { rank: 7, name: 'Carla Mendes', score: 65 },
    { rank: 8, name: 'Rui Oliveira', score: 54 },
    { rank: 9, name: 'Inês Rodrigues', score: 43 },
    { rank: 10, name: 'Tiago Ferreira', score: 32 }
  ];

  const handleSubmitScore = () => {
    if (playerName.trim() && currentScore > 0) {
      console.log('Submit score:', { name: playerName, score: currentScore });
      alert(`Score submitted!\n${playerName}: ${currentScore} points`);
      setPlayerName('');
    }
  };

  return (
    <div className="ranking-panel">
      <div className="current-score-section">
        <h3>Current Game</h3>
        <div className="current-score">
          <div className="score-display">
            <span className="score-label">Score:</span>
            <span className="score-number">{currentScore}</span>
          </div>
          
          {gameStatus === 'ended' && (
            <div className="score-submission">
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                className="name-input"
              />
              <button 
                onClick={handleSubmitScore}
                disabled={!playerName.trim() || currentScore === 0}
                className="submit-btn"
              >
                Submit Score
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="rankings-section">
        <h3>🏆 Global Ranking</h3>
        <div className="rankings-table">
          <div className="table-header">
            <span className="rank-col">Rank</span>
            <span className="name-col">Name</span>
            <span className="score-col">Score</span>
          </div>
          
          <div className="table-body">
            {mockRankings.map((entry) => (
              <div key={entry.rank} className="table-row">
                <span className="rank-col">
                  {entry.rank <= 3 ? (
                    <span className={`medal rank-${entry.rank}`}>
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                    </span>
                  ) : (
                    entry.rank
                  )}
                </span>
                <span className="name-col">{entry.name}</span>
                <span className="score-col">{entry.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}