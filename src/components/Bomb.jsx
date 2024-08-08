import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { gameHeight } from '../utils/constants';

const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${gameHeight}px);
  }
`;

const Move = styled.g`
  animation: ${moveVertically} 4s linear;
`;

const BombShape = styled.circle`
  fill: black;
  stroke: red;
  stroke-width: 3px;
`;

const Bomb = (props) => (
  <Move>
    <BombShape cx={props.position.x} cy={props.position.y} r="25" />
    <line x1={props.position.x - 15} y1={props.position.y - 15} x2={props.position.x + 15} y2={props.position.y + 15} stroke="red" strokeWidth="2" />
    <line x1={props.position.x - 15} y1={props.position.y + 15} x2={props.position.x + 15} y2={props.position.y - 15} stroke="red" strokeWidth="2" />
    <line x1={props.position.x} y1={props.position.y - 20} x2={props.position.x} y2={props.position.y + 20} stroke="red" strokeWidth="2" />
    <line x1={props.position.x - 20} y1={props.position.y} x2={props.position.x + 20} y2={props.position.y} stroke="red" strokeWidth="2" />
  </Move>
);

Bomb.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Bomb;
