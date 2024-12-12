// frontend/src/components/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';

const EmployeeForm = ({ employee, onClose }) => {
    const [metrics, setMetrics] = useState({
        productivity: employee.productivity,
        collaboration: employee.collaboration,
        communication: employee.communication
    });
    const { updateEmployeeMetrics } = useEmployeeContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // frontend/src/components/EmployeeForm.js (continued)
        const hasErrors = 
            metrics.productivity < 0 || metrics.productivity > 100 ||
            metrics.collaboration < 0 || metrics.collaboration > 100 ||
            metrics.communication < 0 || metrics.communication > 100;

        if (hasErrors) {
            alert('Please enter values between 0 and 100');
            return;
        }

        updateEmployeeMetrics(employee.id, metrics);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMetrics(prev => ({
            ...prev,
            [name]: Number(value)
        }));
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Update Metrics for {employee.name}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Productivity (%)</label>
                    <input
                        type="number"
                        name="productivity"
                        value={metrics.productivity}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Collaboration (%)</label>
                    <input
                        type="number"
                        name="collaboration"
                        value={metrics.collaboration}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Communication (%)</label>
                    <input
                        type="number"
                        name="communication"
                        value={metrics.communication}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Update Metrics
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;