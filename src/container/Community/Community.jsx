import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineLink } from 'react-icons/ai';

import { AppWrap, MotionWrap } from '../../wrapper';
import { FilterableCards, StatCounter } from '../../components';
import { urlFor, client } from '../../client';
import './Community.scss';

const filterToType = {
  Talks: 'talk',
  Events: 'event',
  Hackathons: 'hackathon',
};

const formatMonthYear = (date) => new Date(date).toLocaleDateString('en-US', {
  month: 'short',
  year: 'numeric',
});

const Community = () => {
  const [stats, setStats] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    client.fetch('*[_type == "stats"] | order(order asc)').then((data) => setStats(data));
    client.fetch('*[_type == "events"] | order(date desc)').then((data) => setEvents(data));
  }, []);

  const renderEventCard = (event, index) => (
    <motion.div
      whileInView={{ opacity: [0, 1], y: [30, 0] }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="app__community-card"
      key={event._id || `${event.title}-${index}`}
    >
      {event.coverImage && (
        <div className="app__community-img">
          <img src={urlFor(event.coverImage)} alt={event.title} />
          {event.type && <span className="app__community-badge">{event.type}</span>}
        </div>
      )}
      <div className="app__community-content">
        {!event.coverImage && event.type && (
          <span className="app__community-badge app__community-badge--inline">{event.type}</span>
        )}
        <h3 className="bold-text">{event.title}</h3>
        {event.eventName && <p className="app__community-event">{event.eventName}</p>}
        {event.role && <span className="app__community-role">{event.role}</span>}

        <div className="app__community-meta">
          {event.date && (
            <span><AiOutlineCalendar /> {formatMonthYear(event.date)}</span>
          )}
          {event.location && (
            <span><AiOutlineEnvironment /> {event.location}</span>
          )}
        </div>

        {event.description && <p className="p-text">{event.description}</p>}

        {event.link && (
          <a href={event.link} target="_blank" rel="noreferrer" className="app__community-link">
            <AiOutlineLink /> View
          </a>
        )}
      </div>
    </motion.div>
  );

  return (
    <>
      <h2 className="head-text">Speaking & <span>Community</span></h2>

      <div className="app__community-stats">
        {stats.map((stat) => (
          <StatCounter
            key={stat._id || stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>

      <FilterableCards
        items={events}
        filters={['All', 'Talks', 'Events', 'Hackathons']}
        matchItem={(event, filter) => event.type === filterToType[filter]}
        renderCard={renderEventCard}
        classNames={{
          filter: 'app__community-filter',
          filterItem: 'app__community-filter-item',
          grid: 'app__community-grid',
        }}
      />
    </>
  );
};

export default AppWrap(
  MotionWrap(Community, 'app__community'),
  'community',
  'app__primarybg',
);
