// frontend/src/App.js
import React from 'react';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeList from './components/EmployeeList';
import PerformanceSummary from './components/PerformanceSummary';

function App() {
    return (
        <EmployeeProvider>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-blue-600 text-white p-4 shadow-md">
                    <h1 className="text-3xl font-bold">Employee Performance Dashboard</h1>
                </header>
                
                <main className="container mx-auto px-4 py-8">
                    <PerformanceSummary />
                    <EmployeeList />
                </main>
            </div>
        </EmployeeProvider>
    );
}

export default App;