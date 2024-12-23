import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import FloatingActions from './FloatingActions';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow relative">
        {children}
        <FloatingActions />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
