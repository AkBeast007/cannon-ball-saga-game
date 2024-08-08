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

const Canvas = (props) => {
  const [isInstructionsOpen, setInstructionsOpen] = useState(false);

  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

  const lives = [];
  for (let i = 0; i < props.gameState.lives; i++) {
    const heartPosition = {
      x: -480 - (i * 70),
      y: 35
    };
    lives.push(<Heart key={i} position={heartPosition} />);
  }

  const handleDestroy = (id) => {
    props.onDestroyObject(id);
  };

  return (
    <svg
      id="aliens-go-home-canvas"
      preserveAspectRatio="xMaxYMax none"
      onMouseMove={props.trackMouse}
      viewBox={viewBox}
      onClick={props.shoot}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Ground />

      {props.gameState.cannonBalls.map(cannonBall => (
        <CannonBall
          key={cannonBall.id}
          position={cannonBall.position}
        />
      ))}

      <CannonPipe rotation={props.angle} />
      <CannonBase />
      <CurrentScore score={props.gameState.kills} />

      {!props.gameState.started &&
        <g>
          <StartGame onClick={() => props.startGame()} />
          <Title />
        </g>
      }

      {props.gameState.flyingObjects.map(flyingObject => {
        if (flyingObject.type === 'FlyingObject') {
          return <FlyingObject key={flyingObject.id} position={flyingObject.position} />;
        } else if (flyingObject.type === 'BonusLife') {
          return <BonusLife key={flyingObject.id} position={flyingObject.position} />;
        } else if (flyingObject.type === 'Bomb') {
          return <Bomb key={flyingObject.id} position={flyingObject.position} id={flyingObject.id} onDestroy={handleDestroy} />;
        }
        return null;
      })}

      {lives}

      <button
        onClick={() => setInstructionsOpen(true)}
        style={styles.instructionsButton}
      >
        Instructions
      </button>

      <Instructions isOpen={isInstructionsOpen} onClose={() => setInstructionsOpen(false)} />
    </svg>
  );
};

const styles = {
  instructionsButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
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
