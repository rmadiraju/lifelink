const express = require('express');
const cors = require('cors');

// Import data store
const {
    getVitals,
    updateVitals,
    getUser,
    updateUser,
    getRecords
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

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 LifeLink API Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api/*`);
    console.log(`💚 Health check: http://localhost:${PORT}/health\n`);
});
