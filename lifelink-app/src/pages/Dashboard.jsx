import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Moon, Stethoscope, CloudRain, User } from 'lucide-react';
import { vitalsApi, userApi } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [vitals, setVitals] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    // Fetch data from API
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [vitalsData, userData] = await Promise.all([
                vitalsApi.fetch(),
                userApi.fetch()
            ]);
            setVitals(vitalsData);
            setUser(userData);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load vitals data. Using demo mode.');
            // Set fallback data for demo purposes
            setVitals({
                heartRate: { value: 86, unit: 'bpm', status: 'Normal', lastChecked: '1 min ago' },
                temperature: { value: 98.5, unit: '°F' },
                sleepScore: { value: 76, lastCheckedText: '36 hours ago' },
                bloodPressure: { systolic: 121, diastolic: 78, unit: 'mmHg', lastCheckedText: '42 min ago' },
                oxygenSaturation: { value: 97.5, unit: '%', lastCheckedText: '38 min ago' }
            });
            setUser({ name: 'Sabrina' });
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on mount
    useEffect(() => {
        fetchData();

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleCheckNow = async () => {
        setIsChecking(true);

        // Simulate checking and then refresh data
        setTimeout(async () => {
            await fetchData();
            setIsChecking(false);
        }, 2000);
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    if (loading && !vitals) {
        return (
            <div className="page dashboard">
                <div className="loading-container">
                    <Activity size={48} color="#64ffda" className="animate-pulse" />
                    <p>Loading vitals...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page dashboard">
            <header className="dashboard-header">
                <div className="user-info">
                    <div className="avatar">
                        <User size={20} color="#fff" />
                    </div>
                    <div className="header-text">
                        <h2>{user?.firstName || 'User'}'s LifeLink</h2>
                        <p className="date">{currentDate}</p>
                    </div>
                </div>
            </header>

            {error && (
                <div className="error-banner">
                    {error}
                </div>
            )}

            <div className="scroll-content">
                {/* Basic Vitals Section */}
                <section className="vitals-section">
                    <div className="section-title">
                        <h3>Basic Vitals</h3>
                        <div className="line"></div>
                    </div>

                    <div className="card basic-card">
                        <div className="stat-row">
                            <div className="stat-item pulse">
                                <div className="icon-wrapper">
                                    <Activity size={24} color="#64ffda" className={isChecking ? 'animate-pulse' : ''} />
                                </div>
                                <div className="stat-details">
                                    <span className="value">{vitals?.heartRate?.value || '--'} <small>{vitals?.heartRate?.unit || 'bpm'}</small></span>
                                    <span className="label">{vitals?.heartRate?.lastChecked || 'N/A'}</span>

                                    {isChecking ? (
                                        <span className="status checking">Measuring...</span>
                                    ) : (
                                        <button className="check-now-btn" onClick={handleCheckNow}>
                                            Check Now
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="stat-item">
                                <div className="icon-wrapper">
                                    <Thermometer size={24} color="#64ffda" />
                                </div>
                                <div className="stat-details">
                                    <span className="label">Temperature</span>
                                    <span className="value">{vitals?.temperature?.value || '--'}{vitals?.temperature?.unit || '°'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="stat-row mt-3">
                            <div className="stat-item">
                                <div className="icon-wrapper">
                                    <Moon size={24} color="#64ffda" />
                                </div>
                                <div className="stat-details">
                                    <span className="label">Sleep Score</span>
                                    <span className="value box">{vitals?.sleepScore?.value || '--'}</span>
                                    <span className="sub-label">{vitals?.sleepScore?.lastCheckedText || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cardiac Vitals Section */}
                <section className="vitals-section">
                    <div className="section-title">
                        <h3>Cardiac Vitals</h3>
                        <div className="line"></div>
                    </div>

                    <div className="card cardiac-card">
                        <div className="stat-row full-width">
                            <div className="stat-item">
                                <div className="icon-wrapper big">
                                    <Stethoscope size={32} color="#e6f1ff" />
                                </div>
                                <div className="stat-details">
                                    <span className="label">Blood Pressure</span>
                                    <div className="value-group">
                                        <span className="value highlight">
                                            {vitals?.bloodPressure?.systolic || '--'}/{vitals?.bloodPressure?.diastolic || '--'}
                                        </span>
                                        <span className="unit">{vitals?.bloodPressure?.unit || 'mmHg'}</span>
                                    </div>
                                    <span className="time-ago">{vitals?.bloodPressure?.lastCheckedText || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="stat-row full-width">
                            <div className="stat-item">
                                <div className="icon-wrapper big">
                                    <CloudRain size={32} color="#e6f1ff" />
                                </div>
                                <div className="stat-details">
                                    <span className="label">Oxygen Saturation</span>
                                    <div className="value-group">
                                        <span className="value highlight">{vitals?.oxygenSaturation?.value || '--'}{vitals?.oxygenSaturation?.unit || '%'}</span>
                                    </div>
                                    <span className="time-ago">{vitals?.oxygenSaturation?.lastCheckedText || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
