import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const InputForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        businessName: '',
        sector: '',
        description: '',
        style: '',
        vibe: ''
    });

    const [selectedTags, setSelectedTags] = useState([]);

    const allTags = [
        'Minimalista', 'Moderno', 'Rústico', 'Elegante', 'Divertido',
        'Serio', 'Tecnológico', 'Natural', 'Lujoso', 'Retro',
        'Corporativo', 'Creativo', 'Artesanal', 'Futurista'
    ];

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            if (selectedTags.length < 3) {
                setSelectedTags([...selectedTags, tag]);
            }
        }
    };

    const handleNext = () => {
        if (step === 0 && formData.businessName) setStep(1);
        else if (step === 1 && formData.sector) setStep(2);
        else if (step === 2 && formData.description) setStep(3);
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleSubmit = () => {
        if (formData.businessName && formData.sector && formData.description && selectedTags.length > 0) {
            navigate('/loading', {
                state: {
                    ...formData,
                    style: selectedTags[0] || '', // First tag as style
                    vibe: selectedTags.slice(1).join(', ') || selectedTags[0] // Rest as vibe, or fallback
                }
            });
        }
    };

    // Enter key support
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Only allow Enter to proceed if it's not the last step and the current field is filled
            if (step === 0 && formData.businessName) handleNext();
            if (step === 1 && formData.sector) handleNext();
            if (step === 2 && formData.description) handleNext();
            // For step 3, Enter should not submit, as tags are selected by click
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-surface-primary font-sans text-text-primary">
            <Navbar
                variant={step > 0 ? 'wizard' : 'default'}
                onBack={step > 0 ? handleBack : undefined}
            />

            <div className="flex-1 flex flex-col pt-20">
                {/* pt-20 to account for fixed navbar */}

                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                                Give your brand its mojo ✨
                            </h1>
                            <p className="text-xl text-text-secondary mb-12 max-w-2xl">
                                Crea una identidad visual única con inteligencia artificial en segundos.
                            </p>

                            <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 items-center justify-center">
                                <div className="relative flex-1 w-full sm:max-w-md">
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder="Nombre de tu marca"
                                        className="w-full h-14 text-center sm:text-left text-xl px-6 rounded-xl border border-border-subtle bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-text-primary/30"
                                        value={formData.businessName}
                                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <Button
                                    className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-md bg-primary hover:bg-primary-hover text-white transition-all transform hover:scale-[1.01] flex items-center justify-center"
                                    disabled={!formData.businessName}
                                    onClick={handleNext}
                                >
                                    Comenzar
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step > 0 && (
                        <motion.div
                            key={`step-${step}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col items-center justify-start pt-12 md:pt-24 p-6"
                        >
                            <div className="w-full max-w-2xl space-y-12">
                                <div className="space-y-4 text-left">
                                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                                        {step === 1 && "¿A qué sector perteneces?"}
                                        {step === 2 && "Describe tu negocio"}
                                        {step === 3 && "Define tu personalidad"}
                                    </h2>
                                    <p className="text-lg text-text-primary/60">
                                        {step === 1 && "Ayuda a la IA a entender tu mercado."}
                                        {step === 2 && "En pocas palabras, ¿qué hacéis?"}
                                        {step === 3 && "Selecciona hasta 3 características."}
                                    </p>
                                </div>

                                <div className="">
                                    {step === 1 && (
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <div className="relative flex-1">
                                                <input
                                                    type="text"
                                                    autoFocus
                                                    placeholder="Ej: Tecnología, Moda, Alimentación..."
                                                    className="w-full h-14 text-lg px-6 rounded-xl border border-border-subtle bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-text-primary/30"
                                                    value={formData.sector}
                                                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                            <Button
                                                className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-md bg-primary hover:bg-primary-hover text-white transition-all transform hover:scale-[1.01] flex items-center justify-center"
                                                disabled={!formData.sector}
                                                onClick={handleNext}
                                            >
                                                Siguiente <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <div className="relative flex-1">
                                                <input
                                                    type="text"
                                                    autoFocus
                                                    placeholder="Ej: Somos una marca de ropa sostenible..."
                                                    className="w-full h-14 text-lg px-6 rounded-xl border border-border-subtle bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-text-primary/30"
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    onKeyDown={handleKeyDown}
                                                />
                                            </div>
                                            <Button
                                                className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-md bg-primary hover:bg-primary-hover text-white transition-all transform hover:scale-[1.01] flex items-center justify-center"
                                                disabled={!formData.description}
                                                onClick={handleNext}
                                            >
                                                Siguiente <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-10">
                                            <div className="flex flex-wrap gap-3">
                                                {allTags.map((tag) => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => handleTagClick(tag)}
                                                        className={`px-6 py-3 rounded-full border-2 text-lg transition-all ${selectedTags.includes(tag)
                                                            ? 'border-primary text-primary font-bold shadow-sm scale-105'
                                                            : 'border-border-subtle text-text-secondary hover:border-text-secondary/50 font-medium'
                                                            }`}
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="flex justify-start">
                                                <Button
                                                    size="lg"
                                                    className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-md bg-primary hover:bg-primary-hover text-white transition-all transform hover:scale-[1.01] flex items-center justify-center"
                                                    disabled={selectedTags.length === 0}
                                                    onClick={handleSubmit}
                                                >
                                                    Generar Marca <ArrowRight className="ml-2 w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InputForm;
