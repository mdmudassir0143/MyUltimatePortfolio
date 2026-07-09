import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import './Navbar.scss';

const navItems = [
  { label: 'Home', href: '#home' },
  {
    label: 'About',
    href: '#about',
    children: [
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Experience', href: '#experience' },
    ],
  },
  {
    label: 'Work',
    href: '#work',
    children: [
      { label: 'Projects', href: '#work' },
      { label: 'Research', href: '#research' },
    ],
  },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
];

const mobileLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#work' },
  { label: 'Research', href: '#research' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {navItems.map((item) => (
          <li className="app__flex p-text" key={`link-${item.label}`}>
            <div />
            {item.children ? (
              <>
                <a href={item.href} className="app__navbar-trigger">
                  {item.label}
                  <FiChevronDown />
                </a>
                <ul className="app__navbar-submenu">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <a href={child.href}>{child.label}</a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
          </li>
        ))}
      </ul>

      <div className="blogs">
        <a href="https://mdtechblogs.info/" target="_blank" rel="noreferrer">Blogs</a>
      </div>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {mobileLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={() => setToggle(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
