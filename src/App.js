import React from 'react';

import {
  About,
  Community,
  Experience,
  Footer,
  Header,
  Research,
  Skills,
  Testimonial,
  Work,
} from './container';
import { Navbar, SiteFooter, SocialMedia } from './components';
import './App.scss';

const App = () => (
  <div className="app">
    <Navbar />
    <SocialMedia />
    <Header />
    <About />
    <Skills />
    <Experience />
    <Work />
    <Research />
    <Community />
    <Testimonial />
    <Footer />

    <SiteFooter />
  </div>
);

export default App;
