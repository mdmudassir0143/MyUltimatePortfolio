import React from 'react';
import { BsTwitter, BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <BsLinkedin />
    </div>
    <div>
      <FaGithub />
    </div>
    <div>
      <BsTwitter />
    </div>
  </div>
);

export default SocialMedia;
