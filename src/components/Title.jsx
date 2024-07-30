import React from 'react';
import { pathFromBezierCurve } from '../utils/formulas';

const Title = () => {
  const textStyle = {
    fontFamily: '"Joti One", cursive',
    fontSize: 100,
    fill: '#cbca62',
  };

  const cannonBallLineCurve = {
    initialAxis: {
      x: -300,
      y: -750,
    },
    initialControlPoint: {
      x: 150,
      y: -50,
    },
    endingControlPoint: {
      x: 450,
      y: -50,
    },
    endingAxis: {
      x: 600,
      y: 0,
    },
  };

  const sagaLineCurve = {
    initialAxis: {
      x: -130,
      y: -650,
    },
    initialControlPoint: {
      x: 75,
      y: -30,
    },
    endingControlPoint: {
      x: 225,
      y: -30,
    },
    endingAxis: {
      x: 300,
      y: 0,
    },
  };

  return (
    <g filter="url(#shadow)">
      <defs>
        <path
          id="CannonBallPath"
          d={pathFromBezierCurve(cannonBallLineCurve)}
        />
        <path
          id="SagaPath"
          d={pathFromBezierCurve(sagaLineCurve)}
        />
      </defs>
      <text {...textStyle}>
        <textPath xlinkHref="#CannonBallPath">
          Cannon Ball
        </textPath>
      </text>
      <text {...textStyle}>
        <textPath xlinkHref="#SagaPath">
          Saga!
        </textPath>
      </text>
    </g>
  );
};

export default Title;
