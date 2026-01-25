import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Download, Share2, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();
    const [selectedDesign, setSelectedDesign] = useState(0);

    const designs = [
        {
            id: 1,
            name: "Sage Classic",
            bgClass: "bg-[#F9F7F2]",
            textClass: "text-[#1F1F1F]",
            colors: ["#8FA382", "#F2D5D5", "#333333"],
            fonts: {
                heading: "Playfair Display",
                body: "Montserrat",
                headingClass: "font-serif",
                bodyClass: "font-sans"
            },
            logoPath: "/logos/Logo1.svg",
            description: "Sophisticated and calm."
        },
        {
            id: 2,
            name: "Rustic Earth",
            bgClass: "bg-[#F5F1E8]",
            textClass: "text-[#2C1810]",
            colors: ["#A65D57", "#D4C4B7", "#594034"],
            fonts: {
                heading: "Cormorant Garamond",
                body: "Lato",
                headingClass: "font-cormorant",
                bodyClass: "font-lato"
            },
            logoPath: "/logos/Logo2.svg",
            description: "Organic and grounded."
        },
        {
            id: 3,
            name: "Modern Bold",
            bgClass: "bg-white",
            textClass: "text-[#0F172A]",
            colors: ["#1E40AF", "#F59E0B", "#F8FAFC"],
            fonts: {
                heading: "Oswald",
                body: "Open Sans",
                headingClass: "font-oswald",
                bodyClass: "font-opensans"
            },
            logoPath: "/logos/Logo3.svg",
            description: "Strong and contemporary."
        },
        {
            id: 4,
            name: "Minimal Fresh",
            bgClass: "bg-[#F0FDF4]",
            textClass: "text-[#111827]",
            colors: ["#14B8A6", "#E5E7EB", "#374151"],
            fonts: {
                heading: "Quicksand",
                body: "Nunito",
                headingClass: "font-quicksand",
                bodyClass: "font-nunito"
            },
            logoPath: "/logos/Logo4.svg",
            description: "Clean and approachable."
        },
        {
            id: 5,
            name: "Luxury Dark",
            bgClass: "bg-[#0C0A09]",
            textClass: "text-[#FAFAF9]",
            colors: ["#000000", "#D4D4D8", "#FFFFFF"],
            fonts: {
                heading: "Cinzel",
                body: "Raleway",
                headingClass: "font-cinzel",
                bodyClass: "font-raleway"
            },
            logoPath: "/logos/Logo5.svg",
            description: "Exclusive and timeless."
        }
    ];

    // Check for error from LoadingAnalysis
    const [error, setError] = useState(location.state?.error || null);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center bg-surface-primary">
                <div className="max-w-md space-y-4">
                    <h2 className="text-2xl font-serif text-red-600">Oops! Algo salió mal</h2>
                    <p className="text-text-primary/80">{error}</p>
                    <Button onClick={() => window.location.href = '/create'}>Intentar de nuevo</Button>
                </div>
            </div>
        );
    }

    // Inject AI Design if available
    if (location.state?.generatedDesign) {
        const aiDesign = location.state.generatedDesign;
        // Check if already added to avoid duplicates if re-rendering (simple check)
        if (designs[0].id !== 'ai') {
            designs.unshift({
                id: 'ai',
                name: "AI Generated",
                bgClass: "bg-[#F9F7F2]", // Default base
                textClass: "text-[#1F1F1F]",
                colors: aiDesign.colors,
                fonts: {
                    heading: aiDesign.fonts.heading,
                    body: aiDesign.fonts.body,
                    headingClass: "", // Dynamic mappings handled below
                },
                logoSvg: aiDesign.logo_svg || null,
                logoPath: aiDesign.logo_path || null, // Allow AI to return a path
                description: aiDesign.explanation || "Diseño único generado por IA."
            });
        }
    }

    // Helper to get font class from name
    const getFontClass = (name, type) => {
        const map = {
            'Playfair Display': 'font-serif',
            'Cormorant Garamond': 'font-cormorant',
            'Oswald': 'font-oswald',
            'Quicksand': 'font-quicksand',
            'Cinzel': 'font-cinzel',
            'Montserrat': 'font-sans',
            'Lato': 'font-lato',
            'Open Sans': 'font-opensans',
            'Nunito': 'font-nunito',
            'Raleway': 'font-raleway'
        };
        return map[name] || (type === 'heading' ? 'font-serif' : 'font-sans');
    };

    // Update current object with mapped classes for AI design
    const current = designs[selectedDesign];
    if (current.id === 'ai') {
        current.fonts.headingClass = getFontClass(current.fonts.heading, 'heading');
        current.fonts.bodyClass = getFontClass(current.fonts.body, 'body');
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const handleShare = async () => {
        const shareData = {
            title: `Aura Floral - Propuesta ${current.id}`,
            text: `Mira esta propuesta de marca para Aura Floral (${current.name}): ${current.description}`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
            alert("¡Enlace copiado al portapapeles!");
        }
    };

    const handleDownload = async () => {
        const element = document.getElementById("brand-kit-export");
        if (!element) return;

        // Temporarily make it visible for capture (but absolutely positioned off-screen or z-index handled if needed, 
        // though strictly 'hidden' elements can't be captured by html2canvas, so we often move it off-screen)
        element.style.display = "flex";

        try {
            const canvas = await html2canvas(element, {
                scale: 2, // High resolution
                backgroundColor: null, // Transparent if needed, but we set bg class
                useCORS: true // For images
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `Aura_Floral_BrandKit_${current.id}.png`;
            link.click();
        } catch (err) {
            console.error("Export failed:", err);
        } finally {
            element.style.display = "none";
        }
    };

    return (
        <div className="min-h-screen bg-surface-primary flex flex-col">
            {/* Hidden Export Template */}
            <div
                id="brand-kit-export"
                className={cn("fixed top-0 left-0 w-[800px] flex-col p-16 space-y-12 z-[-50]", current.bgClass, current.textClass)}
                style={{ display: 'none' }}
            >
                <header className="text-center space-y-4 border-b border-current/20 pb-8">
                    <h1 className={cn("text-6xl", current.fonts.headingClass)}>Aura Floral</h1>
                    <p className={cn("opacity-80 text-2xl", current.fonts.bodyClass)}>Brand Identity Kit</p>
                </header>

                <div className="flex-1 grid gap-12">
                    <section className="flex flex-col items-center justify-center p-12 border border-current/20 rounded-xl">
                        <img src={current.logoPath} alt="Logo" className="max-h-64 object-contain" />
                    </section>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="uppercase tracking-widest opacity-60 text-lg border-b border-current/10 pb-2">Colores</h3>
                            <div className="space-y-4">
                                {current.colors.map((c, i) => (
                                    <div key={i} className="flex items-center space-x-6">
                                        <div className="w-20 h-20 rounded-lg shadow-sm ring-1 ring-black/10" style={{ backgroundColor: c }} />
                                        <span className="text-xl font-mono">{c}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="uppercase tracking-widest opacity-60 text-lg border-b border-current/10 pb-2">Tipografía</h3>
                            <div>
                                <p className="opacity-60 text-sm mb-1">Encabezados</p>
                                <p className={cn("text-4xl", current.fonts.headingClass)}>{current.fonts.heading}</p>
                            </div>
                            <div>
                                <p className="opacity-60 text-sm mb-1">Cuerpo</p>
                                <p className={cn("text-2xl", current.fonts.bodyClass)}>{current.fonts.body}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="text-center opacity-40 text-sm pt-8 border-t border-current/10">
                    Generated by AI-Branding Express
                </footer>
            </div>

            {/* Top Bar for Selection */}
            <div className="bg-white border-b border-border-subtle sticky top-0 z-10 px-4 py-3 overflow-x-auto no-scrollbar">
                <div className="flex justify-center space-x-4 min-w-max mx-auto max-w-5xl">
                    {designs.map((design, idx) => (
                        <button
                            key={design.id}
                            onClick={() => setSelectedDesign(idx)}
                            className={cn(
                                "flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-medium transition-all",
                                selectedDesign === idx
                                    ? "bg-[#1F1F1F] text-white border-[#1F1F1F]"
                                    : "bg-white text-text-primary border-border-subtle hover:border-[#1F1F1F]"
                            )}
                        >
                            <span>{design.name}</span>
                            {selectedDesign === idx && <Check className="w-3 h-3 ml-1" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className={cn("flex-1 p-6 md:p-12 transition-colors duration-500", current.bgClass)}>
                <div className={cn("max-w-4xl mx-auto space-y-12", current.textClass)}>

                    <motion.header
                        key={current.id + "header"}
                        className="text-center space-y-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-1 rounded-full border border-current opacity-60 text-sm font-medium mb-4">
                            Propuesta {current.id}: {current.description}
                        </div>
                        <h1 className={cn("text-5xl md:text-6xl", current.fonts.headingClass)}>
                            Aura Floral
                        </h1>
                        <p className={cn("opacity-80 text-lg", current.fonts.bodyClass)}>Boutique Floral & Diseño</p>
                    </motion.header>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Logo Section */}
                        <motion.section
                            key={current.id + "logo"}
                            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-current/10 shadow-sm flex flex-col items-center justify-center min-h-[300px]"
                            {...fadeInUp}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-8 w-full text-center">Logo Propuesto</h3>
                            {current.logoSvg ? (
                                <div
                                    className="w-48 h-48 drop-shadow-sm transition-all duration-500 [&>svg]:w-full [&>svg]:h-full"
                                    dangerouslySetInnerHTML={{ __html: current.logoSvg }}
                                />
                            ) : (
                                <img
                                    src={current.logoPath}
                                    alt={`Logo ${current.name}`}
                                    className="max-h-48 w-auto object-contain drop-shadow-sm transition-all duration-500"
                                />
                            )}
                        </motion.section>

                        {/* Color Palette */}
                        <motion.section
                            key={current.id + "colors"}
                            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-current/10 shadow-sm"
                            {...fadeInUp}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-6">Paleta de Colores</h3>
                            <div className="space-y-4">
                                {current.colors.map((color, idx) => (
                                    <div key={idx} className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-lg shadow-sm ring-1 ring-black/5" style={{ backgroundColor: color }} />
                                        <div>
                                            <p className="font-mono text-sm uppercase">{color}</p>
                                            <p className="text-xs opacity-60">
                                                {idx === 0 ? 'Primario' : idx === 1 ? 'Secundario' : 'Acento'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Typography */}
                        <motion.section
                            key={current.id + "fonts"}
                            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-current/10 shadow-sm md:col-span-2"
                            {...fadeInUp}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-6">Tipografía</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-sm opacity-60 mb-2">Encabezados ({current.fonts.heading})</p>
                                    <p className={cn("text-4xl", current.fonts.headingClass)}>
                                        Aura Floral Design
                                    </p>
                                    <p className={cn("text-3xl mt-2 opacity-90", current.fonts.headingClass)}>
                                        Aa Bb Cc 123
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm opacity-60 mb-2">Cuerpo ({current.fonts.body})</p>
                                    <p className={cn("text-xl", current.fonts.bodyClass)}>
                                        Donde la naturaleza conoce el arte.
                                    </p>
                                    <p className={cn("text-lg mt-2 opacity-80", current.fonts.bodyClass)}>
                                        El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja.
                                    </p>
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    <motion.div
                        className="flex justify-center space-x-4 pt-8 pb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button variant="secondary" className="border-current text-current hover:bg-current/10" onClick={handleShare}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Compartir
                        </Button>
                        <Button variant="secondary" className="border-current text-current hover:bg-current/10" onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" />
                            Descargar Kit
                        </Button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
