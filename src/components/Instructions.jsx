// Instructions.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Instructions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        <h2 style={styles.title}>Instructions</h2>
        <p style={styles.text}>
          1. Use the mouse to aim and left click to shoot the cannons.
          <br />
          2. Shooting the flying disc will give you 1 point.
          <br />
          3. Missing the flying disc will deduct 1 point.
          <br />
          4. Shoot Bonus Life to gain 1 extra life.
          <br />
          5. Shooting the bombs will deduct the points by 2 and life by 1.
          <br />
          6. By default you will have 3 lives.
          <br />
        </p>
        <h3>HAVE FUN !!</h3>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff5c5c',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '5px 10px',
  },
  title: {
    margin: '0 0 10px',
    fontSize: '24px',
    padding: '5px',
    textDecoration: 'underline',
    borderRadius: '5px',
  },
  text: {
    fontSize: '18px',
    lineHeight: '1.5',
    border: '2px solid #007bff',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
    margin: '0',
  },
};

Instructions.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Instructions;
