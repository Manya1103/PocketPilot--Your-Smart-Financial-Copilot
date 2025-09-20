import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VoiceAssistant from './components/VoiceAssistant';
import BottomNavigation from './components/BottomNavigation';
import MonthlyOverview from './components/MonthlyOverview';
import QuickActions from './components/QuickActions';
import RecentTransactions from './components/RecentTransactions';
import FinancialGoals from './components/FinancialGoals';
import ExpenseCategories from './components/ExpenseCategories';


const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="relative z-10 flex flex-col h-full">
        <Header />
        <VoiceAssistant />

        {/* Main content based on active tab */}
        {activeTab === 'home' && (
          <div className="space-y-6 py-4">
            <MonthlyOverview />
            <ExpenseCategories />
            <FinancialGoals />
            <QuickActions />
            <RecentTransactions />
          </div>
        )}

        {/* Other tabs would render different content */}
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default App;