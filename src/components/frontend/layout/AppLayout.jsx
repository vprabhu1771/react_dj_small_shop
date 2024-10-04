import React from 'react';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';
const AppLayout = ({ children }) => {
  return (
    <div>
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default AppLayout;