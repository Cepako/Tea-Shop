import React, { useState, useRef, ChangeEvent } from 'react';

import './Note.scss';

const Note: React.FC = () => {
  const [viewInput, setViewInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    if (!inputValue) {
      setViewInput((prev) => !prev);
      if (!viewInput)
        setTimeout(() => {
          inputRef.current!.focus();
        }, 100);
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const input = (
    <textarea
      placeholder='Instructions? Special requests? Add them here.'
      ref={inputRef}
      onChange={handleInputChange}
      value={inputValue}
    />
  );

  return (
    <div className='note'>
      <p onClick={handleClick}>
        <img src='./images/notes-icon.svg' alt='notes' />
        Add a note
      </p>
      {viewInput && input}
    </div>
  );
};

export default Note;
