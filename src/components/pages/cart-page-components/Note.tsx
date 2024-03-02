import React, { useState, useRef } from 'react';

import './Note.scss';

const Note: React.FC = () => {
  const [viewInput, setViewInput] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    setViewInput((prev) => !prev);
    if (!viewInput)
      setTimeout(() => {
        inputRef.current!.focus();
      }, 100);
  };

  const input = (
    <textarea
      placeholder='Instructions? Special requests? Add them here.'
      ref={inputRef}
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
