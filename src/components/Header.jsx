import React from 'react';
import Footer from './Footer';

const Header = () => {
  return (
    <nav className="bg-gray-800 text-white py-2 px-6 w-full top-0 z-50 flex h-10 justify-between items-center">
      <div>
        Secure Nest
      </div>
      <div className="flex justify-between items-center space-x-4">
        <div>
          {/* Additional content can go here */}
        </div>
        <div>
          Logout
        </div>
      </div>
    </nav>
  );
};

export default Header;
