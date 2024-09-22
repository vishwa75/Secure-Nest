import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 px-6 w-full fixed top-0 z-50 flex justify-between items-center">
      <div>
        The Application
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

export default Navbar;
