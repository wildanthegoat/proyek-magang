import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex mt-16">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
