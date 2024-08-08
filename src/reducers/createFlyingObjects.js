import {
  createInterval, flyingObjectsStarterYAxis, maxFlyingObjects,
  flyingObjectsStarterPositions
} from '../utils/constants';

export default (state) => {
  if (!state.gameState.started) return state; // game not running

  const now = (new Date()).getTime();
  const { lastObjectCreatedAt, flyingObjects } = state.gameState;
  const createNewObject = (
    now - lastObjectCreatedAt > createInterval &&
    flyingObjects.length < maxFlyingObjects
  );

  if (!createNewObject) return state; // no need to create objects now

  const id = now;
  const predefinedPosition = Math.floor(Math.random() * maxFlyingObjects);
  const flyingObjectPosition = flyingObjectsStarterPositions[predefinedPosition];

  const randomType = Math.random();
  const newFlyingObject = {
    position: {
      x: flyingObjectPosition,
      y: flyingObjectsStarterYAxis,
    },
    createdAt: now,
    id,
    type: randomType < 0.15 ? 'BonusLife' : randomType < 0.25 ? 'Bomb' : 'FlyingObject', // 25% chance BonusLife, 15% Bomb, 60% FlyingObject
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      flyingObjects: [
        ...state.gameState.flyingObjects,
        newFlyingObject
      ],
      lastObjectCreatedAt: now,
    }
  }
}
