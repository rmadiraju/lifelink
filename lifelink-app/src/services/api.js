// API Service Layer for LifeLink App
// Handles all API communication with the backend

// Determine API base URL based on environment
const getApiBaseUrl = () => {
    // In development, use Vite dev server proxy or localhost
    if (import.meta.env.DEV) {
        return ''; // Use relative URLs, Vite will proxy /api/* requests
    }
    // In production, use the deployed Vercel URL
    return import.meta.env.VITE_API_URL || '';
};

const API_BASE_URL = getApiBaseUrl();

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
};

// Vitals API
export const vitalsApi = {
    // Fetch current vitals
    fetch: async () => {
        const response = await apiRequest('/api/vitals', {
            method: 'GET',
        });
        return response.data;
    },

    // Update vitals (from watch simulator)
    update: async (vitalsData) => {
        const response = await apiRequest('/api/vitals', {
            method: 'POST',
            body: JSON.stringify(vitalsData),
        });
        return response.data;
    },
};

// User API
export const userApi = {
    // Fetch user info
    fetch: async () => {
        const response = await apiRequest('/api/user', {
            method: 'GET',
        });
        return response.data;
    },

    // Update user info
    update: async (userData) => {
        const response = await apiRequest('/api/user', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        return response.data;
    },
};

// Records API
export const recordsApi = {
    // Fetch prescriptions and appointments
    fetch: async () => {
        const response = await apiRequest('/api/records', {
            method: 'GET',
        });
        return response.data;
    },
};

// Convenience function to fetch all data at once
export const fetchAllData = async () => {
    try {
        const [vitals, user, records] = await Promise.all([
            vitalsApi.fetch(),
            userApi.fetch(),
            recordsApi.fetch(),
        ]);

        return {
            vitals,
            user,
            records,
        };
    } catch (error) {
        console.error('Error fetching all data:', error);
        throw error;
    }
};

export default {
    vitals: vitalsApi,
    user: userApi,
    records: recordsApi,
    fetchAll: fetchAllData,
};
