import React, { useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ username: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { username, email, message } = formData;
  const isValid = username.trim() && email.trim() && message.trim();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!isValid || loading) return;

    setLoading(true);
    setError(false);

    const contact = {
      _type: 'contact',
      name: username,
      email,
      message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <>
      <span className="app__footer-tag">👋 Get in touch</span>
      <h2 className="head-text">Let&apos;s build something <span>together</span></h2>
      <p className="p-text app__footer-subtitle">
        A collaboration, a speaking invite, or you just want to talk DevRel, AI,
        or building on-chain — my inbox is always open.
      </p>

      <div className="app__footer-cards">
        <a className="app__footer-card" href="mailto:mdmudassir0143@gmail.com">
          <img src={images.email} alt="email" />
          <span className="p-text">mdmudassir0143@gmail.com</span>
        </a>
        <a className="app__footer-card" href="tel:+917073041787">
          <img src={images.mobile} alt="phone" />
          <span className="p-text">+91 70730 41787</span>
        </a>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit} disabled={!isValid || loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {error && (
            <p className="p-text app__footer-error">
              Couldn&apos;t send right now — email me directly at{' '}
              <a href="mailto:mdmudassir0143@gmail.com">mdmudassir0143@gmail.com</a>.
            </p>
          )}
        </div>
      ) : (
        <div className="app__footer-success">
          <h3 className="head-text">Thank you for reaching out! 🙌</h3>
          <p className="p-text">I&apos;ll get back to you as soon as I can.</p>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
