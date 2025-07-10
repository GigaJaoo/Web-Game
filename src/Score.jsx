import React from 'react';
import './Score.css';

export default function Score({ score }) {
  return (
    <div className="score-container">
      <div className="score-label">Score:</div>
      <div className="score-value">{score}</div>
    </div>
  );
}