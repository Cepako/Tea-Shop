import React, {
  useRef,
  useState,
  useEffect,
  MouseEvent,
  FocusEventHandler,
} from 'react';

import './ContactInfo.scss';

const ContactInfo: React.FC = () => {
  const [showParagraph, setShowParagraph] = useState(false);

  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const textareaInput = useRef<HTMLTextAreaElement>(null);

  const handleFromSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowParagraph(true);
    nameInput.current!.value = '';
    emailInput.current!.value = '';
    textareaInput.current!.value = '';
  };

  useEffect(() => {
    setTimeout(() => {
      setShowParagraph(false);
    }, 3000);
  }, [showParagraph]);

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === '') e.target.style.border = '2px solid red';
  };

  return (
    <div className='contact-info'>
      <h2 className='contact-info__title'>
        <span></span>You're Welcome to Visit<span></span>
      </h2>
      <div className='contact-info__wrapper'>
        <div className='question'>
          <h3>Have a Question? We're Here to Help</h3>
          <p>
            Email us at <span>info@my-domain.com</span> or send us a message via
            the contact form below and we'll get back to you
          </p>
          <form onSubmit={handleFromSubmit}>
            <input
              ref={nameInput}
              required
              onBlur={handleInputBlur}
              onChange={() =>
                (nameInput.current!.style.border = '1px solid black')
              }
              type='text'
              placeholder='Name'
            />
            <input
              ref={emailInput}
              required
              onBlur={handleInputBlur}
              onChange={() =>
                (emailInput.current!.style.border = '1px solid black')
              }
              type='email'
              placeholder='Email'
            />
            <textarea
              ref={textareaInput}
              placeholder='Type your message here...'
            ></textarea>
            <button type='submit'>Submit</button>
          </form>
          {showParagraph && <p>Thanks for submitting!</p>}
        </div>
        <div className='stores-info'>
          <h3>Our Stores</h3>
          <p className='store-location'>
            500 Terry Francine Street San Francisco, CA 94158 <br />
            Tel: 123-456-7890
          </p>
          <p className='store-location'>
            500 Terry Francine Street San Francisco, CA 94158
            <br /> Tel: 123-456-7890
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
