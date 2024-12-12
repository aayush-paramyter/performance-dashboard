// frontend/src/components/PerformanceSummary.js
import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';

const PerformanceSummary = () => {
    const { performanceSummary, employees } = useEmployeeContext();

    const renderSummaryMetric = (label, value) => (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{label}</h3>
            <div className="flex items-center">
                <div 
                    className="w-full bg-gray-200 rounded-full h-4 mr-2"
                >
                    <div 
                        className={`h-4 rounded-full ${
                            value > 80 ? 'bg-green-500' : 
                            value > 60 ? 'bg-yellow-500' : 
                            'bg-red-500'
                        }`}
                        style={{ width: `${value}%` }}
                    ></div>
                </div>
                <span className="font-bold">{value.toFixed(1)}%</span>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Performance Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {renderSummaryMetric(
                        'Average Productivity', 
                        performanceSummary.avg_productivity
                    )}
                    {renderSummaryMetric(
                        'Average Collaboration', 
                        performanceSummary.avg_collaboration
                    )}
                    {renderSummaryMetric(
                        'Average Communication', 
                        performanceSummary.avg_communication
                    )}
                </div>

                <div className="col-span-1 md:col-span-3 bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-gray-600">Total Employees</p>
                            <p className="text-xl font-bold">{employees.length}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Top Performer</p>
                            <p className="text-xl font-bold">
                                {employees.length > 0 
                                    ? employees.reduce((top, emp) => 
                                        ((emp.productivity + emp.collaboration + emp.communication) / 3) > 
                                        ((top.productivity + top.collaboration + top.communication) / 3) 
                                        ? emp : top
                                    ).name 
                                    : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Highest Productivity</p>
                            <p className="text-xl font-bold">
                                {employees.length > 0 
                                    ? Math.max(...employees.map(e => e.productivity)) + '%'
                                    : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Lowest Communication</p>
                            <p className="text-xl font-bold">
                                {employees.length > 0 
                                    ? Math.min(...employees.map(e => e.communication)) + '%'
                                    : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceSummary;