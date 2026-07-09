import React from 'react';
// import { BsTwitter, BsLinkedin } from 'react-icons/bs';
// import { FaGithub } from 'react-icons/fa';

import './SiteFooter.scss';

// const links = [
//   { label: 'Home', href: '#home' },
//   { label: 'About', href: '#about' },
//   { label: 'Projects', href: '#work' },
//   { label: 'Community', href: '#community' },
//   { label: 'Contact', href: '#contact' },
// ];

// const socials = [
//   { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammad-mudassir-b788a41ab/', Icon: BsLinkedin },
//   { label: 'GitHub', href: 'https://github.com/mdmudassir0143', Icon: FaGithub },
//   { label: 'Twitter', href: 'https://twitter.com/mdmudassir0143', Icon: BsTwitter },
// ];

const SiteFooter = () => (
  <footer className="app__sitefooter">
    <div className="app__sitefooter-bottom">
      <p>© {new Date().getFullYear()} Mohammad Mudassir. All rights reserved.</p>
      <a href="#home" className="app__sitefooter-top">Back to top ↑</a>
    </div>
  </footer>
);

export default SiteFooter;
