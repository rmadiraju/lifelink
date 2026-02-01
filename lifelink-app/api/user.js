import { getUser, updateUser } from './_data-store.js';

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'GET') {
            // Get user info
            const user = getUser();
            res.status(200).json({
                success: true,
                data: user,
                timestamp: new Date().toISOString()
            });
        } else if (req.method === 'POST') {
            // Update user info
            const userData = req.body;

            // Validate input
            if (!userData || typeof userData !== 'object') {
                res.status(400).json({
                    success: false,
                    error: 'Invalid user data'
                });
                return;
            }

            const updatedUser = updateUser(userData);
            res.status(200).json({
                success: true,
                data: updatedUser,
                message: 'User updated successfully',
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(405).json({
                success: false,
                error: 'Method not allowed'
            });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
}
