// backend/server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoutes');
const EmployeeModel = require('./models/employeeModel');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', employeeRoutes);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle employee metric updates
    socket.on('update_employee_metrics', async (data) => {
        try {
            await EmployeeModel.updateEmployeeMetrics(data.id, {
                productivity: data.productivity,
                collaboration: data.collaboration,
                communication: data.communication
            });

            // Broadcast updated performance summary
            const summary = await EmployeeModel.getPerformanceSummary();
            io.emit('performance_summary_updated', summary);

            // Broadcast updated employees list
            const employees = await EmployeeModel.getAllEmployees();
            io.emit('employees_updated', employees);
        } catch (error) {
            socket.emit('error', { message: error.message });
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});