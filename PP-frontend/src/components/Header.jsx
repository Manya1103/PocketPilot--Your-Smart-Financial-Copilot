import React, { useState, useEffect, useRef } from 'react';
import { FiBriefcase, FiBarChart2, FiUser, FiLogOut, FiSettings, FiGlobe, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Header = ({ onLoginClick }) => {

  return (
    <div className="flex items-center justify-between p-2 md:p-5">
      <div className="flex items-center">
        <div className="bg-blue-400 p-1.5 md:p-2 rounded-md flex items-center justify-center">
          <FiBriefcase className="h-5 w-5 md:h-6 md:w-6 text-white" />
        </div>
        <h1 className="text-xl md:text-2xl font-semibold text-white ml-2">PocketPilot</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative">
          <button
            onClick={onLoginClick}
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white font-bold text-sm"
          >
            <FiUser className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <span 
            className='text-white text-sm cursor-pointer hover:text-blue-300 transition-colors'
            onClick={onLoginClick}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;