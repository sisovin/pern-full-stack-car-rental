import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getVehicleById } from '@/services/vehicle.service';
import { Vehicle } from '@/types/database';

const VehicleDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (id) {
      getVehicleById(id as string).then(setVehicle);
    }
  }, [id]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{vehicle.make} {vehicle.model}</h1>
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.price}</p>
      <p>Description: {vehicle.description}</p>
    </div>
  );
};

export default VehicleDetailsPage;
