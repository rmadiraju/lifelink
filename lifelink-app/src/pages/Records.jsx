import React, { useState, useEffect } from 'react';
import { User, CloudUpload, Calendar, Edit2, Save, X, Check, Plus } from 'lucide-react';
import { userApi } from '../services/api';
import './Records.css';

const Records = () => {
    const [pcp, setPcp] = useState({
        name: '',
        address: '',
        phone: '',
        hours: ''
    });

    const [appointments, setAppointments] = useState([]);
    const [isPcpEditing, setIsPcpEditing] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [newAppointment, setNewAppointment] = useState({
        doctor: '',
        specialty: '',
        date: '',
        time: '',
        location: ''
    });

    // Fetch records on mount
    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/records');
            const data = await response.json();

            if (data.success) {
                setPcp(data.data.primaryCarePhysician || {});
                setAppointments(data.data.appointments || []);
            }
        } catch (err) {
            console.error('Error fetching records:', err);
            setError('Failed to load records');
        } finally {
            setLoading(false);
        }
    };

    const handlePcpInputChange = (field, value) => {
        setPcp(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePcpSave = async () => {
        setSaving(true);
        setError(null);

        try {
            const response = await fetch('/api/records/pcp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pcp)
            });

            const data = await response.json();
            if (data.success) {
                setSaveSuccess(true);
                setIsPcpEditing(false);
                setTimeout(() => setSaveSuccess(false), 3000);
            }
        } catch (err) {
            console.error('Error saving PCP:', err);
            setError('Failed to save changes. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handlePcpCancel = () => {
        setIsPcpEditing(false);
        fetchRecords(); // Reset to original data
        setError(null);
    };

    const handleAppointmentInputChange = (field, value) => {
        setNewAppointment(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleScheduleAppointment = async () => {
        setSaving(true);
        setError(null);

        try {
            const response = await fetch('/api/records/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAppointment)
            });

            const data = await response.json();
            if (data.success) {
                setAppointments(prev => [...prev, data.data]);
                setIsScheduling(false);
                setNewAppointment({
                    doctor: '',
                    specialty: '',
                    date: '',
                    time: '',
                    location: ''
                });
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            }
        } catch (err) {
            console.error('Error scheduling appointment:', err);
            setError('Failed to schedule appointment. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="page records-page">
            <div className="records-header">
                <h2>Health Records</h2>
            </div>

            {saveSuccess && (
                <div className="success-banner">
                    <Check size={16} />
                    <span>Changes saved successfully!</span>
                </div>
            )}

            {error && (
                <div className="error-banner">
                    <X size={16} />
                    <span>{error}</span>
                </div>
            )}

            {/* Primary Care Physician */}
            <div className="record-card physician-card">
                <div className="card-header">
                    <User size={20} className="text-blue-400" />
                    <h3>Primary Care Physician</h3>
                    {!isPcpEditing && (
                        <button className="edit-icon-btn" onClick={() => setIsPcpEditing(true)}>
                            <Edit2 size={16} />
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="loading-text">Loading...</div>
                ) : isPcpEditing ? (
                    <div className="pcp-edit-form">
                        <div className="form-field">
                            <label>Doctor Name</label>
                            <input
                                type="text"
                                value={pcp.name}
                                onChange={(e) => handlePcpInputChange('name', e.target.value)}
                                placeholder="e.g., Dr. Emma Smith"
                            />
                        </div>
                        <div className="form-field">
                            <label>Address</label>
                            <input
                                type="text"
                                value={pcp.address}
                                onChange={(e) => handlePcpInputChange('address', e.target.value)}
                                placeholder="e.g., 1320 Riley Dr, Frisco, TX"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-field">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    value={pcp.phone}
                                    onChange={(e) => handlePcpInputChange('phone', e.target.value)}
                                    placeholder="(XXX) XXX-XXXX"
                                />
                            </div>
                            <div className="form-field">
                                <label>Hours</label>
                                <input
                                    type="text"
                                    value={pcp.hours}
                                    onChange={(e) => handlePcpInputChange('hours', e.target.value)}
                                    placeholder="e.g., 8am - 6pm"
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button className="btn-cancel-small" onClick={handlePcpCancel} disabled={saving}>
                                Cancel
                            </button>
                            <button className="btn-save-small" onClick={handlePcpSave} disabled={saving}>
                                {saving ? 'Saving...' : <><Save size={14} /> Save</>}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="physician-details">
                        <div className="avatar-large">
                            <User size={32} color="#fff" />
                        </div>
                        <div className="info-text">
                            <h4>{pcp.name || 'Not set'}</h4>
                            <p>{pcp.address || 'Address not set'}</p>
                            <p className="contact-info">{pcp.phone || 'Phone not set'} • {pcp.hours || 'Hours not set'}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="record-split-row">
                {/* Prescriptions */}
                <div className="record-card prescriptions-card">
                    <div className="card-header">
                        <CloudUpload size={20} />
                        <h3>Prescriptions</h3>
                    </div>
                    <div className="action-buttons">
                        <button className="action-btn">
                            <CloudUpload size={18} />
                            <span>Upload</span>
                        </button>
                        <button className="action-btn outline">
                            <span>Type Manual</span>
                        </button>
                    </div>
                </div>

                {/* Appointments */}
                <div className="record-card appointments-card">
                    <div className="card-header">
                        <Calendar size={20} />
                        <h3>Appointments</h3>
                    </div>

                    {!isScheduling ? (
                        <>
                            <div className="appointments-list-compact">
                                {appointments.slice(0, 2).map((appt, index) => {
                                    const dateStr = new Date(appt.date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    });

                                    // Convert 24-hour time to 12-hour with AM/PM
                                    const [hours, minutes] = appt.time.split(':');
                                    const hour = parseInt(hours);
                                    const ampm = hour >= 12 ? 'pm' : 'am';
                                    const displayHour = hour % 12 || 12;
                                    const timeStr = `${displayHour}:${minutes} ${ampm}`;

                                    return (
                                        <div key={appt.id || index} className="appt-item">
                                            <span className="date">{dateStr}</span>
                                            <span className="time">{timeStr}</span>
                                        </div>
                                    );
                                })}
                                {appointments.length === 0 && (
                                    <p className="no-appointments">No upcoming appointments</p>
                                )}
                            </div>
                            <button className="schedule-btn-small" onClick={() => setIsScheduling(true)}>
                                <Plus size={16} /> Schedule New
                            </button>
                        </>
                    ) : (
                        <div className="appointment-form">
                            <div className="form-field-compact">
                                <input
                                    type="text"
                                    value={newAppointment.doctor}
                                    onChange={(e) => handleAppointmentInputChange('doctor', e.target.value)}
                                    placeholder="Doctor name"
                                />
                            </div>
                            <div className="form-field-compact">
                                <input
                                    type="text"
                                    value={newAppointment.specialty}
                                    onChange={(e) => handleAppointmentInputChange('specialty', e.target.value)}
                                    placeholder="Specialty"
                                />
                            </div>
                            <div className="form-row-compact">
                                <input
                                    type="date"
                                    value={newAppointment.date}
                                    onChange={(e) => handleAppointmentInputChange('date', e.target.value)}
                                />
                                <input
                                    type="time"
                                    value={newAppointment.time}
                                    onChange={(e) => handleAppointmentInputChange('time', e.target.value)}
                                />
                            </div>
                            <div className="form-field-compact">
                                <input
                                    type="text"
                                    value={newAppointment.location}
                                    onChange={(e) => handleAppointmentInputChange('location', e.target.value)}
                                    placeholder="Location"
                                />
                            </div>
                            <div className="form-actions-compact">
                                <button className="btn-cancel-tiny" onClick={() => setIsScheduling(false)} disabled={saving}>
                                    Cancel
                                </button>
                                <button className="btn-save-tiny" onClick={handleScheduleAppointment} disabled={saving}>
                                    {saving ? 'Saving...' : 'Schedule'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Records;
