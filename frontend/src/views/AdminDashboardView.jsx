import React, { useState } from 'react';
import {
    BarChart3,
    Map as MapIcon,
    Terminal,
    Settings as SettingsIcon,
    ShieldCheck,
    Zap,
    HardHat,
    Clock,
    Navigation2
} from 'lucide-react';
import useStore from '../lib/store';
import DesktopWindow from '../components/DesktopWindow';
import AdminMapWidget from '../components/AdminMapWidget';

const AdminDashboardView = () => {
    const { nodes } = useStore((state) => state.networkData);
    const [activeTab, setActiveTab] = useState('incidents');

    const issueNodes = nodes?.filter(n => n.status === 'warning' || n.status === 'critical') || [];

    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden animate-fade-in-up">
            {/* Header Stats Bar */}
            <div className="flex flex-wrap gap-4 shrink-0">
                <div className="glass-panel px-6 py-3 flex items-center gap-4 bg-red-500/5 border-red-500/20">
                    <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Threats</p>
                        <h3 className="text-xl font-bold text-white font-mono">{issueNodes.length}</h3>
                    </div>
                </div>
                <div className="glass-panel px-6 py-3 flex items-center gap-4">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                        <Zap size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">System Load</p>
                        <h3 className="text-xl font-bold text-white font-mono">24.8%</h3>
                    </div>
                </div>
                <div className="glass-panel px-6 py-3 flex items-center gap-4">
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-500">
                        <HardHat size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Teams On-Site</p>
                        <h3 className="text-xl font-bold text-white font-mono">12</h3>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 h-full min-h-0">
                {/* Primary Command Map */}
                <div className="flex-[2] flex flex-col gap-6">
                    <DesktopWindow
                        title="CRISIS_COMMAND_MAP_V2.0"
                        headerRight={<><MapIcon size={14} className="text-primary" /> MULTI-LAYER SYNC ACTIVE</>}
                        flex={1}
                        className="border-red-500/30"
                    >
                        <div className="relative flex-1 bg-white">
                            <AdminMapWidget />
                        </div>
                    </DesktopWindow>

                    {/* Lower Control Bar */}
                    <div className="glass-panel h-32 flex divide-x divide-white/10 overflow-hidden shrink-0">
                        <div className="flex-1 p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-2 mb-2">
                                <Navigation2 size={16} className="text-primary group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Area Lockdown</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-tight">Emergency valve isolation for Zone A1 and Nagpur South Grid.</p>
                        </div>
                        <div className="flex-1 p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-2 mb-2">
                                <BarChart3 size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Pressure Re-route</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-tight">Redirecting secondary flow to unmonitored segments to maintain PSI levels.</p>
                        </div>
                        <div className="flex-1 p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock size={16} className="text-orange-400 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Recovery Estimator</span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-tight">AI Estimated TTR: 45 Minutes for current critical anomalies.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Incident Intelligence */}
                <div className="flex-1 flex flex-col gap-6">
                    <DesktopWindow
                        title="INTELLIGENCE_QUEUE"
                        headerRight={<Terminal size={14} className="text-slate-500" />}
                        flex={1}
                    >
                        <div className="flex-1 p-0 flex flex-col min-h-0 bg-black/40">
                            <div className="flex border-b border-white/5 shrink-0">
                                <button
                                    onClick={() => setActiveTab('incidents')}
                                    className={`flex-1 py-3 text-[10px] uppercase font-bold tracking-[0.2em] transition-all ${activeTab === 'incidents' ? 'text-primary border-b border-primary bg-primary/5' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    All Incidents
                                </button>
                                <button
                                    onClick={() => setActiveTab('comms')}
                                    className={`flex-1 py-3 text-[10px] uppercase font-bold tracking-[0.2em] transition-all ${activeTab === 'comms' ? 'text-primary border-b border-primary bg-primary/5' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    Field Comms
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                                {activeTab === 'incidents' ? (
                                    <div className="space-y-4">
                                        {issueNodes.length === 0 ? (
                                            <div className="py-20 text-center text-slate-600">
                                                <ShieldCheck size={32} className="mx-auto mb-2 opacity-20" />
                                                <p className="text-[10px] font-mono">NO ACTIVE THREATS</p>
                                            </div>
                                        ) : (
                                            issueNodes.map((node, i) => (
                                                <div key={i} className={`group relative p-4 rounded border transition-all hover:translate-x-1 ${node.status === 'critical' ? 'bg-red-500/10 border-red-500/30' : 'bg-orange-500/10 border-orange-500/30'}`}>
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h4 className="text-xs font-bold text-white font-mono">{node.id}</h4>
                                                            <p className="text-[10px] text-slate-500">Critical flow variance detected</p>
                                                        </div>
                                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest ${node.status === 'critical' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
                                                            {node.status}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-4 mb-4">
                                                        <div className="flex-1">
                                                            <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">Integrity</div>
                                                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                                <div className="h-full bg-red-500" style={{ width: `${node.integrity_score}%` }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 text-right">
                                                            <div className="text-[9px] text-slate-500 uppercase font-bold mb-1">Pressure</div>
                                                            <div className="text-[11px] font-mono text-white">{node.pressure} PSI</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <button className="flex-1 py-1 px-2 border border-white/10 rounded bg-white/5 hover:bg-white/10 text-[9px] font-bold text-white transition-all">
                                                            VIEW LOGS
                                                        </button>
                                                        <button className="flex-1 py-1 px-2 bg-red-500 text-white rounded text-[9px] font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">
                                                            FORCE CLOSE
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4 font-mono">
                                        <div className="text-slate-500 italic text-[10px] mb-4">Live Satellite Comms...</div>
                                        <div className="p-3 bg-white/5 border-l-2 border-primary rounded-r">
                                            <div className="text-[10px] text-primary mb-1">Team_Alpha &gt; HQ</div>
                                            <div className="text-[11px] text-slate-300">En-route to N2 intersection. Traffic clear. ETA 4mins.</div>
                                        </div>
                                        <div className="p-3 bg-white/5 border-l-2 border-slate-600 rounded-r opacity-60">
                                            <div className="text-[10px] text-slate-400 mb-1">HQ &gt; Team_Alpha</div>
                                            <div className="text-[11px] text-slate-500">Copy that. Node isolation on standby.</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </DesktopWindow>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardView;
