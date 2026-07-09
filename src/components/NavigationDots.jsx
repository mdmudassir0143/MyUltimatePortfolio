/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */

import React from 'react';

const sections = ['home', 'about', 'skills', 'experience', 'work', 'research', 'community', 'testimonial', 'contact'];

const NavigationDots = ({ active }) => (
  <div className="app__navigation">
    {sections.map((item, index) => (
      <a
        href={`#${item}`}
        key={item + index}
        className="app__navigation-dot"
        style={active === item ? { backgroundColor: '#313BAC' } : {}}
      />
    ))}
  </div>
);

export default NavigationDots;
