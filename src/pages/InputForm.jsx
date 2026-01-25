import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowRight } from 'lucide-react';

const InputForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: '',
        sector: '',
        description: '',
        style: '',
        vibe: ''
    });

    const styles = ['Minimalista', 'Rústico', 'Moderno'];
    const vibes = ['Elegante', 'Divertido', 'Serio'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.businessName && formData.sector && formData.description && formData.style && formData.vibe) {
            navigate('/loading', { state: formData });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface-primary">
            <motion.div
                className="w-full max-w-md space-y-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-serif text-text-primary">Cuéntanos sobre tu negocio</h2>
                    <p className="text-text-primary/70">Para crear algo único, necesitamos conocerte.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-border-subtle shadow-sm">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-text-primary">¿Cómo se llama tu negocio?</label>
                        <Input
                            placeholder="Ej: Aura Floral"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-text-primary">Estilo Visual</label>
                        <div className="grid grid-cols-3 gap-2">
                            {styles.map((style) => (
                                <button
                                    key={style}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, style })}
                                    className={`px-3 py-2 text-sm rounded-md border transition-all ${formData.style === style
                                        ? 'bg-accent-primary text-white border-accent-primary'
                                        : 'border-border-subtle hover:border-accent-primary/50 text-text-primary'
                                        }`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-text-primary">Vibración de Marca</label>
                        <div className="grid grid-cols-3 gap-2">
                            {vibes.map((vibe) => (
                                <button
                                    key={vibe}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, vibe })}
                                    className={`px-3 py-2 text-sm rounded-md border transition-all ${formData.vibe === vibe
                                        ? 'bg-accent-primary text-white border-accent-primary'
                                        : 'border-border-subtle hover:border-accent-primary/50 text-text-primary'
                                        }`}
                                >
                                    {vibe}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-text-primary">Sector</label>
                        <Input
                            placeholder="Ej: Eventos, Tecnología, Moda..."
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-text-primary">Descripción breve</label>
                        <textarea
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                            placeholder="Ej: Creamos arreglos florales artísticos para bodas y eventos exclusivos."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={!formData.businessName || !formData.sector || !formData.description || !formData.style || !formData.vibe}>
                        Generar Identidad Visual
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};

export default InputForm;
