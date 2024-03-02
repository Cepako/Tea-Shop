import React, { useState } from 'react';

import './Note.scss';

const Note: React.FC = () => {
  const [viewInput, setViewInput] = useState(false);
  const input = (
    <textarea placeholder='Instructions? Special requests? Add them here.' />
  );

  return (
    <div className='note'>
      <p onClick={() => setViewInput((prev) => !prev)}>
        <img src='./images/notes-icon.svg' alt='notes' />
        Add a note
      </p>
      {viewInput && input}
    </div>
  );
};

export default Note;
