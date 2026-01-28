import React from 'react';
import Logo from './Logo';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ variant = 'default', onBack }) => {
    const navigate = useNavigate();

    // Default: Logo Left. Wizard: Logo Center, Back Left.
    const isWizard = variant === 'wizard';

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border-subtle h-20 px-6 md:px-12 flex items-center justify-between">
            {/* Left Section */}
            <div className="flex-1 flex items-center justify-start">
                {isWizard && onBack && (
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-full hover:bg-surface-secondary text-text-primary transition-colors"
                        aria-label="Volver"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                )}
                {!isWizard && <Logo />}
            </div>

            {/* Center Section - Only for Wizard */}
            <div className="flex-1 flex items-center justify-center">
                {isWizard && <Logo />}
            </div>

            {/* Right Section - Placeholder for now or User Profile */}
            <div className="flex-1 flex items-center justify-end">
                {/* Could add 'Help' or 'Login' here if needed */}
            </div>
        </nav>
    );
};

export default Navbar;
