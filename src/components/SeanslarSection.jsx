
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './SeanslarSection.css';

const SeanslarSection = ({ item }) => {
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Seçilen tarix
  const [citySearch, setCitySearch] = useState(''); // Şəhər axtarış inputu
  const [venueSearch, setVenueSearch] = useState(''); // Venue axtarış inputu
  const [filteredSeans, setFilteredSeans] = useState([]);
  const [eventDates, setEventDates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]); // Şəhər filtrasiya
  const [selectedCity, setSelectedCity] = useState('Şəhər Seç'); // Default şəhər mətni

  const handleShowCityModal = () => setShowCityModal(true);
  const handleCloseCityModal = () => setShowCityModal(false);

  const cities = item?.cities || [];

  // Seans tarixləri toplamaq üçün
  useEffect(() => {
    const uniqueDates = new Set();
    cities.forEach(city => {
      city.seans.forEach(sean => uniqueDates.add(sean.event_date));
    });
    const datesArray = Array.from(uniqueDates);
    setEventDates(datesArray);

    const storedDate = localStorage.getItem('selectedDate');
    if (storedDate && datesArray.includes(storedDate)) {
      setSelectedDate(storedDate);
    } else if (datesArray.length > 0) {
      setSelectedDate(datesArray[0]);
    }
  }, [cities]);

  // Şəhər filtrinə görə axtarış
  useEffect(() => {
    const filteredCitiesList = cities.filter(city =>
      city.city?.toLowerCase().includes(citySearch.toLowerCase())
    );
    setFilteredCities(filteredCitiesList);
  }, [citySearch, cities]);

  // Seansları filtrləmək üçün
  useEffect(() => {
    const filtered = cities
      .filter(city => selectedCity === 'Şəhər Seç' || city.city === selectedCity) // Şəhərə görə filtrləmə
      .flatMap(city =>
        city.seans.filter(sean => sean.event_date === selectedDate)
      );
    setFilteredSeans(filtered);

    if (selectedDate) {
      localStorage.setItem('selectedDate', selectedDate);
    }
  }, [selectedDate, selectedCity, cities]);

  // Şəhər seçimi üçün
  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName); // Şəhər seçmək
    setCitySearch(cityName); // Seçilən şəhəri search input sahəsinə yazmaq
    handleCloseCityModal(); // Modalı bağlamaq
  };

  // Şəhər axtarışını sıfırlamaq üçün
  const handleCitySearchClear = (e) => {
    const value = e.target.value;
    setCitySearch(value);

    // Axtarış boş olduqda, bütün şəhərlər göstərilsin
    if (value === '') {
      setSelectedCity('Şəhər Seç');
    }
  };

  return (
    <div className="seans-section">
      <h2>Seanslar və Salonlar</h2>

      {/* Venue axtarışı */}
      <div>
        <input
          type="text"
          placeholder="Məkan Axtar"
          value={venueSearch}
          onChange={(e) => setVenueSearch(e.target.value)}
        />
      </div>

      {/* Şəhər seçmə düyməsi */}
      <Button variant="warning" onClick={handleShowCityModal}>
        {selectedCity}
      </Button>

      {/* Şəhər seçimi modalı */}
      <Modal show={showCityModal} onHide={handleCloseCityModal}>
        <Modal.Header closeButton>
          <Modal.Title>Şəhər Axtar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Şəhər Axtar..."
            value={citySearch}
            onChange={handleCitySearchClear}
            className="city-search-input"
          />
          <ul className="city-list">
            {filteredCities.map((cityObj, index) => (
              <li key={index} onClick={() => handleCitySelect(cityObj.city)}>
                {cityObj.city}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>

      {/* Tarix düymələri */}
      <div className="date-tabs">
        {eventDates.map((date, index) => (
          <Button
            key={index}
            variant={selectedDate === date ? 'warning' : 'secondary'}
            onClick={() => setSelectedDate(date)}
            className="date-tab"
          >
            {date}
          </Button>
        ))}
      </div>

      {/* Seansları göstərmək */}
      {filteredSeans.length > 0 ? (
        filteredSeans.map((seans, index) => (
          <div key={index} className="seans-container">
            <h4>{seans.event_date}</h4>
            <h5>{cities.find(city => city.seans.includes(seans))?.city}</h5> {/* Şəhəri göstərmək */}
            {seans?.venues?.length > 0 ? (
              seans.venues
                .filter(venueItem => {
                  const venueName = 
                    venueItem.venue_name || // Birbaşa venue_name
                    venueItem.venue?.venue_name; // Nested venue_name
                  return venueName?.toLowerCase().includes(venueSearch.toLowerCase());
                }) // Venue axtarışına görə filtrləmə
                .map((venueItem, venueIndex) => {
                  const venueName =
                    venueItem.venue_name || venueItem.venue?.venue_name;
                  const salon = venueItem.salon || venueItem.venue?.salon;
                  return (
                    <div key={venueIndex} className="venue-container">
                      <h5>{venueName}</h5>
                      <h6>Salon: {salon}</h6>
                      {venueItem?.saat?.length > 0 ? (
                        venueItem.saat.map((time, timeIndex) => (
                          <Link
                            key={timeIndex}
                            to="/seat-selection"
                            state={{
                              itemName: item?.title,
                              city: cities.find(city => city.seans.includes(seans))?.city,
                              eventDate: seans.event_date,
                              venueName,
                              sln: salon,
                              time,
                            }}
                          >
                            <button className="time-button">{time}</button>
                          </Link>
                        ))
                      ) : (
                        <p>No showtimes available</p>
                      )}
                    </div>
                  );
                })
            ) : (
              <p>No venues available</p>
            )}
          </div>
        ))
      ) : (
        <p>No sessions available for the selected city or date</p>
      )}
    </div>
  );
};

export default SeanslarSection;
