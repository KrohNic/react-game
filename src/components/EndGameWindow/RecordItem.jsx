import React from 'react';
import PropTypes from 'prop-types';

const RecordItem = ({
  recordIco,
  time,
  size,
  className,
  difficulty,
  date,
  title,
}) => (
  <li className={className} title={title}>
    {recordIco}
    {` ${time} sec, size: ${size}, difficulty: ${difficulty}, `}
    {`${new Date(date).toLocaleString()}`}
  </li>
);

RecordItem.propTypes = {
  recordIco: PropTypes.object,
  time: PropTypes.number,
  size: PropTypes.string,
  className: PropTypes.string,
  difficulty: PropTypes.string,
  date: PropTypes.number,
  title: PropTypes.string,
};

export default RecordItem;
