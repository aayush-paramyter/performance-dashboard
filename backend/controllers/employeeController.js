// backend/controllers/employeeController.js
const EmployeeModel = require('../models/employeeModel');

class EmployeeController {
    static async getAllEmployees(req, res) {
        try {
            const employees = await EmployeeModel.getAllEmployees();
            res.json(employees);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateEmployeeMetrics(req, res) {
        try {
            const { id } = req.params;
            const { productivity, collaboration, communication } = req.body;

            const updated = await EmployeeModel.updateEmployeeMetrics(id, {
                productivity, 
                collaboration, 
                communication
            });

            if (updated) {
                res.json({ message: 'Employee metrics updated successfully' });
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getPerformanceSummary(req, res) {
        try {
            const summary = await EmployeeModel.getPerformanceSummary();
            res.json(summary);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = EmployeeController;