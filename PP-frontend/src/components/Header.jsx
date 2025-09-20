import React, { useState, useEffect, useRef } from 'react';
import { FiBriefcase, FiBarChart2, FiUser, FiLogOut, FiSettings, FiGlobe, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLoginClick = () => {
    console.log('Login clicked');
    setIsDropdownOpen(false);
    // Add your login logic here
  };

  const handleSignupClick = () => {
    console.log('Signup clicked');
    setIsDropdownOpen(false);
    // Add your signup logic here
  };

  return (
    <div className="flex items-center justify-between p-3 md:p-5">
      <div className="flex items-center">
        <div className="bg-blue-400 p-1.5 md:p-2 rounded-md flex items-center justify-center">
          <FiBriefcase className="h-5 w-5 md:h-6 md:w-6 text-white" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-white ml-2">PocketPilot</h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleProfileClick}
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold text-sm"
          >
            <FiUser className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={handleLoginClick}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              >
                <FiLogIn className="h-4 w-4 mr-3" />
                Login
              </button>
              
              <button
                onClick={handleSignupClick}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              >
                <FiUserPlus className="h-4 w-4 mr-3" />
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;