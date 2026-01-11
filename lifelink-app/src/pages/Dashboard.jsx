import React from 'react';
import { Activity, Thermometer, Moon, Stethoscope, CloudRain, User } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [isChecking, setIsChecking] = React.useState(false);
    const [pulseStatus, setPulseStatus] = React.useState('Calculating...');
    const [lastChecked, setLastChecked] = React.useState('1 min ago');

    const handleCheckNow = () => {
        setIsChecking(true);
        setPulseStatus('Measuring...');
        setTimeout(() => {
            setIsChecking(false);
            setPulseStatus('Normal');
            setLastChecked('Just now');
        }, 2000);
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="page dashboard">
            <header className="dashboard-header">
                <div className="user-info">
                    <div className="avatar">
                        <User size={20} color="#fff" />
                    </div>
                    <div className="header-text">
                        <h2>Sabrina's LifeLink</h2>
                        <p className="date">{currentDate}</p>
                    </div>
                </div>
            </header>

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
                                    <span className="value">86 <small>bpm</small></span>
                                    <span className="label">{lastChecked}</span>

                                    {isChecking ? (
                                        <span className="status checking">{pulseStatus}</span>
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
                                    <span className="value">98.5°</span>
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
                                    <span className="value box">76</span>
                                    <span className="sub-label">36 hours ago</span>
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
                                        <span className="value highlight">121/78</span>
                                        <span className="unit">mmHg</span>
                                    </div>
                                    <span className="time-ago">42 min ago</span>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="stat-row full-width">
                            <div className="stat-item">
                                <div className="icon-wrapper big">
                                    <CloudRain size={32} color="#e6f1ff" /> {/* Using CloudRain as proxy for Oxygen/Lungs if needed, or stick to O2 text */}
                                </div>
                                <div className="stat-details">
                                    <span className="label">Oxygen Saturation</span>
                                    <div className="value-group">
                                        <span className="value highlight">97.5%</span>
                                    </div>
                                    <span className="time-ago">38 min ago</span>
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
