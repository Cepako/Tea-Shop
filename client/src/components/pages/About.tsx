import React from 'react';

import './About.scss';

const About: React.FC = () => {
  return (
    <div className='about-page'>
      <div className='header-image'>
        <h1>Our Story</h1>
      </div>
      <h2>
        <span></span>120 Years of Brewing Fine Tea<span></span>
      </h2>
      <div className='about-page__text'>
        <p>
          Welcome to the "About Us" page of Blooms Tea, where we aim to
          introduce you to our history, values, and passion for tea. Our brand
          was born out of a love for unique aromas and flavors of tea, which we
          strive to share with you every day.
        </p>
        <p>
          Our mission is to provide the highest quality teas sourced from the
          most renowned plantations around the world. We ensure that every cup
          of our tea is not only a delicious beverage but also a unique
          experience for your senses.
        </p>
        <p>
          At Blooms Tea, we prioritize transparency and honesty in our
          relationships with customers and partners. Our products are carefully
          selected, and the production process is carried out with full respect
          for the environment and the people working on the plantations.
        </p>
        <p>
          We take pride in our passion for tea and aim to inspire everyone who
          visits our website. We invite you to discover the diversity of our
          teas, delve into the secrets of brewing, and experience extraordinary
          moments of relaxation and reflection with a cup of aromatic Blooms
          Tea.
        </p>
      </div>
    </div>
  );
};

export default About;
