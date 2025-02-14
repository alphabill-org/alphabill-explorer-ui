import React from 'react';
import { Link } from 'react-router-dom';

export const Page404: React.FC = () => {
  return (
    <div className="min-h-[64vh] flex flex-col justify-center items-center text-secondary">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8 text-lg text-white">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="px-6 py-3 text-base link">
        Go Back Home
      </Link>{' '}
    </div>
  );
};
