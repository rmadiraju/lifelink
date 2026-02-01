import React, { useState } from 'react';
import { Watch, Send, RotateCcw, Wifi, CheckCircle2, AlertCircle } from 'lucide-react';
import { vitalsApi } from '../services/api';
import './Simulator.css';

const Simulator = () => {
    const [vitals, setVitals] = useState({
        heartRate: 86,
        temperature: 98.5,
        sleepScore: 76,
        bloodPressure: {
            systolic: 121,
            diastolic: 78
        },
        oxygenSaturation: 97.5
    });

    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [lastSent, setLastSent] = useState(null);

    const handleInputChange = (field, value) => {
        if (field === 'systolic' || field === 'diastolic') {
            setVitals(prev => ({
                ...prev,
                bloodPressure: {
                    ...prev.bloodPressure,
                    [field]: parseFloat(value) || 0
                }
            }));
        } else {
            setVitals(prev => ({
                ...prev,
                [field]: parseFloat(value) || 0
            }));
        }
    };

    const handleSendData = async () => {
        setSending(true);
        setError(null);
        setSuccess(false);

        try {
            await vitalsApi.update(vitals);
            setSuccess(true);
            setLastSent(new Date().toLocaleTimeString());

            // Auto-hide success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error('Error sending vitals:', err);
            setError('Failed to send data to app. Please try again.');
        } finally {
            setSending(false);
        }
    };

    const handleReset = () => {
        setVitals({
            heartRate: 86,
            temperature: 98.5,
            sleepScore: 76,
            bloodPressure: {
                systolic: 121,
                diastolic: 78
            },
            oxygenSaturation: 97.5
        });
        setSuccess(false);
        setError(null);
    };

    return (
        <div className="page simulator">
            <div className="simulator-container">
                <header className="simulator-header">
                    <div className="watch-icon-large">
                        <Watch size={40} color="#64ffda" />
                    </div>
                    <h1>LifeLink Watch Simulator</h1>
                    <p className="subtitle">Demo Mode - Simulate Watch Data</p>
                </header>

                <div className="simulator-card">
                    <div className="connection-status">
                        <Wifi size={16} color="#64ffda" />
                        <span>Connected to LifeLink App</span>
                    </div>

                    {success && (
                        <div className="status-banner success">
                            <CheckCircle2 size={18} />
                            <span>Data sent successfully! Check the app to see updates.</span>
                        </div>
                    )}

                    {error && (
                        <div className="status-banner error">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="vitals-form">
                        <div className="form-section">
                            <h3>Basic Vitals</h3>

                            <div className="form-group">
                                <label htmlFor="heartRate">
                                    Heart Rate (bpm)
                                </label>
                                <input
                                    id="heartRate"
                                    type="number"
                                    value={vitals.heartRate}
                                    onChange={(e) => handleInputChange('heartRate', e.target.value)}
                                    min="40"
                                    max="200"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="temperature">
                                    Temperature (°F)
                                </label>
                                <input
                                    id="temperature"
                                    type="number"
                                    step="0.1"
                                    value={vitals.temperature}
                                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                                    min="95"
                                    max="105"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sleepScore">
                                    Sleep Score (0-100)
                                </label>
                                <input
                                    id="sleepScore"
                                    type="number"
                                    value={vitals.sleepScore}
                                    onChange={(e) => handleInputChange('sleepScore', e.target.value)}
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Cardiac Vitals</h3>

                            <div className="form-group-row">
                                <div className="form-group">
                                    <label htmlFor="systolic">
                                        Systolic (mmHg)
                                    </label>
                                    <input
                                        id="systolic"
                                        type="number"
                                        value={vitals.bloodPressure.systolic}
                                        onChange={(e) => handleInputChange('systolic', e.target.value)}
                                        min="70"
                                        max="200"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="diastolic">
                                        Diastolic (mmHg)
                                    </label>
                                    <input
                                        id="diastolic"
                                        type="number"
                                        value={vitals.bloodPressure.diastolic}
                                        onChange={(e) => handleInputChange('diastolic', e.target.value)}
                                        min="40"
                                        max="130"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="oxygenSaturation">
                                    Oxygen Saturation (%)
                                </label>
                                <input
                                    id="oxygenSaturation"
                                    type="number"
                                    step="0.1"
                                    value={vitals.oxygenSaturation}
                                    onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
                                    min="80"
                                    max="100"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            className="btn-send"
                            onClick={handleSendData}
                            disabled={sending}
                        >
                            {sending ? (
                                <>
                                    <div className="spinner"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send to App
                                </>
                            )}
                        </button>

                        <button
                            className="btn-reset"
                            onClick={handleReset}
                            disabled={sending}
                        >
                            <RotateCcw size={18} />
                            Reset Values
                        </button>
                    </div>

                    {lastSent && (
                        <div className="last-sent">
                            Last transmission: {lastSent}
                        </div>
                    )}
                </div>

                <div className="info-card">
                    <h4>How to Use:</h4>
                    <ol>
                        <li>Adjust the vital signs using the input fields above</li>
                        <li>Click "Send to App" to transmit data to the LifeLink app</li>
                        <li>Open the Dashboard on another device/tab to see the updated values</li>
                        <li>Values update in real-time to simulate a connected smartwatch</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Simulator;
