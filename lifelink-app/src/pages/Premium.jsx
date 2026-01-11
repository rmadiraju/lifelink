import React from 'react';
import { Watch, Award, Droplet, Moon, Zap } from 'lucide-react';
import './Premium.css';

const Premium = () => {
    return (
        <div className="page premium-page">
            <div className="premium-header">
                <h2>Premium Features</h2>
            </div>

            {/* Customization Grid */}
            <div className="premium-grid-row">
                <div className="compact-card">
                    <div className="card-header">
                        <Watch size={20} />
                        <h4>Straps</h4>
                    </div>
                    <div className="tag-cloud">
                        <span>Leather</span>
                        <span>Silicone</span>
                        <span>Eco</span>
                        <span>Metal</span>
                    </div>
                </div>

                <div className="compact-card">
                    <div className="card-header">
                        <Droplet size={20} />
                        <h4>Themes</h4>
                    </div>
                    <div className="tag-cloud">
                        <span>Classic</span>
                        <span>Blue</span>
                        <span>Pink</span>
                        <span>Sage</span>
                    </div>
                </div>
            </div>

            {/* Reward System */}
            <div className="reward-banner">
                <div className="reward-content">
                    <Award size={24} color="#ffd700" />
                    <div className="reward-text">
                        <span className="points">86 Points</span>
                        <small>700 to Next Reward</small>
                    </div>
                </div>
                <div className="reward-progress">
                    <div className="progress-bar" style={{ width: '12%' }}></div>
                </div>
            </div>

            {/* Smart Recommendations */}
            <section className="section recommendations-section">
                <div className="section-title-wrap">
                    <h3 className="bubble-title">Smart Recommendations</h3>
                </div>
                <div className="recommendations-list">
                    <div className="recommendation-card hydration">
                        <div className="rec-icon"><Droplet size={24} /></div>
                        <div className="rec-content">
                            <h4>Hydration Alert</h4>
                            <p>You're 200ml behind your daily goal. Drink a glass of water now!</p>
                        </div>
                    </div>
                    <div className="recommendation-card sleep">
                        <div className="rec-icon"><Moon size={24} /></div>
                        <div className="rec-content">
                            <h4>Sleep Quality</h4>
                            <p>Excellent recovery! You are ready for meaningful deep work today.</p>
                        </div>
                    </div>
                    <div className="recommendation-card stress">
                        <div className="rec-icon"><Zap size={24} /></div>
                        <div className="rec-content">
                            <h4>Stress Level</h4>
                            <p>HRV is slightly low. Consider a 5-minute breathing exercise.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Premium;
