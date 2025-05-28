import React from 'react';

function ValidationMessage({ isValid }) {
  return (
    <p style={{ color: isValid ? 'green' : 'red' }}>
      {isValid
        ? 'Password is valid!'
        : 'Password must be 8+ characters and include a number.'}
    </p>
  );
}

export default ValidationMessage;
