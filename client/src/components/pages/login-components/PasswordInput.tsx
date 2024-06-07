import React, { useState, ChangeEvent } from 'react';
import eye from '../../../assets/view-icon.svg';
import eyeOff from '../../../assets/eye-password-hide.svg';

type HandleFormChange = (e: ChangeEvent<HTMLInputElement>) => void;

interface InputProps {
  passValue: string;
  handleFormChange: HandleFormChange;
  placeholder: string;
  name: string;
}

const PasswordInput: React.FC<InputProps> = ({
  passValue,
  handleFormChange,
  placeholder,
  name,
}) => {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eye);

  const handleToggleIcon = () => {
    if (type === 'password') {
      setType('text');
      setIcon(eyeOff);
    } else {
      setType('password');
      setIcon(eye);
    }
  };

  return (
    <div className='password'>
      <input
        type={type}
        value={passValue}
        onChange={(e) => handleFormChange(e)}
        onBlur={(e) => handleFormChange(e)}
        name={name}
        placeholder={placeholder}
        required
      />
      <span className='icon'>
        <img
          src={icon}
          onClick={handleToggleIcon}
          alt={type === 'password' ? 'eye' : 'eye off'}
        />
      </span>
    </div>
  );
};

export default PasswordInput;
