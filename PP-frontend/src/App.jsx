import React, { useState } from 'react';
import Header from './components/Header';
import VoiceAssistant from './components/VoiceAssistant';
import BottomNavigation from './components/BottomNavigation';
import MonthlyOverview from './components/MonthlyOverview';
import QuickActions from './components/QuickActions';
import RecentTransactions from './components/RecentTransactions';
import FinancialGoals from './components/FinancialGoals';
import ExpenseCategories from './components/ExpenseCategories';
import ReceiptScanner from './components/ReceiptScanner'; // Import the new component

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScanClick = () => {
    setIsScannerOpen(true);
  };

  const handleScannerClose = () => {
    setIsScannerOpen(false);
  };
  
  // This function would be called after a successful scan to update the UI
  const handleScanComplete = (newExpense) => {
    console.log('New expense added:', newExpense);
    setIsScannerOpen(false);
    // You would typically fetch the updated list of expenses here
    // or add the newExpense to your state to update the UI immediately.
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen"> 
        <Header />

        {isScannerOpen ? (
          <div className="flex-grow flex items-center justify-center p-4">
            <ReceiptScanner 
              onScanComplete={handleScanComplete}
              onCancel={handleScannerClose}
            />
          </div>
        ) : (
          <>
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
          </>
        )}
        
        <BottomNavigation
          activeTab={activeTab}
          onTabClick={setActiveTab}
          onScanClick={handleScanClick}
        />
      </div>
    </div>
  );
};

export default App;