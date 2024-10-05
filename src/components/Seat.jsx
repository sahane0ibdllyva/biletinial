import React from 'react';

const Seat = ({ seat, isSelected, onSeatSelect }) => {
  const getSeatClass = () => {
    if (seat.status === 'booked') return 'seat booked';
    if (isSelected) return 'seat selected';
    return 'seat available';
  };

  return (
    <div 
      className={getSeatClass()} 
      onClick={() => onSeatSelect(seat)}
    >
      {seat.row}{seat.number}
    </div>
  );
};

export default Seat;
