import React from 'react';
import { Outlet } from 'react-router-dom';

import AnimatedBackground from '../Background/AnimatedBackground';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative overflow-hidden py-4 md:py-10">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <Outlet />
        </div>
        <AnimatedBackground />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
