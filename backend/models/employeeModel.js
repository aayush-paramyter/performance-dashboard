// backend/models/employeeModel.js
const db = require('../config/database');

class EmployeeModel {
    // Fetch all employees
    static async getAllEmployees() {
        const [rows] = await db.query('SELECT * FROM employees');
        return rows;
    }

    // Update employee metrics
    static async updateEmployeeMetrics(id, { productivity, collaboration, communication }) {
        // Validate input (server-side validation)
        if (
            productivity < 0 || productivity > 100 ||
            collaboration < 0 || collaboration > 100 ||
            communication < 0 || communication > 100
        ) {
            throw new Error('Invalid metric values. Must be between 0 and 100.');
        }

        const [result] = await db.query(
            'UPDATE employees SET productivity = ?, collaboration = ?, communication = ? WHERE id = ?',
            [productivity, collaboration, communication, id]
        );

        return result.affectedRows > 0;
    }

    // Get performance summary
    static async getPerformanceSummary() {
        const [rows] = await db.query(`
            SELECT 
                AVG(productivity) as avg_productivity,
                AVG(collaboration) as avg_collaboration,
                AVG(communication) as avg_communication
            FROM employees
        `);
        return rows[0];
    }
}

module.exports = EmployeeModel;