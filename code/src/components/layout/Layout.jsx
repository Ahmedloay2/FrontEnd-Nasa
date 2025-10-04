import React, { memo,useEffect } from 'react';
import { Outlet ,useLocation} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
