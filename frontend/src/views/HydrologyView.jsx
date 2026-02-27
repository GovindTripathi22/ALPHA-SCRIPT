import React from 'react';
import {
    Droplets,
    Waves,
    CloudRain,
    Thermometer,
    Layers,
    ArrowUpRight,
    ShieldCheck,
    Search,
    Zap,
    Lock
} from 'lucide-react';
import DesktopWindow from '../components/DesktopWindow';

const HydrologyView = () => {
    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Hydrological Intelligence</h2>
                    <p className="text-sm text-slate-400">Monitoring reservoir levels and identifying Non-Revenue Water (NRW) anomalies.</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-panel px-4 py-2 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Sensors Online: 1,402</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 h-full min-h-0">
                {/* Left Column: Flow Balance Analytics */}
                <div className="flex-[1.5] flex flex-col gap-6">
                    <DesktopWindow title="THEFT_GUARD_FLOW_BALANCE" flex={1}>
                        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                            <div className="mb-6 flex justify-between items-center group cursor-pointer">
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider flex items-center gap-2">
                                        <Lock size={14} className="text-yellow-500" /> Revenue Recovery Audit
                                    </h3>
                                    <p className="text-[10px] text-slate-500">Comparing Source Supply vs. Legal Household Consumption.</p>
                                </div>
                                <div className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded text-[9px] font-black uppercase">Anomaly Detected</div>
                            </div>

                            <div className="space-y-6">
                                {/* Mass Balance Visualizer */}
                                <div className="glass-panel p-6 bg-white/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Search size={64} className="text-primary" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 relative z-10">
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-black mb-2 tracking-widest">Source (Main Intake)</p>
                                            <div className="text-2xl font-bold text-white font-mono">1,240 <span className="text-[10px] text-slate-500">M³/h</span></div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-black mb-2 tracking-widest">Sink (Reported Usage)</p>
                                            <div className="text-2xl font-bold text-red-500 font-mono">1,085 <span className="text-[10px] text-slate-500">M³/h</span></div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Unaccounted Loss (NRW)</p>
                                            <div className="text-sm font-bold text-orange-400 font-mono">155 M³/h (12.5%)</div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Status</p>
                                            <div className="text-[10px] text-red-500 font-black uppercase flex items-center gap-1 justify-end">
                                                <Search size={10} /> Suspected Theft
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 glass-panel border-l-2 border-primary">
                                        <div className="text-[9px] text-slate-500 font-black uppercase mb-1">Grid Segment A-14</div>
                                        <div className="text-sm font-bold text-white mb-1">Variance: +4.2%</div>
                                        <div className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Normal Range</div>
                                    </div>
                                    <div className="p-4 glass-panel border-l-2 border-red-500">
                                        <div className="text-[9px] text-slate-500 font-black uppercase mb-1">Grid Segment B-02</div>
                                        <div className="text-sm font-bold text-white mb-1">Variance: -14.8%</div>
                                        <div className="text-[8px] text-red-500 font-bold uppercase tracking-widest">Audit Required</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DesktopWindow>
                </div>

                {/* Right Column: Reservoir & Environment */}
                <div className="flex-1 flex flex-col gap-6">
                    <DesktopWindow title="RESERVOIR_STATES" flex={1.2}>
                        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Upper Vaitarna</span>
                                        <span className="text-lg font-bold font-mono text-white">84.2%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '84.2%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Bhatsa Grid</span>
                                        <span className="text-lg font-bold font-mono text-orange-400">41.8%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500" style={{ width: '41.8%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto grid grid-cols-2 gap-3">
                                <div className="p-3 glass-panel">
                                    <CloudRain size={16} className="text-blue-400 mb-2" />
                                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Rainfall</p>
                                    <p className="text-xs font-bold text-white font-mono">1.2mm/h</p>
                                </div>
                                <div className="p-3 glass-panel">
                                    <Thermometer size={16} className="text-orange-400 mb-2" />
                                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Temp</p>
                                    <p className="text-xs font-bold text-white font-mono">32.4°C</p>
                                </div>
                            </div>
                        </div>
                    </DesktopWindow>

                    <DesktopWindow title="DEMAND_INTELLIGENCE" flex={1}>
                        <div className="flex-1 p-6 bg-primary/5 flex flex-col items-center justify-center text-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-4 border border-primary/20">
                                <Zap size={32} className="text-primary animate-pulse" />
                            </div>
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-2">Demand Forecast</h4>
                            <p className="text-[10px] text-slate-500 max-w-[200px] leading-relaxed mb-6">
                                Based on current temp (32°C) and soil moisture, predicted demand will increase by <span className="text-primary font-bold">14%</span> in the next 12 hours.
                            </p>
                            <button className="w-full py-2 text-[10px] rounded btn-primary-glow">
                                Optimize Output
                            </button>
                        </div>
                    </DesktopWindow>
                </div>
            </div>
        </div>
    );
};

export default HydrologyView;
