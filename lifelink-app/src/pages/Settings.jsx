import React from 'react';
import { User, Settings as SettingsIcon, Bell, Globe, RotateCcw, Shield, Share2, FileText, Users, Clock, Siren, Activity } from 'lucide-react';
import './Settings.css';

const Settings = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="page settings-page">
            <header className="settings-header">
                <div className="user-icon">
                    <User size={24} color="#fff" />
                </div>
                <div className="header-info">
                    <h3>Sabrina's LifeLink</h3>
                    <p>{currentDate}</p>
                </div>
            </header>

            <div className="divider"></div>

            <section className="settings-section">
                <h3>Account</h3>
                <ul className="settings-list">
                    <li><SettingsIcon size={18} /> General</li>
                    <li><Bell size={18} /> Notifications</li>
                    <li><Globe size={18} /> Languages</li>
                    <li><RotateCcw size={18} /> Manage all history</li>
                    <li><Shield size={18} /> Privacy</li>
                    <li><Share2 size={18} /> Shared data</li>
                </ul>
            </section>

            <div className="divider"></div>

            <section className="settings-section">
                <h3>Emergency Access</h3>
                <ul className="settings-list">
                    <li><FileText size={18} /> Medical Records</li>
                    <li><Users size={18} /> Contacts</li>
                    <li><Clock size={18} /> Time available</li>
                    <li><Siren size={18} /> ER History</li>
                    <li><Activity size={18} /> Diagnoses</li>
                </ul>
            </section>

            <div className="emergency-btn-container">
                <button className="emergency-911-btn">911</button>
            </div>
        </div>
    );
};

export default Settings;
