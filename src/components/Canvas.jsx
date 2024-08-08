import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import BonusLife from './BonusLife';
import StartGame from './StartGame';
import Title from './Title';
import CannonBall from './CannonBall';
import Heart from './Heart';
import Bomb from './Bomb';
import Instructions from './Instructions'; // Import Instructions component

const Canvas = ({
  angle,
  gameState,
  trackMouse,
  startGame,
  shoot,
  onDestroyObject,
}) => {
  const [isInstructionsOpen, setInstructionsOpen] = useState(false);

  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

  const lives = Array.from({ length: gameState.lives }, (_, i) => (
    <Heart key={i} position={{ x: -480 - (i * 70), y: 35 }} />
  ));

  const handleDestroy = (id) => {
    onDestroyObject(id);
  };

  return (
    <div style={styles.container}>
      <svg
        id="aliens-go-home-canvas"
        preserveAspectRatio="xMaxYMax none"
        onMouseMove={trackMouse}
        viewBox={viewBox}
        onClick={shoot}
      >
        <defs>
          <filter id="shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="2" />
          </filter>
        </defs>
        <Sky />
        <Ground />

        {gameState.cannonBalls.map(cannonBall => (
          <CannonBall key={cannonBall.id} position={cannonBall.position} />
        ))}

        <CannonPipe rotation={angle} />
        <CannonBase />
        <CurrentScore score={gameState.kills} />

        {!gameState.started && (
          <g>
            <StartGame onClick={startGame} />
            <Title />
          </g>
        )}

        {gameState.flyingObjects.map(flyingObject => {
          switch (flyingObject.type) {
            case 'FlyingObject':
              return <FlyingObject key={flyingObject.id} position={flyingObject.position} />;
            case 'BonusLife':
              return <BonusLife key={flyingObject.id} position={flyingObject.position} />;
            case 'Bomb':
              return (
                <Bomb
                  key={flyingObject.id}
                  position={flyingObject.position}
                  id={flyingObject.id}
                  onDestroy={handleDestroy}
                />
              );
            default:
              return null;
          }
        })}

        {lives}
      </svg>

      {!isInstructionsOpen && (
        <button
          onClick={() => setInstructionsOpen(true)}
          style={styles.instructionsButton}
        >
          Instructions !
        </button>
      )}

      <Instructions isOpen={isInstructionsOpen} onClose={() => setInstructionsOpen(false)} />
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
  },
  instructionsButton: {
    position: 'absolute',
    top: '20px',
    right: '30px',
    padding: '10px 20px',
    fontSize: '25px',
    fontFamily: '"Joti One", cursive',
    cursor: 'pointer',
    backgroundColor: '#30abef',
    color: '#d6d33e',
    textShadow: '0.5px 0.5px 0 #000, -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000',
    border: 'none',
    borderRadius: '5px',
    zIndex: 1000,
  },
};

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    flyingObjects: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
      type: PropTypes.string.isRequired,
    })).isRequired,
    cannonBalls: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
    })).isRequired,
  }).isRequired,
  trackMouse: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired,
  onDestroyObject: PropTypes.func.isRequired,
};

export default Canvas;
