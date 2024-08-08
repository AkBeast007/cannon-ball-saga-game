import React from 'react';
import PropTypes from 'prop-types';

const Instructions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        <h2>Game Rules</h2>
        <p>1. Use the cannon to shoot the flying objects.</p>
        <p>2. Each successful hit increases your score.</p>
        <p>3. Avoid bombs and try to collect bonus lives.</p>
        <p>4. The game ends when you lose all your lives.</p>
      </div>
    </div>
  );
};

Instructions.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  box: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '80%',
    maxHeight: '80%',
    overflow: 'auto',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '20px',
    cursor: 'pointer',
  },
};

export default Instructions;
