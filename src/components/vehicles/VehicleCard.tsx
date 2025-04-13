import React from 'react';
import { Vehicle } from '@/types/database';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="vehicle-card">
      <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} />
      <h2>{vehicle.make} {vehicle.model}</h2>
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.price}</p>
      <p>{vehicle.description}</p>
    </div>
  );
};

export default VehicleCard;
