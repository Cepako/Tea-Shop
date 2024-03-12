import React from 'react';

import './ContactInfo.scss';

const ContactInfo: React.FC = () => {
  return (
    <div className='contact-info'>
      <h2 className='contact-info__title'>You're Welcome to Visit</h2>
      <div className='contact-info__wrapper'>
        <div className='question'>
          <h3>Have a Question? We're Here to Help</h3>
          <p>
            Email us at <span>info@my-domain.com</span> or send us a message via
            the contact form below and we'll get back to you
          </p>
          <form>
            <input type='text' placeholder='Name' />
            <input type='email' placeholder='Email' />
            <textarea placeholder='Type your message here...'></textarea>
            <button>Submit</button>
          </form>
          <p>Thanks for submitting!</p>
        </div>
        <div className='stores-info'>
          <h3>Our Stores</h3>
          <p className='store-location'>
            500 Terry Francine Street San Francisco, CA 94158 Tel: 123-456-7890
          </p>
          <p className='store-location'>
            500 Terry Francine Street San Francisco, CA 94158 Tel: 123-456-7890
          </p>
          <h3>Opening Hours</h3>
          <p className='opening-hours'>Mon - Fri: 8am - 8pm</p>
          <p className='opening-hours'>Saturday: 9am - 9pm</p>
          <p className='opening-hours'>Sunday: 9am - 10pm</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
