import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Download, Share2, Briefcase, Calendar, ShoppingBag, MessageCircle, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import html2canvas from 'html2canvas';
import Logo from '../components/Logo';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();
    const [selectedDesign, setSelectedDesign] = useState(0);
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

    const baseDesigns = [
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
            logoPath: "/logos/sage-classe.svg",
            description: "Sophisticated and calm.",
            feedImages: [
                "/Instagram/Classic/classic-post1.1.jpeg",
                "/Instagram/Classic/classic-post2.jpeg",
                "/Instagram/Classic/classic-post3.jpeg",
                "/Instagram/Classic/flores-rosa-1.jpg",
                "/Instagram/Classic/flores-rosa-2.jpg",
                "/Instagram/Classic/flores-rosa-3.jpg",
                "/Instagram/Classic/classic-post1.1.jpeg",
                "/Instagram/Classic/flores-rosa-1.jpg"
            ]
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
            logoPath: "/logos/rustic.svg",
            description: "Organic and grounded.",
            feedImages: [
                "/Instagram/Rustic/flore-mujer-1.jpg",
                "/Instagram/Rustic/flore-mujer-2.jpg",
                "/Instagram/Rustic/flores marron.jpg",
                "/Instagram/Rustic/flores-amarillo-2.jpg",
                "/Instagram/Rustic/flores-blancas-1.jpg",
                "/Instagram/Rustic/flores-blancas-4.jpg",
                "/Instagram/Rustic/flores-blancas-5.jpg",
                "/Instagram/Rustic/flores-marron-1.jpg"
            ]
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
            logoPath: "/logos/moder.svg",
            description: "Strong and contemporary.",
            feedImages: [
                "/Instagram/modern/flore-modern-1.jpg",
                "/Instagram/modern/flore-modern-2.jpg",
                "/Instagram/modern/flore-modern-3.jpg",
                "/Instagram/modern/flore-modern-4.jpg",
                "/Instagram/modern/flore-modern-5.jpg",
                "/Instagram/modern/flore-modern-6.jpg",
                "/Instagram/modern/flore-modern-7.jpg",
                "/Instagram/modern/flore-modern-8.jpg"
            ]
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
            logoPath: "/logos/minimal.svg",
            description: "Clean and approachable.",
            feedImages: [
                "/Instagram/Minimal/flore-verde-1.jpg",
                "/Instagram/Minimal/flore-verde-2.jpg",
                "/Instagram/Minimal/flore-verde-3.jpg",
                "/Instagram/Minimal/flore-verde-4.jpg",
                "/Instagram/Minimal/flore-verde-5.jpg",
                "/Instagram/Minimal/flore-verde-6.jpg",
                "/Instagram/Minimal/flore-verde-7.jpg",
                "/Instagram/Minimal/flore-verde-8.jpg"
            ]
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
            logoPath: "/logos/luxury.svg",
            description: "Exclusive and timeless.",
            feedImages: [
                "/Instagram/Luxury/flore-mujer-1.jpg",
                "/Instagram/Luxury/flores-negras-1.jpg",
                "/Instagram/Luxury/flores-negras-2.jpg",
                "/Instagram/Luxury/flores-negras-4.jpg",
                "/Instagram/Luxury/flores-negras-5.jpg",
                "/Instagram/Luxury/flores-negras-6.jpg",
                "/Instagram/Luxury/flores-negras-7.jpg",
                "/Instagram/Luxury/flores-negras-8.jpg"
            ]
        }
    ];

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
            'Raleway': 'font-raleway',
            'Source Serif 4': 'font-source-serif',
            'Inter': 'font-inter'
        };
        return map[name] || (type === 'heading' ? 'font-serif' : 'font-sans');
    };

    let designs = [...baseDesigns];



    const current = designs[selectedDesign];

    // Safety check if current is undefined (shouldn't happen)
    if (!current) return <div>Cargando...</div>;

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

        // Temporarily make it visible for capture
        element.style.display = "flex";

        // Wait for browser paint
        await new Promise(resolve => setTimeout(resolve, 100));

        try {
            const canvas = await html2canvas(element, {
                scale: 2, // High resolution
                backgroundColor: null,
                useCORS: true,
                logging: false
            });

            // Use Blob instead of toDataURL for better mobile support (prevents large string crashes)
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error("Canvas export failed");
                    return;
                }
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `Aura_Floral_BrandKit_${current.id}.png`;
                document.body.appendChild(link); // Required for some mobile browsers
                link.click();
                document.body.removeChild(link);

                // Cleanup memory
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            }, 'image/png');

        } catch (err) {
            console.error("Export failed:", err);
            alert("No se pudo generar la imagen. Por favor intenta de nuevo.");
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

            {/* App Branding Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-border-subtle sticky top-0 z-20 px-6 py-4">
                <div className="max-w-5xl mx-auto flex items-center space-x-3">
                    <Logo />
                </div>
            </header>

            {/* Top Bar for Selection */}
            <div className="bg-white border-b border-border-subtle z-10 px-4 py-3 overflow-x-auto no-scrollbar">
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
                        <motion.section
                            key={current.id + "logo"}
                            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-current/10 shadow-sm flex flex-col items-center justify-center min-h-[400px]"
                            {...fadeInUp}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-8 w-full text-center">Logo Propuesto</h3>
                            {current.logoSvg ? (
                                <div
                                    className="w-64 h-64 drop-shadow-sm transition-all duration-500 [&>svg]:w-full [&>svg]:h-full"
                                    dangerouslySetInnerHTML={{ __html: current.logoSvg }}
                                />
                            ) : (
                                <div className="w-64 h-64 flex items-center justify-center">
                                    <img
                                        src={current.logoPath}
                                        alt={`Logo ${current.name}`}
                                        className={cn(
                                            "max-w-full max-h-full object-contain drop-shadow-sm transition-all duration-500",
                                            current.id === 5 && "invert brightness-0"
                                        )}
                                    />
                                </div>
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

                    {/* Instagram Mockup Section */}
                    <motion.section
                        key={current.id + "social"}
                        className="flex flex-col items-center justify-center pt-8"
                        {...fadeInUp}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-8 w-full text-center">Visualización en Redes</h3>

                        <div className="bg-white text-black w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 font-sans">
                            {/* Insta Header */}
                            <div className="px-5 pt-8 pb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                                        <div className="bg-white w-full h-full rounded-full p-[2px] overflow-hidden flex items-center justify-center">
                                            <img src={current.logoPath} className="w-full h-full object-contain p-3" alt="Profile" />
                                        </div>
                                    </div>
                                    <div className="flex space-x-6 text-center">
                                        <div><div className="font-bold text-lg">125</div><div className="text-xs text-gray-500">Posts</div></div>
                                        <div><div className="font-bold text-lg">4.2k</div><div className="text-xs text-gray-500">Followers</div></div>
                                        <div><div className="font-bold text-lg">890</div><div className="text-xs text-gray-500">Following</div></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Aura Floral Design</div>
                                    <div className="text-xs text-gray-500">Florist</div>
                                    <div className={cn("text-sm mt-1 leading-snug", current.fonts.bodyClass)}>
                                        🌿 Arte floral y diseño botánico.<br />
                                        ✨ {current.description}<br />
                                        📍 Málaga, ES
                                    </div>
                                    <div className="mt-4 flex space-x-2">
                                        <button className={cn("flex-1 py-1.5 rounded-lg text-sm font-semibold text-white", "transition-colors")} style={{ backgroundColor: current.colors[0] }}>
                                            Follow
                                        </button>
                                        <button className="flex-1 py-1.5 rounded-lg border border-gray-300 text-sm font-semibold">Message</button>
                                    </div>
                                </div>
                            </div>

                            {/* Highlights */}
                            <div className="flex space-x-4 px-5 pb-4 overflow-x-auto no-scrollbar">
                                {[
                                    { name: 'Works', icon: Briefcase },
                                    { name: 'Events', icon: Calendar },
                                    { name: 'Shop', icon: ShoppingBag },
                                    { name: 'Q&A', icon: MessageCircle }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center space-y-1 min-w-[60px]">
                                        <div className="w-16 h-16 rounded-full border border-gray-200 p-1">
                                            <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center" style={{ backgroundColor: current.colors[i % current.colors.length] + '20' }}>
                                                <item.icon className="w-6 h-6" style={{ color: current.colors[i % current.colors.length] }} />
                                            </div>
                                        </div>
                                        <div className="text-xs">{item.name}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Feed Grid */}
                            <div className="grid grid-cols-3 gap-0.5 pb-8">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="aspect-square relative group overflow-hidden bg-gray-50">
                                        {(() => {
                                            const imgIndex = i > 4 ? i - 1 : i;
                                            return i !== 4 && current.feedImages && current.feedImages[imgIndex] ? (
                                                <img
                                                    src={current.feedImages[imgIndex]}
                                                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                                                    alt="Feed post"
                                                />
                                            ) : (
                                                <div
                                                    className="w-full h-full transition-all duration-500 hover:scale-110 opacity-90"
                                                    style={{
                                                        backgroundColor: (current.id === 5 && i === 4)
                                                            ? '#000000'
                                                            : current.colors[i % current.colors.length]
                                                    }}
                                                />
                                            );
                                        })()}

                                        {i === 4 && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <img src={current.logoPath} className={cn("w-1/3 h-1/3 object-contain opacity-50 mix-blend-multiply", current.id === 5 && "invert mix-blend-screen opacity-100")} alt="watermark" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    <motion.div
                        className="flex justify-center space-x-4 pt-8 pb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {(() => {
                            // Determine button color (Primary for most, White for Luxury Dark to ensure visibility)
                            const btnColor = current.id === 5 ? '#FFFFFF' : current.colors[0];

                            return (
                                <>
                                    <Button
                                        className="shadow-sm transition-all hover:opacity-75 border"
                                        style={{
                                            backgroundColor: 'transparent',
                                            borderColor: btnColor,
                                            color: btnColor
                                        }}
                                        onClick={handleShare}
                                    >
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Compartir
                                    </Button>
                                    <Button
                                        className="shadow-sm transition-all hover:opacity-75 border"
                                        style={{
                                            backgroundColor: 'transparent',
                                            borderColor: btnColor,
                                            color: btnColor
                                        }}
                                        onClick={handleDownload}
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Descargar Kit
                                    </Button>
                                </>
                            );
                        })()}
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
