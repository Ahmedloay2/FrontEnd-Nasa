import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = memo(() => {
  return (
    <>
      <Navbar />
      <main role="main" className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
});

Layout.displayName = 'Layout';

export default Layout;
