import React from 'react';
import ContactInfo from './contact-page-components/ContactInfo';

import './Contact.scss';

const Contact: React.FC = () => {
  return (
    <div className='contact-page'>
      <div className='contact-image'>
        <h1>Contact Us</h1>
      </div>
      <ContactInfo />
    </div>
  );
};

export default Contact;
