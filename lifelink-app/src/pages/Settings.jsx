import React, { useState, useEffect } from 'react';
import { User, Save, X, Check, Bell, Globe, RotateCcw, Shield, Share2, FileText, Users, Clock, Siren, Activity, Settings as SettingsIcon, ChevronRight, ChevronLeft } from 'lucide-react';
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
    const [showMedicalRecords, setShowMedicalRecords] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showShareConfirm, setShowShareConfirm] = useState(false);
    const [pendingShare, setPendingShare] = useState(null);
    const [showGeneralSettings, setShowGeneralSettings] = useState(false);

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
                dateOfBirth: userData.dateOfBirth || '',
                medicalRecords: userData.medicalRecords || []
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

    const handleToggleERShare = (record) => {
        setPendingShare(record);
        setShowShareConfirm(true);
    };

    const confirmERShare = async () => {
        if (!pendingShare) return;

        setSaving(true);
        setError(null);

        try {
            // Toggle the share status
            const updatedRecords = userProfile.medicalRecords.map(record =>
                record.id === pendingShare.id
                    ? { ...record, sharedWithER: !record.sharedWithER }
                    : record
            );

            setUserProfile(prev => ({
                ...prev,
                medicalRecords: updatedRecords
            }));

            // Get IDs of all shared records
            const sharedRecordIds = updatedRecords
                .filter(record => record.sharedWithER)
                .map(record => record.id);

            // Save to API
            const response = await fetch('/api/user/medical-records', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recordIds: sharedRecordIds })
            });

            const data = await response.json();
            if (data.success) {
                setShowShareConfirm(false);
                setPendingShare(null);
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 2000);
            }
        } catch (err) {
            console.error('Error updating ER sharing:', err);
            setError('Failed to update sharing. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const displayName = userProfile.firstName && userProfile.lastName
        ? `${userProfile.firstName} ${userProfile.lastName} `
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
                    <li onClick={() => setShowGeneralSettings(true)}>
                        <SettingsIcon size={18} /> General
                    </li>
                    <li><Bell size={18} /> Notifications</li>
                    <li><Globe size={18} /> Languages</li>
                    <li><RotateCcw size={18} /> Manage all history</li>
                    <li><Shield size={18} /> Privacy</li>
                    <li><Share2 size={18} /> Shared data</li>
                </ul>
            </section>

            <div className="divider"></div>

            {/* Emergency Access Section */}
            <section className="settings-section">
                <h3>Emergency Access</h3>
                <ul className="settings-list">
                    <li onClick={() => setShowMedicalRecords(true)}><FileText size={18} /> Medical Records</li>
                    <li><Users size={18} /> Contacts</li>
                    <li><Clock size={18} /> Time available</li>
                    <li><Siren size={18} /> ER History</li>
                    <li><Activity size={18} /> Diagnoses</li>
                </ul>
            </section>

            {/* General Settings Modal */}
            {showGeneralSettings && (
                <div className="modal-overlay" onClick={() => setShowGeneralSettings(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>General Settings</h3>
                            <button className="close-btn" onClick={() => setShowGeneralSettings(false)}>
                                <X size={20} />
                            </button>
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
                    </div>
                </div>
            )}

            {/* Medical Records Modal */}
            {showMedicalRecords && !selectedRecord && (
                <div className="modal-overlay" onClick={() => setShowMedicalRecords(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Medical Records</h3>
                            <button className="close-btn" onClick={() => setShowMedicalRecords(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="records-list">
                            {userProfile.medicalRecords && userProfile.medicalRecords.length > 0 ? (
                                userProfile.medicalRecords.map((record) => (
                                    <div key={record.id} className="record-item-new">
                                        <div className="record-left" onClick={() => setSelectedRecord(record.id)}>
                                            <FileText size={20} className="record-icon" />
                                            <div className="record-info">
                                                <h4>{record.title}</h4>
                                                <p>{new Date(record.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                        <button
                                            className={`share-btn ${record.sharedWithER ? 'shared' : ''}`}
                                            onClick={() => handleToggleERShare(record)}
                                            title={record.sharedWithER ? 'Shared with ER' : 'Share with ER'}
                                        >
                                            <Share2 size={18} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="no-records">No medical records available</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Share Confirmation Dialog */}
            {showShareConfirm && (
                <div className="modal-overlay" onClick={() => setShowShareConfirm(false)}>
                    <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{pendingShare?.sharedWithER ? 'Remove ER Access?' : 'Share with ER?'}</h3>
                        </div>
                        <div className="confirm-content">
                            <p>
                                {pendingShare?.sharedWithER
                                    ? `Remove "${pendingShare?.title}" from ER access?`
                                    : `Allow ER doctors to access "${pendingShare?.title}" during emergency visits?`
                                }
                            </p>
                        </div>
                        <div className="confirm-actions">
                            <button className="btn-cancel-confirm" onClick={() => setShowShareConfirm(false)}>
                                Cancel
                            </button>
                            <button className="btn-confirm" onClick={confirmERShare}>
                                {pendingShare?.sharedWithER ? 'Remove Access' : 'Share'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* General Settings Modal */}
            {showGeneralSettings && (
                <div className="modal-overlay" onClick={() => setShowGeneralSettings(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Profile Settings</h3>
                            <button className="close-btn" onClick={() => setShowGeneralSettings(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        {saveSuccess && (
                            <div className="success-message-small">
                                <Check size={14} />
                                <span>Profile updated successfully!</span>
                            </div>
                        )}
                        {error && (
                            <div className="error-message-small">
                                {error}
                            </div>
                        )}

                        <div className="modal-form">
                            <div className="form-row">
                                <div className="form-field">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        value={userProfile.firstName}
                                        onChange={(e) => setUserProfile({ ...userProfile, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        value={userProfile.lastName}
                                        onChange={(e) => setUserProfile({ ...userProfile, lastName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Gender</label>
                                <input
                                    type="text"
                                    value={userProfile.gender}
                                    onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value })}
                                />
                            </div>
                            <div className="form-field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={userProfile.email}
                                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                />
                            </div>
                            <div className="form-field">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    value={userProfile.dateOfBirth}
                                    onChange={(e) => setUserProfile({ ...userProfile, dateOfBirth: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-cancel-confirm" onClick={() => {
                                fetchUserData();
                                setShowGeneralSettings(false);
                                setError(null);
                            }}>
                                Cancel
                            </button>
                            <button className="btn-confirm" onClick={async () => {
                                await handleSave();
                                if (!error) {
                                    setTimeout(() => setShowGeneralSettings(false), 1500);
                                }
                            }} disabled={saving}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Medical Record Viewer */}
            {selectedRecord && (
                <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
                    <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <button className="back-btn" onClick={() => setSelectedRecord(null)}>
                                <ChevronLeft size={20} /> Back
                            </button>
                            <div className="viewer-actions">
                                <button
                                    className={`share-btn-viewer ${userProfile.medicalRecords?.find(r => r.id === selectedRecord)?.sharedWithER ? 'shared' : ''
                                        }`}
                                    onClick={() => {
                                        const record = userProfile.medicalRecords?.find(r => r.id === selectedRecord);
                                        if (record) handleToggleERShare(record);
                                    }}
                                    title={
                                        userProfile.medicalRecords?.find(r => r.id === selectedRecord)?.sharedWithER
                                            ? 'Shared with ER - Click to remove'
                                            : 'Share with ER'
                                    }
                                >
                                    <Share2 size={18} />
                                </button>
                                <button className="close-btn" onClick={() => {
                                    setSelectedRecord(null);
                                    setShowMedicalRecords(false);
                                }}>
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="record-viewer">
                            <img
                                src="/src/assets/sample-medical-record.png"
                                alt="Medical Record"
                                className="medical-record-image"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="emergency-btn-container">
                <button className="emergency-911-btn">911</button>
            </div>
        </div>
    );
};

export default Settings;
