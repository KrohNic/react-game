import React from 'react'

const RecordItem = ({ recordIco, time, size, className, difficulty, date, title }) => (
  <li className={className} title={title}>
    {recordIco}
    {` ${time} sec, size: ${size}, difficulty: ${difficulty}, `}
    {`${new Date(date).toLocaleString()}`}
  </li>
)

export default RecordItem
