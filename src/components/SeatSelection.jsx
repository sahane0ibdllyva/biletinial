
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const SeatSelection = () => {
//   const location = useLocation();
//   const { itemName, city, eventDate, venueName, time,sln } = location.state || {};

//   if (!itemName) {
//     return <p>Movie not found</p>;
//   }

//   return (
//     <div>
//       <h2>{itemName}</h2>
//       <h5>{sln}</h5>
//       <p>{city}</p>
//       <p>{eventDate}</p>
//       <p>{venueName}</p>
//       <p>{time}</p>
//       {/* Add your seat selection logic here */}
//     </div>
//   );
// };

// export default SeatSelection;












import React, { useState, useEffect } from 'react';
import SeatGrid from './SeatGrid';
import Timer from './Timer';

const SeatSelection = ({ movieDetails, seatData }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timer, setTimer] = useState(600); // 10-minute timer (600 seconds)
  
  // Update the selected seats
  const handleSeatSelection = (seat) => {
    if (seat.status === 'available') {
      setSelectedSeats([...selectedSeats, seat]);
    } else if (seat.status === 'selected') {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    }
  };

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="seat-selection-page">
      <header>
        <h1>{movieDetails.title}</h1>
        <p>{movieDetails.cinema} - {movieDetails.date}</p>
        <p><strong>Time Remaining:</strong> <Timer seconds={timer} /></p>
      </header>

      <SeatGrid 
        seats={seatData.seats} 
        selectedSeats={selectedSeats} 
        onSeatSelect={handleSeatSelection}
      />

      <div className="checkout-section">
        <h2>Selected Seats:</h2>
        {selectedSeats.map(seat => (
          <span key={`${seat.row}${seat.number}`}>{seat.row}{seat.number} </span>
        ))}
        <h3>Total Price: {selectedSeats.length * seatData.prices.regular} TL</h3>
        <button onClick={() => console.log('Proceed to Payment')}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
