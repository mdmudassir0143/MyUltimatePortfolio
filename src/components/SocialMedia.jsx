import React from 'react';
import { BsTwitter, BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://www.linkedin.com/in/mohammad-mudassir-b788a41ab/" target="_blank" rel="noopener noreferrer">
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href="https://github.com/mdmudassir0143" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </a>
    </div>
    <div>
      <a href="https://twitter.com/mdmudassir0143" target="_blank" rel="noopener noreferrer">
        <BsTwitter />
      </a>
    </div>
  </div>
);

export default SocialMedia;
