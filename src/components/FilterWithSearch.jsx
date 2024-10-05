
import React, { useState } from 'react';
import './FilterWithSearch.css';

const FilterWithSearch = ({ label, options, selected, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterClear = () => {
    onChange(''); // Clear the selected option
  };

  return (
    <div
      className="filter-container"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <label>{label}</label>
      <div className="filter-dropdown-trigger">
        <input
          type="text"
          value={selected}
          placeholder="Filtre Seçiniz"
          readOnly
          onClick={() => setShowDropdown(!showDropdown)}
        />
      </div>
      <div className={`filter-dropdown ${showDropdown ? 'show' : ''}`}>
        <input
          type="text"
          placeholder="Arama yap..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => onChange(option)}>
              {option}
            </li>
          ))}
        </ul>
        <button onClick={handleFilterClear}>Filtreyi Temizle</button>
      </div>
    </div>
  );
};

export default FilterWithSearch;
