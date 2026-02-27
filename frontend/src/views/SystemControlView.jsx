import React, { useState } from 'react';
import {
    Sliders,
    Power,
    Cpu,
    Zap,
    Settings2,
    Lock,
    Wifi,
    Radio
} from 'lucide-react';
import DesktopWindow from '../components/DesktopWindow';

const ToggleSwitch = ({ active, onToggle, label }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded hover:bg-white/10 transition-all cursor-pointer" onClick={onToggle}>
        <span className="text-xs text-white uppercase font-bold tracking-widest">{label}</span>
        <div className={`w-10 h-5 rounded-full relative transition-all ${active ? 'bg-primary' : 'bg-slate-700'}`}>
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${active ? 'right-0.5' : 'left-0.5'}`}></div>
        </div>
    </div>
);

const ActuatorSlider = ({ val, setVal, name }) => (
    <div className="p-4 bg-white/5 border border-white/5 rounded">
        <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-slate-300 font-bold uppercase tracking-widest">{name}</span>
            <span className="text-sm font-mono font-bold text-white">{val}% Open</span>
        </div>
        <input
            type="range"
            min="0" max="100"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary outline-none"
        />
        <div className="mt-2 flex justify-between text-[8px] text-slate-500 font-mono">
            <span>CLOSED</span>
            <span>RESTRICTED</span>
            <span>FULL_LAMINAR</span>
        </div>
    </div>
);

const SystemControlView = () => {
    const [aiMode, setAiMode] = useState(true);
    const [valveA, setValveA] = useState(100);
    const [valveB, setValveB] = useState(45);
    const [pump, setPump] = useState(80);

    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Manual & Autonomous Control</h2>
                    <p className="text-sm text-slate-400">Override grid parameters or enable LLaMA-based autonomous response.</p>
                </div>
            </div>

            <div className="flex gap-6 h-full min-h-0">
                <DesktopWindow title="AUTONOMY_ENGINE_CORE" flex={1}>
                    <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar">
                        <div className={`p-6 rounded-lg transition-all border ${aiMode ? 'bg-primary/10 border-primary/30 shadow-[0_0_20px_rgba(13,127,242,0.1)]' : 'bg-slate-800/50 border-slate-700'}`}>
                            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-full ${aiMode ? 'bg-primary/20 text-primary' : 'bg-slate-700 text-slate-400'}`}>
                                        <Cpu size={32} className={aiMode ? 'animate-pulse' : ''} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white tracking-widest uppercase">GNN AI Director</h3>
                                        <p className="text-[10px] text-slate-400 font-mono">{aiMode ? 'ENGAGED & ROUTING' : 'MANUAL OVERRIDE ACTIVE'}</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={aiMode} onChange={() => setAiMode(!aiMode)} />
                                    <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary shadow-lg"></div>
                                </label>
                            </div>

                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                When engaged, the LLM identifies critical burst signatures and <span className="text-white font-bold">automatically throttles municipal valves</span> to prevent catastrophic loss without human intervention.
                            </p>

                            <div className="space-y-4">
                                <ToggleSwitch active={aiMode} onToggle={() => { }} label="Auto-Isolation Protocols" />
                                <ToggleSwitch active={aiMode} onToggle={() => { }} label="Dynamic Pump Frequencies" />
                                <ToggleSwitch active={true} onToggle={() => { }} label="SSE Real-time Broadcast" />
                            </div>
                        </div>

                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded">
                            <h4 className="text-xs font-black text-red-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                <Power size={14} /> Full System Dump
                            </h4>
                            <p className="text-[10px] text-slate-500 mb-4">Evacuate primary grid lines instantly. Emergency use only.</p>
                            <button className="w-full py-3 text-xs rounded btn-danger-glow">
                                TRIGGER FLUSH
                            </button>
                        </div>
                    </div>
                </DesktopWindow>

                <DesktopWindow title="HARDWARE_OVERRIDE_PANEL" flex={1}>
                    <div className="p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
                        <h4 className="flex items-center gap-2 text-white font-bold mb-6">
                            <Settings2 size={18} className="text-orange-500" /> Physical Actuator Tuning
                        </h4>

                        {!aiMode ? (
                            <div className="space-y-6">
                                <ActuatorSlider val={valveA} setVal={setValveA} name="Valve_N1_Bhatsa" />
                                <ActuatorSlider val={valveB} setVal={setValveB} name="Valve_N4_SouthZone" />
                                <ActuatorSlider val={pump} setVal={setPump} name="VFD_Pump_Station_1" />
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded bg-background-dark/30 p-10 text-center">
                                <Lock size={48} className="text-slate-600 mb-4" />
                                <h3 className="text-white font-bold uppercase tracking-widest mb-2">Controls Locked</h3>
                                <p className="text-[10px] text-slate-500">Disable GNN Director to access physical grid hardware panels.</p>
                            </div>
                        )}

                        <div className="mt-auto pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                            <div className="glass-panel p-4 flex items-center gap-3">
                                <div className="p-2 bg-green-500/20 text-green-500 rounded"><Wifi size={14} /></div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase">IoT Gateways</p>
                                    <p className="text-xs font-mono font-bold text-white">412/412 UP</p>
                                </div>
                            </div>
                            <div className="glass-panel p-4 flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 text-blue-400 rounded"><Radio size={14} /></div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase">Signal Latency</p>
                                    <p className="text-xs font-mono font-bold text-white">0.12ms</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DesktopWindow>
            </div>
        </div>
    );
};

export default SystemControlView;
