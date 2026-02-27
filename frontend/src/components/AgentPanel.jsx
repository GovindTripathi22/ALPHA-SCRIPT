import React, { useState, useEffect } from 'react';
import useStore from '../lib/store';
import { Terminal, Shield, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TypewriterText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        setDisplayedText('');
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, i));
            i++;
            if (i > text.length) {
                clearInterval(intervalId);
            }
        }, 20); // Faster typing speed for 'AI' feel
        return () => clearInterval(intervalId);
    }, [text]);

    return <span className="whitespace-pre-wrap">{displayedText}</span>;
};

const AgentPanel = () => {
    const report = useStore((state) => state.dispatchReport);

    return (
        <AnimatePresence>
            {report && (
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-full glass-panel-active p-6"
                >
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                        <div className="p-2 bg-alert-red/20 rounded-lg animate-pulse">
                            <AlertTriangle className="w-5 h-5 text-alert-red" />
                        </div>
                        <div>
                            <h2 className="text-alert-red font-bold tracking-widest text-sm">AUTONOMOUS DISPATCH TRIGGERED</h2>
                            <p className="text-xs text-slate-400 font-mono mt-1">ID: {report.id} | {new Date(report.timestamp).toLocaleTimeString()}</p>
                        </div>
                    </div>

                    <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-green-400 leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar border border-white/5 relative">
                        <div className="absolute top-2 right-2 flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        </div>
                        <TypewriterText text={report.report} />
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button className="flex-1 text-white py-2 rounded-lg text-xs font-semibold tracking-wider btn-premium bg-white/10 hover:bg-white/20">
                            REJECT
                        </button>
                        <button className="flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-xs btn-danger-glow">
                            <Shield className="w-4 h-4" /> OVERRIDE AI
                        </button>
                    </div>
                </motion.div>
            )}

            {!report && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full glass-panel p-6 opacity-50"
                >
                    <div className="flex items-center gap-3 opacity-50">
                        <div className="p-2 bg-white/5 rounded-lg">
                            <Terminal className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                            <h2 className="text-slate-400 font-bold tracking-widest text-sm">AGENT STANDBY</h2>
                            <p className="text-xs text-slate-500 mt-1">Monitoring Virtual Sensors...</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AgentPanel;
