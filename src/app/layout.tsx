import React from 'react';
import AuthLayout from './(auth)/layout';
import PublicLayout from './(public)/layout';
import DashboardLayout from './dashboard/layout';

const RootLayout = ({ children }) => {
  return (
    <div>
      <AuthLayout>
        <PublicLayout>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </PublicLayout>
      </AuthLayout>
    </div>
  );
};

export default RootLayout;
