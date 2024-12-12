// frontend/src/components/EmployeeList.js
import React, { useState } from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
    const { employees } = useEmployeeContext();
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const renderMetricBar = (value) => {
        const color = 
            value > 80 ? 'bg-green-500' : 
            value > 60 ? 'bg-yellow-500' : 
            'bg-red-500';
        
        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className={`${color} h-2.5 rounded-full`} 
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Employee Performance Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Employee List */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Productivity</th>
                                <th className="p-3 text-left">Collaboration</th>
                                <th className="p-3 text-left">Communication</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{employee.name}</td>
                                    <td className="p-3">
                                        {employee.productivity}%
                                        {renderMetricBar(employee.productivity)}
                                    </td>
                                    <td className="p-3">
                                        {employee.collaboration}%
                                        {renderMetricBar(employee.collaboration)}
                                    </td>
                                    <td className="p-3">
                                        {employee.communication}%
                                        {renderMetricBar(employee.communication)}
                                    </td>
                                    <td className="p-3">
                                        <button 
                                            onClick={() => setSelectedEmployee(employee)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Employee Form */}
                {selectedEmployee && (
                    <EmployeeForm 
                        employee={selectedEmployee} 
                        onClose={() => setSelectedEmployee(null)} 
                    />
                )}
            </div>
        </div>
    );
};

export default EmployeeList;