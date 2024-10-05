import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/bilet.json'; // Import your bilet.json data

const VenueDetailPage = () => {
  const { venueName } = useParams();
  const [venueData, setVenueData] = useState(null);

  useEffect(() => {
    // Assuming venueName is unique and mapped correctly in the bilet.json structure
    const venue = findVenueByName(venueName); // Implement this helper function
    setVenueData(venue);
  }, [venueName]);

  const findVenueByName = (name) => {
    // Traverse the JSON data to find the venue object with matching name
    for (const movie of data.movies) {
      for (const city of movie.cities) {
        for (const seans of city.seans) {
          for (const venue of seans.venues) {
            if (venue.venue?.venue_name === name) {
              return venue;
            }
          }
        }
      }
    }
    return null; // Return null if no match is found
  };

  if (!venueData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{venueData.venue?.venue_name}</h1>
      <img src={venueData.venue?.venue_foto} alt={venueData.venue?.venue_name} />
      <div className="venue-tabs">
        <ul>
          <li>Hakkında</li>
          <li>İletişim ve Ulaşım</li>
          <li>Fotoğraflar</li>
          <li>Değerlendirme</li>
        </ul>
      </div>

      <div>
        <h2>Hakkında</h2>
        <p>{venueData.venue?.about}</p>
      </div>

      <div>
        <h2>İletişim ve Ulaşım</h2>
        <p>{venueData.venue?.contact.tel}</p>
        <p>{venueData.venue?.contact.adres}</p>
      </div>

      <div>
        <h2>Fotoğraflar</h2>
        <img src={venueData.venue?.venue_foto} alt="Venue" />
      </div>

      <div>
        <h2>Değerlendirme</h2>
        <p>{venueData.venue?.contact.cancel_ticket}</p>
        {/* Add rating and comment section here */}
      </div>
    </div>
  );
};

export default VenueDetailPage;
