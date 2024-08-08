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
          <animate
            attributeName="opacity"
            values="1;0;1"
            dur="4s"
            repeatCount="indefinite"
          />
        </textPath>
      </text>
      <text {...textStyle} y="120">
        <textPath xlinkHref="#SagaPath">
          Saga!
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="4s"
            begin="2s"
            repeatCount="indefinite"
          />
        </textPath>
      </text>
    </g>
  );
};

export default Title;
