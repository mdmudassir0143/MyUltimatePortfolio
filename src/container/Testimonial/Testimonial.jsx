import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Testimonial.scss';

// How many cards fit on screen at once — matches the grid breakpoints in the scss.
const getVisibleCount = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
};

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxStart = Math.max(0, testimonials.length - visibleCount);
  const safeStart = Math.min(startIndex, maxStart);
  const showArrows = testimonials.length > visibleCount;

  const handlePrev = () => {
    setStartIndex((prev) => {
      const s = Math.min(prev, maxStart);
      return s <= 0 ? maxStart : s - 1;
    });
  };

  const handleNext = () => {
    setStartIndex((prev) => {
      const s = Math.min(prev, maxStart);
      return s >= maxStart ? 0 : s + 1;
    });
  };

  const visible = testimonials.slice(safeStart, safeStart + visibleCount);

  return (
    <>
      <div className="app__testimonial-grid">
        {visible.map((testimonial, index) => (
          <motion.div
            key={testimonial._id || `${testimonial.name}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="app__testimonial-card"
          >
            <p className="p-text app__testimonial-feedback">{testimonial.feedback}</p>

            <div className="app__testimonial-person">
              <img src={urlFor(testimonial.imgurl)} alt={testimonial.name} />
              <div>
                <h4 className="bold-text">{testimonial.name}</h4>
                <h5 className="p-text">{testimonial.company}</h5>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showArrows && (
        <div className="app__testimonial-btns app__flex">
          <div className="app__flex" onClick={handlePrev}>
            <HiChevronLeft />
          </div>

          <div className="app__flex" onClick={handleNext}>
            <HiChevronRight />
          </div>
        </div>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__primarybg',
);
