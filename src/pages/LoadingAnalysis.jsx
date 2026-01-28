import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateBrandIdentity } from '../lib/gemini';

const LoadingAnalysis = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState("Iniciando análisis...");
    const [progress, setProgress] = useState(0);

    const dataFetchedRef = React.useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;

            if (!location.state) return; // Should handle this case

            try {
                // Minimum loading time of 3 seconds
                const minLoadingTime = new Promise(resolve => setTimeout(resolve, 3000));

                // API Call
                const apiCall = generateBrandIdentity(
                    location.state.businessName,
                    location.state.sector,
                    location.state.description,
                    location.state.style,
                    location.state.vibe
                );

                const [_, result] = await Promise.all([minLoadingTime, apiCall]);

                navigate('/dashboard', {
                    state: {
                        generatedDesign: {
                            ...result,
                            businessName: location.state.businessName,
                            style: location.state.style
                        }
                    }
                });

            } catch (error) {
                console.error("Failed to generate", error);
                alert(`Error generando identidad: ${error.message}`);
                navigate('/dashboard', {
                    state: {
                        error: error.message
                    }
                });
            }
        };

        fetchData();

        const messages = [
            "Analizando la información de tu marca...",
            "Explorando combinaciones de colores...",
            "Diseñando logotipos únicos...",
            "Aplicando identidad visual...",
            "Finalizando detalles..."
        ];

        let currentMessage = 0;
        const messageInterval = setInterval(() => {
            currentMessage = (currentMessage + 1) % messages.length;
            setStatus(messages[currentMessage]);
        }, 1500);

        // Progress visual simulation
        const interval = setInterval(() => {
            setProgress(prev => (prev < 90 ? prev + 1 : prev));
        }, 50);

        return () => {
            clearInterval(interval);
            clearInterval(messageInterval);
        };
    }, [navigate, location.state]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface-primary text-center">
            <div className="w-full max-w-sm space-y-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <div className="h-16 w-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <h2 className="text-xl font-bold text-text-primary">{status}</h2>
                </motion.div>

                <div className="h-2 w-full bg-border-subtle rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoadingAnalysis;
