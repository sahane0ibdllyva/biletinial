import React from 'react';
import Seat from './Seat';

const SeatGrid = ({ seats, selectedSeats, onSeatSelect }) => {
  return (
    <div className="seat-grid">
      {seats.map(seat => (
        <Seat 
          key={`${seat.row}${seat.number}`} 
          seat={seat} 
          isSelected={selectedSeats.includes(seat)} 
          onSeatSelect={onSeatSelect} 
        />
      ))}
    </div>
  );
};

export default SeatGrid;
