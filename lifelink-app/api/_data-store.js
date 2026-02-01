// In-memory data store for demo purposes
// Data will persist during the server session

let dataStore = {
    user: {
        firstName: "Sabrina",
        lastName: "Johnson",
        gender: "Female",
        email: "sabrina.johnson@example.com",
        dateOfBirth: "2008-05-15",
        lastUpdated: new Date().toISOString()
    },
    vitals: {
        heartRate: {
            value: 86,
            unit: "bpm",
            status: "Normal",
            lastUpdated: new Date(Date.now() - 60000).toISOString(), // 1 min ago
            lastChecked: "1 min ago"
        },
        temperature: {
            value: 98.5,
            unit: "°F",
            lastUpdated: new Date(Date.now() - 60000).toISOString()
        },
        sleepScore: {
            value: 76,
            lastUpdated: new Date(Date.now() - 129600000).toISOString(), // 36 hours ago
            lastCheckedText: "36 hours ago"
        },
        bloodPressure: {
            systolic: 121,
            diastolic: 78,
            unit: "mmHg",
            lastUpdated: new Date(Date.now() - 2520000).toISOString(), // 42 min ago
            lastCheckedText: "42 min ago"
        },
        oxygenSaturation: {
            value: 97.5,
            unit: "%",
            lastUpdated: new Date(Date.now() - 2280000).toISOString(), // 38 min ago
            lastCheckedText: "38 min ago"
        }
    },
    records: {
        prescriptions: [
            {
                id: 1,
                name: "Aspirin",
                dosage: "81mg",
                frequency: "Daily",
                prescribedBy: "Dr. Smith",
                date: "2026-01-15"
            }
        ],
        appointments: [
            {
                id: 1,
                doctor: "Dr. Johnson",
                specialty: "Cardiology",
                date: "2026-02-05",
                time: "10:00 AM",
                location: "Heart Center"
            },
            {
                id: 2,
                doctor: "Dr. Williams",
                specialty: "General Practice",
                date: "2026-02-12",
                time: "2:30 PM",
                location: "Main Clinic"
            }
        ]
    }
};

// Get all data
const getData = () => dataStore;

// Get user data
const getUser = () => dataStore.user;

// Update user data
const updateUser = (userData) => {
    dataStore.user = {
        ...dataStore.user,
        ...userData,
        lastUpdated: new Date().toISOString()
    };
    return dataStore.user;
};

// Get vitals data
const getVitals = () => dataStore.vitals;

// Update vitals data
const updateVitals = (vitalsData) => {
    const now = new Date();

    // Update each vital if provided
    if (vitalsData.heartRate !== undefined) {
        dataStore.vitals.heartRate = {
            ...dataStore.vitals.heartRate,
            value: vitalsData.heartRate,
            lastUpdated: now.toISOString(),
            lastChecked: "Just now"
        };
    }

    if (vitalsData.temperature !== undefined) {
        dataStore.vitals.temperature = {
            ...dataStore.vitals.temperature,
            value: vitalsData.temperature,
            lastUpdated: now.toISOString()
        };
    }

    if (vitalsData.sleepScore !== undefined) {
        dataStore.vitals.sleepScore = {
            ...dataStore.vitals.sleepScore,
            value: vitalsData.sleepScore,
            lastUpdated: now.toISOString(),
            lastCheckedText: "Just now"
        };
    }

    if (vitalsData.bloodPressure !== undefined) {
        dataStore.vitals.bloodPressure = {
            ...dataStore.vitals.bloodPressure,
            systolic: vitalsData.bloodPressure.systolic,
            diastolic: vitalsData.bloodPressure.diastolic,
            lastUpdated: now.toISOString(),
            lastCheckedText: "Just now"
        };
    }

    if (vitalsData.oxygenSaturation !== undefined) {
        dataStore.vitals.oxygenSaturation = {
            ...dataStore.vitals.oxygenSaturation,
            value: vitalsData.oxygenSaturation,
            lastUpdated: now.toISOString(),
            lastCheckedText: "Just now"
        };
    }

    return dataStore.vitals;
};

// Get records data
const getRecords = () => dataStore.records;

// Reset to default data
const resetData = () => {
    dataStore = {
        user: {
            firstName: "Sabrina",
            lastName: "Johnson",
            gender: "Female",
            email: "sabrina.johnson@example.com",
            dateOfBirth: "2008-05-15",
            lastUpdated: new Date().toISOString()
        },
        vitals: {
            heartRate: {
                value: 86,
                unit: "bpm",
                status: "Normal",
                lastUpdated: new Date(Date.now() - 60000).toISOString(),
                lastChecked: "1 min ago"
            },
            temperature: {
                value: 98.5,
                unit: "°F",
                lastUpdated: new Date(Date.now() - 60000).toISOString()
            },
            sleepScore: {
                value: 76,
                lastUpdated: new Date(Date.now() - 129600000).toISOString(),
                lastCheckedText: "36 hours ago"
            },
            bloodPressure: {
                systolic: 121,
                diastolic: 78,
                unit: "mmHg",
                lastUpdated: new Date(Date.now() - 2520000).toISOString(),
                lastCheckedText: "42 min ago"
            },
            oxygenSaturation: {
                value: 97.5,
                unit: "%",
                lastUpdated: new Date(Date.now() - 2280000).toISOString(),
                lastCheckedText: "38 min ago"
            }
        },
        records: {
            prescriptions: [],
            appointments: []
        }
    };
    return dataStore;
};

// CommonJS exports for Node.js
module.exports = {
    getData,
    getUser,
    updateUser,
    getVitals,
    updateVitals,
    getRecords,
    resetData
};
