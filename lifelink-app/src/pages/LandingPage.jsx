import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Shield, Zap } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="lp-container">
                <header className="lp-header">
                    <div className="lp-logo">LifeLink</div>
                    <nav className="lp-nav">
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <a href="#about">About</a>
                        <Link to="/app/splash">Login</Link>
                    </nav>
                </header>

                <section className="lp-hero">
                    <h1>Your Health,<br />Reimagined.</h1>
                    <p>
                        Experience the future of personal health monitoring.
                        Secure, intelligent, and designed for your life.
                    </p>
                    <Link to="/app/splash" className="lp-cta-button">
                        Get Started <ArrowRight />
                    </Link>
                </section>

                <section id="features" className="lp-features">
                    <div className="lp-feature-card">
                        <div className="lp-icon-box">
                            <Activity size={24} />
                        </div>
                        <h3>Real-time Monitoring</h3>
                        <p>Track your vitals with precision. Our advanced algorithms keep you informed about your health status 24/7.</p>
                    </div>

                    <div className="lp-feature-card">
                        <div className="lp-icon-box">
                            <Shield size={24} />
                        </div>
                        <h3>Secure Records</h3>
                        <p>Your medical history, encrypted and accessible only to you. Share securely with doctors when you need to.</p>
                    </div>

                    <div className="lp-feature-card">
                        <div className="lp-icon-box">
                            <Zap size={24} />
                        </div>
                        <h3>Premium Insights</h3>
                        <p>Unlock deeper analysis and personalized health recommendations with LifeLink Premium.</p>
                    </div>
                </section>

                <section id="pricing" className="lp-pricing">
                    <h2 className="section-title">Simple Pricing</h2>
                    <div className="lp-pricing-grid">
                        <div className="lp-price-card">
                            <h3>Basic</h3>
                            <div className="price">Free</div>
                            <ul className="features-list">
                                <li>Real-time Monitoring</li>
                                <li>Secure Records</li>
                                <li>Basic Analytics</li>
                            </ul>
                            <Link to="/app/splash" className="lp-button-outline">Get Started</Link>
                        </div>
                        <div className="lp-price-card featured">
                            <h3>Premium</h3>
                            <div className="price">$4.99<span>/mo</span></div>
                            <ul className="features-list">
                                <li>Everything in Basic</li>
                                <li>Advanced Health Insights</li>
                                <li>AI Recommendations</li>
                                <li>Priority Support</li>
                            </ul>
                            <Link to="/app/premium" className="lp-button-filled">Go Premium</Link>
                        </div>
                    </div>
                </section>

                <footer className="lp-footer">
                    <p>&copy; {new Date().getFullYear()} LifeLink Inc. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;
