import { calculateAngle } from '../utils/formulas';
import createFlyingObjects from './createFlyingObjects';
import moveBalls from './moveCannonBalls';
import checkCollisions from './checkCollisions';

function moveObjects(state, action) {
  if (!state.gameState.started) return state;

  let cannonBalls = moveBalls(state.gameState.cannonBalls);

  const mousePosition = action.mousePosition || {
    x: 0,
    y: 0,
  };

  const newState = createFlyingObjects(state);

  const now = (new Date()).getTime();
  let flyingObjects = newState.gameState.flyingObjects.filter(object => (
    (now - object.createdAt) < 4000
  ));

  const regularFlyingObjects = flyingObjects.filter(object => object.type !== 'BonusLife' && object.type !== 'Bomb');
  const lostLife = state.gameState.flyingObjects.filter(object => object.type !== 'BonusLife' && object.type !== 'Bomb').length > regularFlyingObjects.length;
  
  let lives = state.gameState.lives;
  if (lostLife) {
    lives--;
  }

  const started = lives > 0;
  if (!started) {
    flyingObjects = [];
    cannonBalls = [];
    lives = 3;
  }

  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);

  const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects);
  const cannonBallsDestroyed = objectsDestroyed.map(object => object.cannonBallId);
  const flyingDiscsDestroyed = objectsDestroyed.filter(object => object.type !== 'BonusLife' && object.type !== 'Bomb').map(object => object.flyingDiscId);
  const bonusLivesDestroyed = objectsDestroyed.filter(object => object.type === 'BonusLife').map(object => object.flyingDiscId);
  const bombsDestroyed = objectsDestroyed.filter(object => object.type === 'Bomb').map(object => object.flyingDiscId);

  cannonBalls = cannonBalls.filter(cannonBall => cannonBallsDestroyed.indexOf(cannonBall.id) === -1);
  flyingObjects = flyingObjects.filter(flyingDisc => (
    flyingDiscsDestroyed.indexOf(flyingDisc.id) === -1 &&
    bonusLivesDestroyed.indexOf(flyingDisc.id) === -1 &&
    bombsDestroyed.indexOf(flyingDisc.id) === -1
  ));

  const kills = state.gameState.kills + flyingDiscsDestroyed.length - bombsDestroyed.length * 2; // Decrease score by 2 for each bomb hit
  lives += bonusLivesDestroyed.length - bombsDestroyed.length; // Increase lives for bonus life and decrease for bombs

  return {
    ...newState,
    gameState: {
      ...newState.gameState,
      flyingObjects,
      cannonBalls: [...cannonBalls],
      lives,
      started,
      kills,
    },
    angle,
  };
}

export default moveObjects;
