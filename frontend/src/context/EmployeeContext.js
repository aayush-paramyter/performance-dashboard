// // frontend/src/context/EmployeeContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import io from 'socket.io-client';

// const EmployeeContext = createContext();

// export const EmployeeProvider = ({ children }) => {
//     const [employees, setEmployees] = useState([]);
//     const [performanceSummary, setPerformanceSummary] = useState({
//         avg_productivity: 0,
//         avg_collaboration: 0,
//         avg_communication: 0
//     });
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         // Establish socket connection
//         const newSocket = io('http://localhost:5000');
//         setSocket(newSocket);

//         // Fetch initial data
//         fetchEmployees();
//         fetchPerformanceSummary();

//         // Socket event listeners
//         newSocket.on('employees_updated', (updatedEmployees) => {
//             setEmployees(updatedEmployees);
//         });

//         newSocket.on('performance_summary_updated', (summary) => {
//             setPerformanceSummary(summary);
//         });

//         // Cleanup on unmount
//         return () => newSocket.close();
//     }, []);

//     const fetchEmployees = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/employees');
//             const data = await response.json();
//             setEmployees(data);
//         } catch (error) {
//             console.error('Error fetching employees:', error);
//         }
//     };

//     const fetchPerformanceSummary = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/performance-summary');
//             const data = await response.json();
//             setPerformanceSummary(data);
//         } catch (error) {
//             console.error('Error fetching performance summary:', error);
//         }
//     };

//     const updateEmployeeMetrics = (employeeId, metrics) => {
//         if (socket) {
//             socket.emit('update_employee_metrics', {
//                 id: employeeId,
//                 ...metrics
//             });
//         }
//     };

//     return (
//         <EmployeeContext.Provider value={{
//             employees,
//             performanceSummary,
//             updateEmployeeMetrics
//         }}>
//             {children}
//         </EmployeeContext.Provider>
//     );
// };

// export const useEmployeeContext = () => useContext(EmployeeContext);






// frontend/src/context/EmployeeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const EmployeeContext = createContext();

// Dummy data for employees
const INITIAL_EMPLOYEES = [
    {
        id: 1,
        name: 'John Doe',
        productivity: 85,
        collaboration: 90,
        communication: 88
    },
    {
        id: 2,
        name: 'Jane Smith',
        productivity: 92,
        collaboration: 85,
        communication: 95
    },
    {
        id: 3,
        name: 'Mike Johnson',
        productivity: 78,
        collaboration: 82,
        communication: 80
    },
    {
        id: 4,
        name: 'Emily Brown',
        productivity: 88,
        collaboration: 91,
        communication: 86
    },
    {
        id: 5,
        name: 'David Wilson',
        productivity: 75,
        collaboration: 79,
        communication: 77
    }
];

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
    const [performanceSummary, setPerformanceSummary] = useState({
        avg_productivity: 0,
        avg_collaboration: 0,
        avg_communication: 0
    });

    // Calculate performance summary
    useEffect(() => {
        const summary = {
            avg_productivity: employees.reduce((sum, emp) => sum + emp.productivity, 0) / employees.length,
            avg_collaboration: employees.reduce((sum, emp) => sum + emp.collaboration, 0) / employees.length,
            avg_communication: employees.reduce((sum, emp) => sum + emp.communication, 0) / employees.length
        };
        
        setPerformanceSummary(summary);
    }, [employees]);

    const updateEmployeeMetrics = (employeeId, metrics) => {
        setEmployees(prevEmployees => 
            prevEmployees.map(emp => 
                emp.id === employeeId 
                    ? { ...emp, ...metrics } 
                    : emp
            )
        );
    };

    return (
        <EmployeeContext.Provider value={{
            employees,
            performanceSummary,
            updateEmployeeMetrics
        }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployeeContext = () => useContext(EmployeeContext);