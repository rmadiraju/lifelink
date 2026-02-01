import React, { useState, useEffect } from 'react';
import { User, Save, X, Check, Bell, Globe, RotateCcw, Shield, Share2, FileText, Users, Clock, Siren, Activity, Settings as SettingsIcon } from 'lucide-react';
import { userApi } from '../services/api';
import './Settings.css';

const Settings = () => {
    const [userProfile, setUserProfile] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        dateOfBirth: ''
    });

    const [isGeneralExpanded, setIsGeneralExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Fetch user data on mount
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const userData = await userApi.fetch();
            setUserProfile({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                gender: userData.gender || '',
                email: userData.email || '',
                dateOfBirth: userData.dateOfBirth || ''
            });
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError('Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setUserProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSaveSuccess(false);

        try {
            await userApi.update(userProfile);
            setSaveSuccess(true);
            setIsEditing(false);

            // Hide success message after 3 seconds
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            console.error('Error saving user data:', err);
            setError('Failed to save changes. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsGeneralExpanded(false);
        fetchUserData(); // Reset to original data
        setError(null);
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const displayName = userProfile.firstName && userProfile.lastName
        ? `${userProfile.firstName} ${userProfile.lastName}`
        : userProfile.firstName || 'User';

    return (
        <div className="page settings-page">
            <header className="settings-header">
                <div className="user-icon">
                    <User size={24} color="#fff" />
                </div>
                <div className="header-info">
                    <h3>{displayName}'s LifeLink</h3>
                    <p>{currentDate}</p>
                </div>
            </header>

            <div className="divider"></div>

            {/* Account Section */}
            <section className="settings-section">
                <h3>Account</h3>
                <ul className="settings-list">
                    <li onClick={() => setIsGeneralExpanded(!isGeneralExpanded)}>
                        <SettingsIcon size={18} /> General
                    </li>
                    <li><Bell size={18} /> Notifications</li>
                    <li><Globe size={18} /> Languages</li>
                    <li><RotateCcw size={18} /> Manage all history</li>
                    <li><Shield size={18} /> Privacy</li>
                    <li><Share2 size={18} /> Shared data</li>
                </ul>
            </section>

            {/* Expanded General Settings */}
            {isGeneralExpanded && (
                <>
                    <div className="divider"></div>
                    <section className="settings-section">
                        <div className="section-header">
                            <h3>General</h3>
                            {!isEditing && (
                                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                    Edit
                                </button>
                            )}
                        </div>

                        {saveSuccess && (
                            <div className="success-message">
                                <Check size={16} />
                                <span>Profile updated successfully!</span>
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                <X size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        {loading ? (
                            <div className="loading-text">Loading...</div>
                        ) : (
                            <div className="profile-form">
                                <div className="form-row">
                                    <div className="form-field">
                                        <label>First Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={userProfile.firstName}
                                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                placeholder="Enter first name"
                                            />
                                        ) : (
                                            <div className="field-value">{userProfile.firstName || 'Not set'}</div>
                                        )}
                                    </div>

                                    <div className="form-field">
                                        <label>Last Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={userProfile.lastName}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                placeholder="Enter last name"
                                            />
                                        ) : (
                                            <div className="field-value">{userProfile.lastName || 'Not set'}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Gender</label>
                                    {isEditing ? (
                                        <select
                                            value={userProfile.gender}
                                            onChange={(e) => handleInputChange('gender', e.target.value)}
                                        >
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                            <option value="Prefer not to say">Prefer not to say</option>
                                        </select>
                                    ) : (
                                        <div className="field-value">{userProfile.gender || 'Not set'}</div>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label>Email</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={userProfile.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="Enter email address"
                                        />
                                    ) : (
                                        <div className="field-value">{userProfile.email || 'Not set'}</div>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label>Date of Birth</label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            value={userProfile.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                        />
                                    ) : (
                                        <div className="field-value">
                                            {userProfile.dateOfBirth
                                                ? new Date(userProfile.dateOfBirth).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : 'Not set'}
                                        </div>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="form-actions">
                                        <button
                                            className="btn-cancel"
                                            onClick={handleCancel}
                                            disabled={saving}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn-save"
                                            onClick={handleSave}
                                            disabled={saving}
                                        >
                                            {saving ? (
                                                <>
                                                    <div className="spinner-small"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={16} />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </>
            )}

            <div className="divider"></div>

            {/* Emergency Access Section */}
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
