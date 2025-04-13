import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Authentication</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
