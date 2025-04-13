import React, { useState } from 'react';

interface VehicleFilterProps {
  onFilterChange: (filters: { make: string; model: string; year: number }) => void;
}

const VehicleFilter: React.FC<VehicleFilterProps> = ({ onFilterChange }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number | ''>('');

  const handleFilterChange = () => {
    onFilterChange({ make, model, year: year ? parseInt(year.toString(), 10) : 0 });
  };

  return (
    <div className="vehicle-filter">
      <input
        type="text"
        placeholder="Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value ? parseInt(e.target.value, 10) : '')}
      />
      <button onClick={handleFilterChange}>Filter</button>
    </div>
  );
};

export default VehicleFilter;
