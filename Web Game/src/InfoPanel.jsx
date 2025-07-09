import React, { useState } from 'react';
import './InfoPanel.css';

export default function InfoPanel() {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'About Game', icon: '📖' },
    { id: 'elements', label: 'Elements', icon: '🎮' },
    { id: 'controls', label: 'Controls', icon: '⌨️' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="tab-content">
            <h4>🌍 Humanitarian Manager</h4>
            <p>
              Take the role of a humanitarian manager in an emergency situation! 
              Your goal is to collect donations and deliver them to the causes scattered around the map.
            </p>
            
            <h5>🎯 Objective</h5>
            <ul>
              <li>Collect resources scattered across the map</li>
              <li>Deliver them to humanitarian causes or the center of operations</li>
              <li>Get the maximum points in 3 minutes</li>
              <li>Navigate through natural obstacles</li>
            </ul>

            <h5>⚡ Dynamics</h5>
            <p>
              As time passes, resources appear more quickly, 
              increasing the intensity and challenge of the game!
            </p>
            
            <p>
              During certain periods, 
              special requests for specific resources may appear. Delivering the requested resource 
              type during these periods grants <strong>double points</strong>!
            </p>
          </div>
        );

      case 'elements':
        return (
          <div className="tab-content">
            <h4>🎮 Game Elements</h4>
            
            <div className="element-item">
              <span className="element-icon">👨‍⚕️</span>
              <div className="element-info">
                <strong>Player</strong>
                <p>Your avatar - a dedicated humanitarian worker</p>
              </div>
            </div>

            <div className="element-item">
              <span className="element-icon">🏛️</span>
              <div className="element-info">
                <strong>Center of Operations</strong>
                <p>Headquarters - centralized delivery, but only grants <strong>1 point</strong></p>
              </div>
            </div>

            <div className="element-item">
              <span className="element-icon">🏥</span>
              <div className="element-info">
                <strong>Causes</strong>
                <p>More irregular locations, but delivery grants <strong>2 points</strong></p>
              </div>
            </div>

            <div className="element-item">
              <span className="element-icon">🍞💊👕</span>
              <div className="element-info">
                <strong>Resources</strong>
                <p>Food, medicine, clothing - collected automatically</p>
              </div>
            </div>

            <div className="element-item special-request-item">
              <span className="element-icon">⚡</span>
              <div className="element-info">
                <strong>Special Requests</strong>
                <p>Delivering the requested resource grants <strong>double points</strong></p>
              </div>
            </div>

            <h5>🗺️ Terrain</h5>
            <div className="terrain-grid">
              <div className="terrain-item">
                <div className="terrain-sample terrain-ground"></div>
                <span>Ground - Walkable</span>
              </div>
            </div>
            
            <p><strong>Obstacles:</strong></p>
            <div className="terrain-grid">
              <div className="terrain-item">
                <div className="terrain-sample terrain-forest"></div>
                <span>Forest</span>
              </div>
              <div className="terrain-item">
                <div className="terrain-sample terrain-mountain"></div>
                <span>Mountain</span>
              </div>
              <div className="terrain-item">
                <div className="terrain-sample terrain-water"></div>
                <span>Water</span>
              </div>
            </div>
          </div>
        );

      case 'controls':
        return (
          <div className="tab-content">
            <h4>⌨️ Controls</h4>
            
            <div className="controls-section">
              <h5>🎮 Movement</h5>
              <div className="control-item">
                <div className="key-group">
                  <span className="key">W</span>
                  <span className="key">S</span>
                  <span className="key">A</span>
                  <span className="key">D</span>
                </div>
              </div>
              
              <div className="control-item">
                <div className="key-group">
                  <span className="key">↑</span>
                  <span className="key">↓</span>
                  <span className="key">←</span>
                  <span className="key">→</span>
                </div>
              </div>
            </div>

            <div className="controls-section">
              <h5>📦 Actions</h5>
              <div className="control-item">
                <div className="key-group">
                  <span className="key space">Space</span>
                </div>
                <span>Deliver resource (when on top of a cause/center)</span>
              </div>
            </div>

            <div className="controls-section">
              <h5>🎛️ Game</h5>
              <div className="control-item">
                <div className="key-group">
                  <span className="btn-key">Start</span>
                </div>
                <span>Start game</span>
              </div>
              
              <div className="control-item">
                <div className="key-group">
                  <span className="btn-key">Pause</span>
                </div>
                <span>Pause game</span>
              </div>

              <div className="control-item">
                <div className="key-group">
                  <span className="btn-key">Resume</span>
                </div>
                <span>Resume game</span>
              </div>

              <div className="control-item">
                <div className="key-group">
                  <span className="btn-key">Restart</span>
                </div>
                <span>Restart game</span>
              </div>
            </div>

            <div className="tips-section">
              <h5>💡 Tips</h5>
              <ul>
                <li>Resources are collected automatically when you walk on them</li>
                <li>You can only carry one resource at a time</li>
                <li>Causes give more points but are farther away</li>
                <li>Time is precious - plan your routes!</li>
                <li>Watch out for Special Requests - they can double your points!</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="info-panel">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className="tab-content-container">
        {renderContent()}
      </div>
    </div>
  );
}