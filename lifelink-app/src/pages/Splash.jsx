import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Watch, Activity } from 'lucide-react';
import './Splash.css';

const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-screen">
            <div className="logo-container">
                <div className="heart-wrapper">
                    <Heart size={100} color="#64ffda" fill="none" strokeWidth={1.5} />
                    <div className="pulse-line">
                        <Activity size={60} color="#64ffda" strokeWidth={2} />
                    </div>
                    <div className="watch-icon">
                        <Watch size={40} color="#e6f1ff" strokeWidth={2} />
                    </div>
                </div>
                <h1 className="app-title">LifeLink</h1>
            </div>
            <p className="tagline">EVERY SECOND MATTERS...</p>
        </div>
    );
};

export default Splash;
