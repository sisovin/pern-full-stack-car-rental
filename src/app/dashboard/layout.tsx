import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
