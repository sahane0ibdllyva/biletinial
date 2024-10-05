import React from 'react';

const Timer = ({ seconds }) => {
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="timer">
      <h2>{formatTime(seconds)}</h2>
    </div>
  );
};

export default Timer;
