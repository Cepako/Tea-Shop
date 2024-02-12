import React from 'react';
import { motion } from 'framer-motion';

import './Quote.scss';

import QuoteModel from './QuoteModel';

const Quote: React.FC<QuoteModel> = ({ text, author }) => {
  return (
    <motion.div
      className="quote"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2.5, delay: 1 }}
      viewport={{ once: true }}
    >
      <p className="quote__text">{text}</p>
      <p className="quote__author">{author}</p>
    </motion.div>
  );
};

export default Quote;
