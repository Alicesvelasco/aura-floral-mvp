import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import moodHappy from '../assets/mood-happy.svg';
import moodSmile from '../assets/mood-smile.svg';

const Logo = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center space-x-2 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate('/')}
        >
            <motion.div
                animate={isHovered ? { y: -3, scale: 1.1 } : { y: 0, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                }}
                className="relative w-8 h-8"
            >
                {/* We use absolute positioning to smooth the transition between icons if needed, or just swap source */}
                <img
                    src={isHovered ? moodHappy : moodSmile}
                    alt="AI Branding Logo"
                    className="w-full h-full object-contain"
                />
            </motion.div>
            <span
                className="text-2xl font-nunito font-extrabold tracking-tight transition-colors text-text-primary"
            >
                Mojify
            </span>
        </div>
    );
};

export default Logo;
