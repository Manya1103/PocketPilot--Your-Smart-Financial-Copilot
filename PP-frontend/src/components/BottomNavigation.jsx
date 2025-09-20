import React from 'react';
import { FiHome, FiBarChart, FiTarget, FiSettings, FiCamera } from 'react-icons/fi';

const BottomNavigation = ({ activeTab = 'home', onTabClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-lg">
      <div className="flex justify-between py-4 px-4 mx-auto" style={{ maxWidth: '450px' }}>
        <button 
          className={`flex flex-col items-center ${activeTab === 'home' ? 'text-blue-400' : 'text-gray-500 hover:text-blue-400'}`}
          onClick={() => onTabClick('home')}
        >
          <FiHome className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button 
          className={`flex flex-col items-center ${activeTab === 'analytics' ? 'text-blue-400' : 'text-gray-500 hover:text-blue-400'}`}
          onClick={() => onTabClick('analytics')}
        >
          <FiBarChart className="h-6 w-6" />
          <span className="text-xs mt-1">Analytics</span>
        </button>
        
        <div className="relative">
          <div className="absolute -top-10 transform -translate-x-1/2 left-1/2">
            <button 
              className="bg-blue-500 rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors"
            >
              <FiCamera className="h-6 w-6 text-white" />
            </button>
            <span className="flex flex-col items-center text-gray-500 hover:text-blue-400 text-xs mt-1">Scan</span>
          </div>
          <div className="h-6"></div>
        </div>
        
        <button 
          className={`flex flex-col items-center ${activeTab === 'goals' ? 'text-blue-400' : 'text-gray-500 hover:text-blue-400'}`}
          onClick={() => onTabClick('goals')}
        >
          <FiTarget className="h-6 w-6" />
          <span className="text-xs mt-1">Goals</span>
        </button>
        
        <button 
          className={`flex flex-col items-center ${activeTab === 'settings' ? 'text-blue-400' : 'text-gray-500 hover:text-blue-400'}`}
          onClick={() => onTabClick('settings')}
        >
          <FiSettings className="h-6 w-6" />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;