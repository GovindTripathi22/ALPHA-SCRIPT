import React from 'react';
import {
    Droplets,
    Waves,
    CloudRain,
    Wind,
    BarChart3,
    Thermometer,
    Layers,
    ArrowUpRight
} from 'lucide-react';
import DesktopWindow from '../components/DesktopWindow';

const HydrologyView = () => {
    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Hydrological Intelligence</h2>
                    <p className="text-sm text-slate-400">Monitoring water table depth, reservoir pressure, and weather-driven demand.</p>
                </div>
            </div>

            <div className="flex gap-6 h-full min-h-0">
                {/* Left Column: Stats & Charts */}
                <div className="flex-1 flex flex-col gap-6">
                    <DesktopWindow title="RESERVOIR_TELEMETRY" flex={1}>
                        <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                            <div className="space-y-6">
                                {/* Reservoir Indicator 1 */}
                                <div className="group cursor-default">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="flex items-center gap-2">
                                            <Waves size={16} className="text-blue-400" />
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">Upper Vaitarna Basin</span>
                                        </div>
                                        <span className="text-xl font-bold font-mono text-white">84.2<span className="text-[10px] text-slate-500 font-sans ml-1">%</span></span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse" style={{ width: '84.2%' }}></div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                                        <span>Inflow: 402 m³/s</span>
                                        <span>Outflow: 120 m³/s</span>
                                    </div>
                                </div>

                                {/* Reservoir Indicator 2 */}
                                <div className="group cursor-default opacity-80">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="flex items-center gap-2">
                                            <Waves size={16} className="text-cyan-400" />
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">Bhatsa Grid Reservoir</span>
                                        </div>
                                        <span className="text-xl font-bold font-mono text-white">41.8<span className="text-[10px] text-slate-500 font-sans ml-1">%</span></span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400" style={{ width: '41.8%' }}></div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                                        <span className="text-orange-400">Low Level Warning</span>
                                        <span>Outflow: 852 m³/s</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Environmental Sensors</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 glass-panel flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 text-blue-400 rounded"><CloudRain size={16} /></div>
                                        <div>
                                            <div className="text-[10px] text-slate-500 font-bold uppercase">Precipitation</div>
                                            <div className="text-sm font-bold text-white font-mono">1.2 mm/h</div>
                                        </div>
                                    </div>
                                    <div className="p-3 glass-panel flex items-center gap-3">
                                        <div className="p-2 bg-orange-500/10 text-orange-400 rounded"><Thermometer size={16} /></div>
                                        <div>
                                            <div className="text-[10px] text-slate-500 font-bold uppercase">Ambient Temp</div>
                                            <div className="text-sm font-bold text-white font-mono">32.4 °C</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DesktopWindow>
                </div>

                {/* Center: Data Visualization */}
                <div className="flex-[2] flex flex-col gap-6">
                    <DesktopWindow
                        title="HYDRO_FLOW_MODEL_3D"
                        headerRight={<><BarChart3 size={14} className="text-primary" /> MULTI-DIMENSIONAL DATA</>}
                        flex={1}
                    >
                        <div className="flex-1 bg-black/40 flex flex-col items-center justify-center p-12 relative overflow-hidden">
                            {/* Visual backdrop */}
                            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0d7ff2 1px, transparent 1px), linear-gradient(90deg, #0d7ff2 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                            <div className="text-center relative z-10">
                                <div className="p-6 rounded-full bg-primary/10 border border-primary/20 mb-6 mx-auto w-fit">
                                    <Droplets size={48} className="text-primary animate-bounce" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 font-display">Hydraulic Simulation Active</h3>
                                <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
                                    Calculating pressure variances across 1,402 sensor nodes based on current weather patterns and soil moisture levels.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <div className="px-4 py-2 glass-panel flex items-center gap-2">
                                        <Layers size={14} className="text-blue-400" />
                                        <span className="text-xs text-slate-300">Soil Moisture: High</span>
                                    </div>
                                    <div className="px-4 py-2 glass-panel flex items-center gap-2">
                                        <Wind size={14} className="text-cyan-400" />
                                        <span className="text-xs text-slate-300">Evaporation: Low</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DesktopWindow>
                </div>

                {/* Right: Reports */}
                <div className="flex-1 flex flex-col gap-6">
                    <DesktopWindow title="DAILY_FLOW_ANALYTICS" flex={1}>
                        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="p-4 glass-panel hover:bg-white/5 transition-all group">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-[10px] font-mono text-slate-500">2026-02-{26 - i}</span>
                                            <span className="text-primary group-hover:translate-x-1 transition-transform cursor-pointer"><ArrowUpRight size={14} /></span>
                                        </div>
                                        <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">Region_{i}_Consumption_Report</h4>
                                        <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">
                                            Aggregate water usage metrics for the south-east corridor. Deviation: -2.4%.
                                        </p>
                                        <div className="flex gap-2">
                                            <div className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[8px] font-bold rounded uppercase">Verified</div>
                                            <div className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[8px] font-bold rounded uppercase">PDF</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DesktopWindow>
                </div>
            </div>
        </div>
    );
};

export default HydrologyView;
