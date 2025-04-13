import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import VehicleCard from '../components/vehicles/VehicleCard';
import VehicleFilter from '../components/vehicles/VehicleFilter';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to Car Rental Service</h1>
        <VehicleFilter />
        <div className="vehicle-list">
          {/* Example vehicle cards */}
          <VehicleCard make="Toyota" model="Camry" year={2020} />
          <VehicleCard make="Honda" model="Civic" year={2019} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
