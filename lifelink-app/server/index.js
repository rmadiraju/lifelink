const express = require('express');
const cors = require('cors');

// Import data store
const {
    getVitals,
    updateVitals,
    getUser,
    updateUser,
    getRecords,
    updatePCP,
    addAppointment,
    updateMedicalRecordsAuth
} = require('../api/_data-store');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Vitals endpoints
app.get('/api/vitals', (req, res) => {
    try {
        const vitals = getVitals();
        res.json({
            success: true,
            data: vitals,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching vitals:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

app.post('/api/vitals', (req, res) => {
    try {
        const vitalsData = req.body;

        if (!vitalsData || typeof vitalsData !== 'object') {
            return res.status(400).json({
                success: false,
                error: 'Invalid vitals data'
            });
        }

        const updatedVitals = updateVitals(vitalsData);
        res.json({
            success: true,
            data: updatedVitals,
            message: 'Vitals updated successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating vitals:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

// User endpoints
app.get('/api/user', (req, res) => {
    try {
        const user = getUser();
        res.json({
            success: true,
            data: user,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

app.post('/api/user', (req, res) => {
    try {
        const userData = req.body;

        if (!userData || typeof userData !== 'object') {
            return res.status(400).json({
                success: false,
                error: 'Invalid user data'
            });
        }

        const updatedUser = updateUser(userData);
        res.json({
            success: true,
            data: updatedUser,
            message: 'User updated successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

// Update medical records ER authorization
app.post('/api/user/medical-records', (req, res) => {
    try {
        const { recordIds } = req.body;

        if (!Array.isArray(recordIds)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid record IDs'
            });
        }

        const updatedRecords = updateMedicalRecordsAuth(recordIds);
        res.json({
            success: true,
            data: updatedRecords,
            message: 'Medical records authorization updated',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating medical records:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

// Records endpoints
app.get('/api/records', (req, res) => {
    try {
        const records = getRecords();
        res.json({
            success: true,
            data: records,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

// Update Primary Care Physician
app.post('/api/records/pcp', (req, res) => {
    try {
        const pcpData = req.body;

        if (!pcpData || typeof pcpData !== 'object') {
            return res.status(400).json({
                success: false,
                error: 'Invalid PCP data'
            });
        }

        const updatedPCP = updatePCP(pcpData);
        res.json({
            success: true,
            data: updatedPCP,
            message: 'PCP updated successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating PCP:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

// Add new appointment
app.post('/api/records/appointments', (req, res) => {
    try {
        const appointmentData = req.body;

        if (!appointmentData || typeof appointmentData !== 'object') {
            return res.status(400).json({
                success: false,
                error: 'Invalid appointment data'
            });
        }

        const newAppointment = addAppointment(appointmentData);
        res.json({
            success: true,
            data: newAppointment,
            message: 'Appointment scheduled successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error adding appointment:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 LifeLink API Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api/*`);
    console.log(`💚 Health check: http://localhost:${PORT}/health\n`);
});
