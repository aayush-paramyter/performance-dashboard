// backend/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');

// GET all employees
router.get('/employees', EmployeeController.getAllEmployees);

// UPDATE employee metrics
router.put('/employees/:id', EmployeeController.updateEmployeeMetrics);

// GET performance summary
router.get('/performance-summary', EmployeeController.getPerformanceSummary);

module.exports = router;