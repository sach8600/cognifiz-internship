import React, { useState } from 'react';
import ValidationMessage from './ValidationMessage';

function Form() {
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const validatePassword = (value) => {
    // Example: Password must be 8+ characters and contain a number
    const regex = /^(?=.*\d).{8,}$/;
    setIsPasswordValid(regex.test(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <div>
      <form>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <ValidationMessage isValid={isPasswordValid} />
        <button type="submit" disabled={!isPasswordValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
