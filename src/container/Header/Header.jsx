import React from 'react';
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import './Header.scss';

const focusAreas = ['Developer Experience', 'AI', 'Blockchain Infra', 'Startups'];

const Header = () => (
  <div className="app__header app__flex">
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="app__header-info"
    >
      <div className="app__header-greeting">
        <span className="app__header-wave" role="img" aria-label="waving hand">👋</span>
        <p className="p-text">Hi, I&apos;m</p>
      </div>

      <h1 className="app__header-name">Mohammad Mudassir</h1>

      <h2 className="app__header-role">
        Engagement Support Engineer <span>@ Algorand Foundation</span>
      </h2>

      <p className="app__header-tagline p-text">
        Working at the intersection of Developer Experience, AI, Blockchain
        Infrastructure &amp; Startup Ecosystems.
      </p>

      <div className="app__header-pills">
        {focusAreas.map((area) => (
          <div className="app__header-pill" key={area}>{area}</div>
        ))}
      </div>

      <div className="app__header-cta">
        <a href="#work" className="app__header-btn app__header-btn--primary">View Work</a>
        <a href="#contact" className="app__header-btn app__header-btn--ghost">Let&apos;s talk</a>
      </div>
    </motion.div>
  </div>
);

export default AppWrap(Header, 'home');
