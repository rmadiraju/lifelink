import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Folder, Heart, Settings } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
    return (
        <nav className="bottom-nav">
            <NavLink to="/app/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Home size={24} />
            </NavLink>
            <NavLink to="/app/records" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Folder size={24} />
            </NavLink>
            <NavLink to="/app/premium" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Heart size={24} />
            </NavLink>
            <NavLink to="/app/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Settings size={24} />
            </NavLink>
        </nav>
    );
};

export default BottomNav;
