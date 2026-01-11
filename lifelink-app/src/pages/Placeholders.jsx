import React from 'react';

export const Records = () => (
    <div className="page" style={{ padding: '20px', paddingTop: '80px' }}>
        <h2>Medical Records</h2>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[1, 2, 3].map(i => (
                <div key={i} style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '15px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <h4 style={{ color: '#fff' }}>Lab Result #{100 + i}</h4>
                    <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>Jan {10 + i}, 2026</p>
                </div>
            ))}
        </div>
    </div>
);

export const Vitals = () => (
    <div className="page" style={{ padding: '20px', paddingTop: '80px', textAlign: 'center' }}>
        <h2>Live Monitor</h2>
        <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '4px solid #64ffda',
            margin: '40px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            fontWeight: 'bold'
        }}>
            86
        </div>
        <p>BPM</p>
    </div>
);

export const Settings = () => (
    <div className="page" style={{ padding: '20px', paddingTop: '80px' }}>
        <h2>Settings</h2>
        <p style={{ color: '#8892b0', marginTop: '10px' }}>App Version 1.0.0</p>
        <div style={{ marginTop: '30px' }}>
            <button style={{
                width: '100%',
                padding: '15px',
                background: '#1e3a8a',
                color: '#fff',
                border: 'none',
                borderRadius: '12px'
            }}>
                Sync Watch
            </button>
        </div>
    </div>
);
