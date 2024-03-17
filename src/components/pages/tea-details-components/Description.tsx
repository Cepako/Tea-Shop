import React, { useState } from 'react';

const Description: React.FC<{ product_description: string }> = ({
  product_description,
}) => {
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  let description = '';

  for (let i = 0; i < product_description.length / 2 + 1; i++)
    description += product_description[i];
  return (
    <>
      <p className='short-description'>
        {descriptionVisible ? product_description : description}
      </p>
      <span onClick={() => setDescriptionVisible(!descriptionVisible)}>
        {descriptionVisible ? 'Less' : 'Read more'}
      </span>
    </>
  );
};

export default Description;
