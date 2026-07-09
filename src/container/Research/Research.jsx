import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Research.scss';

const Research = () => {
  const [research, setResearch] = useState([]);

  useEffect(() => {
    const query = '*[_type == "research"] | order(date desc)';

    client.fetch(query).then((data) => {
      setResearch(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Research & <span>Deep Dives</span></h2>
      <p className="p-text app__research-subtitle">
        Technical explorations across blockchain, AI, and developer experience.
      </p>

      <div className="app__research-grid">
        {research.map((item, index) => (
          <motion.a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            whileInView={{ opacity: [0, 1], y: [40, 0] }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="app__research-card"
            key={item._id || item.title}
          >
            {item.coverImage && (
              <div className="app__research-img">
                <img src={urlFor(item.coverImage)} alt={item.title} />
              </div>
            )}
            <div className="app__research-content">
              {item.date && (
                <span className="app__research-date">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              )}
              <h3 className="bold-text">{item.title}</h3>
              <p className="p-text">{item.summary}</p>

              {item.tags && item.tags.length > 0 && (
                <div className="app__research-tags">
                  {item.tags.map((tag) => (
                    <span className="app__research-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              )}

              <span className="app__research-link">
                Read more <AiOutlineArrowRight />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Research, 'app__research'),
  'research',
  'app__whitebg',
);
