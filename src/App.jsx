import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useLocalStorage } from './useLocalStorage';
import Sidebar from './Layout/Sidebar'
import Header from './Layout/Header';
import StatsPanel from './Dashboard/StatsPanel';
import TaskFilters from './Dashboard/TaskFilters';
import TaskList from './Tasks/TaskList';
import TaskModal from '../src/TaskModal';
import LoginModal from './Auth/LoginModal';

const AppContent = () => {
  useLocalStorage();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your tasks and stay productive
              </p>
            </div>

            <StatsPanel />
            <TaskFilters />
            <TaskList />
          </div>
        </main>
      </div>

      <TaskModal />
      <LoginModal />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;