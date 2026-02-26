import React, { useState, useMemo } from 'react';
import {
    BarChart3,
    Map as MapIcon,
    Terminal,
    ShieldCheck,
    Zap,
    HardHat,
    Clock,
    Navigation2,
    AlertCircle,
    TrendingDown
} from 'lucide-react';
import useStore from '../lib/store';
import DesktopWindow from '../components/DesktopWindow';
import AdminMapWidget from '../components/AdminMapWidget';

const NAGPUR_NODES = {
    N0: { lat: 21.1458, lng: 79.0882 },
    N1: { lat: 21.1498, lng: 79.0806 },
    N2: { lat: 21.1385, lng: 79.0833 },
    N3: { lat: 21.1311, lng: 79.0900 },
    N4: { lat: 21.1250, lng: 79.0750 },
    N5: { lat: 21.1350, lng: 79.0600 },
    N6: { lat: 21.1450, lng: 79.0650 },
    N7: { lat: 21.1550, lng: 79.0750 },
    N8: { lat: 21.1600, lng: 79.0850 },
    N9: { lat: 21.1500, lng: 79.1000 }
};

const AdminDashboardView = () => {
    const { nodes } = useStore((state) => state.networkData);
    const [activeTab, setActiveTab] = useState('incidents');

    const issueNodes = useMemo(() => {
        return (nodes?.filter(n => n.status === 'warning' || n.status === 'critical') || [])
            .map(node => ({
                ...node,
                lat: NAGPUR_NODES[node.id]?.lat || 21.1458,
                lng: NAGPUR_NODES[node.id]?.lng || 79.0882
            }))
            .sort((a, b) => b.integrity_score - a.integrity_score);
    }, [nodes]);

    const avgSecurityScore = useMemo(() => {
        if (!nodes?.length) return 100;
        return Math.round(nodes.reduce((acc, n) => acc + (n.integrity_score || 0), 0) / nodes.length);
    }, [nodes]);

    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden animate-fade-in-up">
            {/* Header Stats Bar - Professional Command Center Style */}
            <div className="flex flex-wrap gap-4 shrink-0">
                <div className="glass-panel px-6 py-3 flex items-center gap-4 bg-red-500/5 border-red-500/20">
                    <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Leaks</p>
                        <h3 className="text-xl font-bold text-white font-mono">{issueNodes.length}</h3>
                    </div>
                </div>
                <div className="glass-panel px-6 py-3 flex items-center gap-4 bg-green-500/5">
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-500">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Grid Stability</p>
                        <h3 className="text-xl font-bold text-white font-mono">{avgSecurityScore}%</h3>
                    </div>
                </div>
                <div className="glass-panel px-6 py-3 flex items-center gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <TrendingDown size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Loss Mitigation</p>
                        <h3 className="text-xl font-bold text-white font-mono">1.2<span className="text-xs">ML/day</span></h3>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 h-full min-h-0">
                {/* Primary Command Map */}
                <div className="flex-[2] flex flex-col gap-6">
                    <DesktopWindow
                        title="HYDRA_SCAN_PREDICTIVE_GIS"
                        headerRight={<><Zap size={14} className="text-yellow-500 animate-pulse" /> AI_PREDICTION_ACTIVE</>}
                        flex={1}
                        className="border-primary/20 shadow-[0_0_30px_rgba(13,127,242,0.05)]"
                    >
                        <div className="relative flex-1 bg-white">
                            <AdminMapWidget />
                        </div>
                    </DesktopWindow>

                    {/* Emergency Control Grid */}
                    <div className="grid grid-cols-3 gap-6 shrink-0 h-32">
                        <div className="glass-panel p-4 flex flex-col justify-between hover:bg-red-500/5 cursor-pointer group transition-all border-white/5 hover:border-red-500/30">
                            <div className="flex items-center justify-between">
                                <Navigation2 size={16} className="text-primary group-hover:rotate-45 transition-transform" />
                                <span className="text-[9px] font-black text-slate-500 uppercase">CMD_01</span>
                            </div>
                            <div>
                                <h5 className="text-[11px] font-bold text-white uppercase mb-1 tracking-wider">Zone Isolation</h5>
                                <p className="text-[10px] text-slate-500 leading-tight">Emergency shutoff for high-risk segments in Sector 4.</p>
                            </div>
                        </div>
                        <div className="glass-panel p-4 flex flex-col justify-between hover:bg-blue-500/5 cursor-pointer group transition-all border-white/5 hover:border-blue-500/30">
                            <div className="flex items-center justify-between">
                                <BarChart3 size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                                <span className="text-[9px] font-black text-slate-500 uppercase">CMD_02</span>
                            </div>
                            <div>
                                <h5 className="text-[11px] font-bold text-white uppercase mb-1 tracking-wider">Pressure Bypass</h5>
                                <p className="text-[10px] text-slate-500 leading-tight">Redirect load via secondary grid to prevent pipe fatigue.</p>
                            </div>
                        </div>
                        <div className="glass-panel p-4 flex flex-col justify-between hover:bg-green-500/5 cursor-pointer group transition-all border-white/5 hover:border-green-500/30">
                            <div className="flex items-center justify-between">
                                <HardHat size={16} className="text-green-500" />
                                <span className="text-[9px] font-black text-slate-500 uppercase">CMD_03</span>
                            </div>
                            <div>
                                <h5 className="text-[11px] font-bold text-white uppercase mb-1 tracking-wider">Smart Dispatch</h5>
                                <p className="text-[10px] text-slate-500 leading-tight">Optimize maintenance paths for the nearest field technician.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Incident Intel Panel */}
                <div className="flex-1 flex flex-col gap-6">
                    <DesktopWindow
                        title="CRISIS_INTEL_QUEUE"
                        headerRight={<Terminal size={14} className="text-slate-500" />}
                        flex={1}
                    >
                        <div className="flex-1 p-0 flex flex-col min-h-0 bg-background-dark/40">
                            <div className="flex border-b border-white/5 shrink-0">
                                <button
                                    onClick={() => setActiveTab('incidents')}
                                    className={`flex-1 py-3 text-[10px] uppercase font-black tracking-[0.2em] transition-all ${activeTab === 'incidents' ? 'text-primary border-b border-primary bg-primary/5' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    Threat Matrix
                                </button>
                                <button
                                    onClick={() => setActiveTab('comms')}
                                    className={`flex-1 py-3 text-[10px] uppercase font-black tracking-[0.2em] transition-all ${activeTab === 'comms' ? 'text-primary border-b border-primary bg-primary/5' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    Telemetry Logs
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                                {activeTab === 'incidents' ? (
                                    <div className="space-y-4">
                                        {issueNodes.length === 0 ? (
                                            <div className="py-20 text-center">
                                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                                                    <ShieldCheck size={32} className="text-green-500/40" />
                                                </div>
                                                <p className="text-[10px] font-mono font-bold text-slate-400">NOMINAL STATE: NO ACTIVE THREATS</p>
                                            </div>
                                        ) : (
                                            issueNodes.map((node, i) => (
                                                <div key={i} className={`group p-4 rounded border transition-all hover:bg-white/5 shadow-lg ${node.status === 'critical' ? 'bg-red-500/10 border-red-500/30' : 'bg-orange-500/10 border-orange-500/30'}`}>
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h4 className="text-xs font-bold text-white font-mono">{node.id}</h4>
                                                            <p className="text-[9px] text-slate-500 uppercase tracking-tighter">Lat: {node.lat?.toFixed(4) || '0.0000'} | Lng: {node.lng?.toFixed(4) || '0.0000'}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className={`text-[9px] px-2 py-0.5 rounded font-black tracking-widest ${node.status === 'critical' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
                                                                {node.status}
                                                            </span>
                                                            <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase">Burst Prob: {100 - node.integrity_score}%</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-[9px] font-black text-white rounded border border-white/5 transition-all">
                                                            TRACK SENSOR
                                                        </button>
                                                        <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-[9px] font-black rounded transition-all shadow-lg shadow-red-600/20">
                                                            ISOLATE VALVE
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-2 font-mono text-[10px] text-slate-500">
                                        <p className="text-primary/60 border-b border-primary/10 pb-1">[SYSTEM] Initializing GNN weight verification...</p>
                                        <p>... checking edge weights for Grid_Segment_A1</p>
                                        <p className="text-green-500/60">... Node N0: Signal STABLE (4ms latency)</p>
                                        <p className="text-red-500/60 font-bold">... Node N2: SIGNAL_VARIANCE_CRITICAL (Variance {'\u003E'} 24.2%)</p>
                                        <p>... Calculating pressure propagation vector...</p>
                                        <p className="text-blue-400">... Result: Prediction ID #4910: Burst Likelihood increased by 12% in Sector 4.</p>
                                        <p>... Dispatching command CMD_01 to local gateway.</p>
                                        <div className="w-2 h-4 bg-primary/40 animate-pulse mt-4"></div>
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
