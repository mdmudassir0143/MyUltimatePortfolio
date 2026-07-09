/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Shared filter-tabs + animated card grid. Used by both Work (Projects) and
// Community (events). The consumer supplies the filter list, how an item is
// matched against a filter, and how a single card renders. Class names are
// overridable so each section keeps its own styling.
const FilterableCards = ({
  items,
  filters,
  matchItem,
  renderCard,
  defaultFilter = 'All',
  classNames = {},
}) => {
  const {
    filter: filterCls = 'app__filter',
    filterItem: filterItemCls = 'app__filter-item',
    grid: gridCls = 'app__filter-grid',
  } = classNames;

  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [filtered, setFiltered] = useState(items);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const applyFilter = (filter, source) => (
    filter === defaultFilter ? source : source.filter((it) => matchItem(it, filter))
  );

  // Re-sync when the items load in asynchronously from Sanity.
  useEffect(() => {
    setFiltered(applyFilter(activeFilter, items));
  }, [items]);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      setFiltered(applyFilter(filter, items));
    }, 500);
  };

  return (
    <>
      <div className={filterCls}>
        {filters.map((filter, index) => (
          <div
            key={`${filter}-${index}`}
            onClick={() => handleFilter(filter)}
            className={`${filterItemCls} app__flex p-text ${activeFilter === filter ? 'item-active' : ''}`}
          >
            {filter}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className={gridCls}
      >
        {filtered.map((item, index) => renderCard(item, index))}
      </motion.div>
    </>
  );
};

export default FilterableCards;
