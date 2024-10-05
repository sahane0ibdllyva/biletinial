
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data/bilet.json';  // Your bilet.json data
import FilterWithSearch from './FilterWithSearch';  // Assuming FilterWithSearch is in the same folder
import '../components/DynamicPage.css'

const DynamicPage = () => {
  const { category, subcategory } = useParams();  // Get category/subcategory dynamically from URL
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    venue: '',
    type: '',
    event_date: ''
  });

  // Memoized function to apply filters
  const applyFilters = useCallback(() => {
    const items = data[category] || (data.diger && data.diger[subcategory]);

    if (!Array.isArray(items)) return;

    const filtered = items.filter(item => {
      const cityMatch = filters.city
        ? item.cities && item.cities.some(city => city.city === filters.city)
        : true;
      const venueMatch = filters.venue
        ? item.cities &&
          item.cities.some(city =>
            city.seans.some(seans =>
              seans.venues.some(venue => venue?.venue?.venue_name === filters.venue)
            )
          )
        : true;
      const typeMatch = filters.type
        ? item.type && item.type.includes(filters.type)
        : true;
      const dateMatch = filters.event_date
        ? item.cities &&
          item.cities.some(city =>
            city.seans.some(seans => seans.event_date === filters.event_date)
          )
        : true;

      return cityMatch && venueMatch && typeMatch && dateMatch;
    });

    setFilteredItems(filtered);
  }, [category, subcategory, filters]);

  // Run filters whenever a filter value changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  // Get unique filter options from data
  const cities = Array.from(new Set(
    filteredItems.flatMap(item => item.cities ? item.cities.map(city => city.city) : [])
  ));
  const venues = Array.from(new Set(
    filteredItems.flatMap(item =>
      item.cities ? item.cities.flatMap(city =>
        city.seans.flatMap(seans =>
          seans.venues.flatMap(venue => venue?.venue?.venue_name  || [])
        )
      ) : []
    )
  ));
  const types = Array.from(new Set(
    filteredItems.flatMap(item => item.type || [])
  ));
  const eventDates = Array.from(new Set(
    filteredItems.flatMap(item =>
      item.cities ? item.cities.flatMap(city =>
        city.seans.map(seans => seans.event_date)
      ) : []
    )
  ));

  if (!data[category] && (!data.diger || !data.diger[subcategory])) {
    return <p>No items found for this category or subcategory.</p>;
  }

  return (
    <div>
      <h1>{(category || subcategory).charAt(0).toUpperCase() + (category || subcategory).slice(1)}</h1>

      {/* Filters Section */}
      <div className="filters">
        <FilterWithSearch
          label="City"
          options={cities}
          selected={filters.city}
          onChange={value => handleFilterChange('city', value)}
          searchPlaceholder="Search City"
        />
        <FilterWithSearch
          label="Venue"
          options={venues}
          selected={filters.venue}
          onChange={value => handleFilterChange('venue', value)}
          searchPlaceholder="Search Venue"
        />
        <FilterWithSearch
          label="Type"
          options={types}
          selected={filters.type}
          onChange={value => handleFilterChange('type', value)}
          searchPlaceholder="Search Type"
        />
        <FilterWithSearch
          label="Event Date"
          options={eventDates}
          selected={filters.event_date}
          onChange={value => handleFilterChange('event_date', value)}
          searchPlaceholder="Search Date"
        />
      </div>

      {/* Display Filtered Items */}
      <div className="title-boxes">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
           <Link to={`/details/${category || subcategory}/${item.id}`}>
                <div className='title_box' key={item.id}>
                      <h3>{item.title}</h3>
                      <img  src={item.poster} alt={item.title} />
                </div>
             </Link>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default DynamicPage;









