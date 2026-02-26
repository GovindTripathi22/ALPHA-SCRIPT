import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, ShieldCheck, Globe2, ChevronRight, Cpu } from 'lucide-react';

function Landing() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const fadeInUp = {
        hidden: { y: 40, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
    };

    return (
        <div className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden selection:bg-cyan-500/30">
            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full opacity-[0.35] scale-105 pointer-events-none"
                    style={{ filter: "contrast(1.2) saturate(1.1) hue-rotate(15deg)" }}
                >
                    <source src="/assets/Blue_ocean_cinematic_shot_above_a09ff5fa4c.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none transition-opacity duration-1000 mix-blend-overlay" />
                
                {/* Ambient Light Orbs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
            </div>

            {/* Glass Navbar */}
            <motion.nav 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'py-8'}`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                            <div className="w-full h-full bg-[#020617] rounded-xl flex items-center justify-center">
                                <Cpu className="w-5 h-5 text-cyan-400" />
                            </div>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white/90">
                            ALPHA<span className="text-cyan-400 font-black">SCRIPT</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                        <a href="#platform" className="hover:text-cyan-400 transition-colors">Platform</a>
                        <a href="#technology" className="hover:text-cyan-400 transition-colors">Technology</a>
                        <a href="#defense" className="hover:text-cyan-400 transition-colors">Grid Defense</a>
                    </div>

                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-md"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 text-sm font-semibold text-slate-100 group-hover:text-cyan-50">Launch Protocol</span>
                        <ChevronRight className="w-4 h-4 relative z-10 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <main className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase">System Operational v2.4</span>
                    </motion.div>

                    <motion.h1 
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9]"
                    >
                        <motion.span variants={fadeInUp} className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                            Predictive AI
                        </motion.span>
                        <motion.span variants={fadeInUp} className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] mt-2">
                            Smart Water Grids
                        </motion.span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 font-light leading-relaxed"
                    >
                        Mitigate 30% urban water loss before it happens. Experience proactive anomaly detection powered by acoustic sensors and deep learning.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            onClick={() => navigate('/dashboard')}
                            className="group relative px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-2xl overflow-hidden shadow-[0_0_40px_-5px_rgba(34,211,238,0.5)] flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            <span className="relative z-10 text-lg">Enter Dashboard</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                        
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="group px-8 py-4 rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-md hover:bg-slate-800 hover:border-slate-500 transition-all font-semibold flex items-center justify-center gap-3 text-slate-300 hover:text-white"
                        >
                            View Architecture
                        </motion.button>
                    </div>
                </div>
            </main>

            {/* Feature Highlights Bento Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                     {/* Card 1 */}
                     <div className="group relative glass-panel p-8 bg-gradient-to-br from-slate-900/80 to-[#020617]/90 border-slate-800/50 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 transform origin-top-right">
                            <Activity className="w-32 h-32 text-cyan-400" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                                <Activity className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Real-time Telemetrics</h3>
                            <p className="text-slate-400 leading-relaxed font-light">Millisecond latency on acoustic flow data processing across thousands of distributed municipal sensor nodes.</p>
                        </div>
                     </div>

                     {/* Card 2 */}
                     <div className="group relative glass-panel p-8 bg-gradient-to-br from-slate-900/80 to-[#020617]/90 border-slate-800/50 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 transform origin-top-right">
                            <ShieldCheck className="w-32 h-32 text-blue-400" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                                <ShieldCheck className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Zero-Day Anomaly Defense</h3>
                            <p className="text-slate-400 leading-relaxed font-light">Deep neural networks detect micro-leaks and pressure surges before they become catastrophic civic failures.</p>
                        </div>
                     </div>

                     {/* Card 3 */}
                     <div className="group relative glass-panel p-8 bg-gradient-to-br from-slate-900/80 to-[#020617]/90 border-slate-800/50 hover:border-indigo-500/30 transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 transform origin-top-right">
                            <Globe2 className="w-32 h-32 text-indigo-400" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                                <Globe2 className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Interactive Digital Twin</h3>
                            <p className="text-slate-400 leading-relaxed font-light">Fully geospatial 3D web mapping integration for command-center level oversight of the entire utility network.</p>
                        </div>
                     </div>
                </motion.div>
            </section>
        </div>
    );
}

export default Landing;
