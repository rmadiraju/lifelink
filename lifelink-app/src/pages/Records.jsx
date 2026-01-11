import React from 'react';
import { User, CloudUpload, Calendar } from 'lucide-react';
import './Records.css';

const Records = () => {
    const appointments = [
        { date: 'January 23, 2026', time: '11:00 am' },
        { date: 'February 5, 2026', time: '2:00 pm' },
        { date: 'February 19, 2026', time: '4:30 pm' },
        { date: 'March 5, 2026', time: '11:30 am' },
    ];

    return (
        <div className="page records-page">
            <div className="records-header">
                <h2>Health Records</h2>
            </div>

            <div className="record-card physician-card">
                <div className="card-header">
                    <User size={20} className="text-blue-400" />
                    <h3>Primary Care Physician</h3>
                </div>
                <div className="physician-details">
                    <div className="avatar-large">
                        <User size={32} color="#fff" />
                    </div>
                    <div className="info-text">
                        <h4>Dr. Emma Smith</h4>
                        <p>1320 Riley Dr, Frisco, TX</p>
                        <p className="contact-info">(341) 908-2348 • 8am - 6pm</p>
                    </div>
                </div>
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
                    <div className="appointments-list-compact">
                        {appointments.slice(0, 2).map((appt, index) => (
                            <div key={index} className="appt-item">
                                <span className="date">{appt.date}</span>
                                <span className="time">{appt.time}</span>
                            </div>
                        ))}
                    </div>
                    <button className="schedule-btn-small">Schedule New</button>
                </div>
            </div>
        </div>
    );
};

export default Records;
