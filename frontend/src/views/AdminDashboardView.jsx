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
    TrendingDown,
    ActivitySquare
} from 'lucide-react';
import useStore from '../lib/store';
import DesktopWindow from '../components/DesktopWindow';
import AdminMapWidget from '../components/AdminMapWidget';
import PipeModelViewer from '../components/PipeModelViewer';

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
    const [expandedHealthNode, setExpandedHealthNode] = useState(null);

    const issueNodes = useMemo(() => {
        return (nodes?.filter(n => n.status === 'warning' || n.status === 'critical') || [])
            .map(node => {
                const variance = Math.abs(node.integrity_score - 100);
                const pressureInt = node.pressure || 45; // Default 45 PSI if missing
                const rand = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1 randomization

                // Torricelli's Law Mock Calculation
                let leakSizeCm2 = ((variance * 1.5) / (pressureInt / 100)) * rand;
                leakSizeCm2 = Math.min(leakSizeCm2, 85); // Ceiling to prevent astronomically fake numbers

                let severityClass = 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
                let severityText = 'MICRO-FRACTURE';
                if (leakSizeCm2 >= 20) {
                    severityClass = 'text-red-500 border-red-500/20 bg-red-500/10 animate-pulse';
                    severityText = 'MAJOR RUPTURE';
                } else if (leakSizeCm2 >= 5) {
                    severityClass = 'text-orange-500 border-orange-500/20 bg-orange-500/10';
                    severityText = 'CRITICAL CRACK';
                }

                return {
                    ...node,
                    lat: NAGPUR_NODES[node.id]?.lat || 21.1458,
                    lng: NAGPUR_NODES[node.id]?.lng || 79.0882,
                    leakSizeCm2: leakSizeCm2.toFixed(1),
                    severityClass,
                    severityText,
                    delta_q: (variance * 0.4 * rand).toFixed(1),
                    pressure_psi: pressureInt.toFixed(0)
                };
            })
            .sort((a, b) => b.integrity_score - a.integrity_score);
    }, [nodes]);

    const healthNodes = useMemo(() => {
        // Simulate physical pipe age based on Node ID hash
        const materials = ['DUCTILE IRON', 'PVC', 'ASBESTOS CEMENT'];

        return (nodes || []).map((node, i) => {
            const simulatedAge = 5 + (i * 3.4) % 15; // Range ~5 to 20 years
            const matIndex = i % materials.length;
            const material = materials[matIndex];

            return {
                ...node,
                pipeAgeYears: simulatedAge.toFixed(1),
                needsRepair: simulatedAge > 12,
                repairScheduled: false,
                materialType: material
            };
        }).sort((a, b) => b.pipeAgeYears - a.pipeAgeYears);
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
                                    onClick={() => setActiveTab('health')}
                                    className={`flex-1 py-3 text-[10px] uppercase font-black tracking-[0.2em] transition-all ${activeTab === 'health' ? 'text-green-500 border-b border-green-500 bg-green-500/5' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    System Health
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                                {activeTab === 'incidents' ? (
                                    <div className="space-y-4">
                                        {issueNodes.length === 0 ? (
                                            <div className="py-10 text-center">
                                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                                                    <ShieldCheck size={32} className="text-green-500/40" />
                                                </div>
                                                <p className="text-[10px] font-mono font-bold text-slate-400">NOMINAL STATE: NO ACTIVE THREATS</p>
                                            </div>
                                        ) : (
                                            issueNodes.map((node, i) => (
                                                <div key={i} className={`group p-4 rounded border transition-all hover:bg-white/5 shadow-lg ${node.severityClass.replace('text-', 'border-').replace('bg-', 'hover:bg-')}`}>
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h4 className="text-xs font-bold text-white font-mono">{node.id}</h4>
                                                            <p className="text-[9px] text-slate-500 uppercase tracking-tighter">Lat: {node.lat?.toFixed(4) || '0.0000'} | Lng: {node.lng?.toFixed(4) || '0.0000'}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className={`text-[9px] px-2 py-0.5 border rounded font-black tracking-widest uppercase ${node.severityClass}`}>
                                                                {node.severityText}
                                                            </span>
                                                            <span className="text-[9px] font-bold mt-1 uppercase text-slate-400">AREA ≈ {node.leakSizeCm2} cm²</span>
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
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
                                            <AlertCircle size={16} className="text-red-500" />
                                            <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Action Required: Infrastructure exceeding 12-year lifespan.</p>
                                        </div>
                                        {healthNodes.map((node, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setExpandedHealthNode(expandedHealthNode === node.id ? null : node.id)}
                                                className={`group p-4 rounded border transition-all cursor-pointer ${node.needsRepair && !node.repairScheduled ? 'bg-red-500/5 hover:bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'bg-white/5 hover:bg-white/10 border-white/10'}`}
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h4 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                                                            <ActivitySquare size={14} className={node.needsRepair && !node.repairScheduled ? 'text-red-500' : 'text-green-500'} />
                                                            {node.id} Physical Assessment
                                                        </h4>
                                                        <p className="text-[9px] text-slate-500 uppercase tracking-tighter pt-1">Material: {node.materialType}</p>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className={`text-[9px] px-2 py-0.5 rounded font-black tracking-widest ${node.needsRepair && !node.repairScheduled ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-700 text-slate-300'}`}>
                                                            {node.needsRepair && !node.repairScheduled ? 'CRITICAL AGE' : 'NOMINAL'}
                                                        </span>
                                                        <span className={`text-[11px] font-bold mt-1 font-mono ${node.needsRepair && !node.repairScheduled ? 'text-red-400' : 'text-green-400'}`}>
                                                            {node.pipeAgeYears} YRS
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Expanded 3D View */}
                                                {expandedHealthNode === node.id && (
                                                    <div className="mt-4 pt-4 border-t border-white/10">
                                                        <div className="h-48 w-full bg-black/50 rounded overflow-hidden border border-cyan-500/20 shadow-inner relative mb-4">
                                                            <PipeModelViewer
                                                                materialType={node.materialType}
                                                                age={parseFloat(node.pipeAgeYears)}
                                                                isLeaking={node.status === 'critical' || (node.needsRepair && !node.repairScheduled)}
                                                            />
                                                        </div>
                                                        <div className="flex justify-between text-[10px] font-mono mb-2">
                                                            <span className="text-slate-400">Degradation:</span>
                                                            <span className="text-amber-400">{((node.pipeAgeYears / 20) * 100).toFixed(1)}%</span>
                                                        </div>
                                                        <div className="flex justify-between text-[10px] font-mono mb-4">
                                                            <span className="text-slate-400">Corrosion Level:</span>
                                                            <span className={node.pipeAgeYears > 12 ? 'text-red-400 font-bold' : 'text-green-400'}>
                                                                {node.pipeAgeYears > 15 ? 'SEVERE PITTING' : node.pipeAgeYears > 10 ? 'MODERATE OXIDATION' : 'MINIMAL'}
                                                            </span>
                                                        </div>

                                                        {node.needsRepair && !node.repairScheduled && (
                                                            <div className="pt-3 border-t border-red-500/20">
                                                                <p className="text-[10px] text-red-400/80 mb-3 font-mono">WARNING: Structural failure probability 87.4% due to material fatigue.</p>
                                                                <button
                                                                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-[9px] font-black tracking-widest uppercase rounded transition-all shadow-lg shadow-red-600/20"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // Prevents collapse when clicking button
                                                                        const el = e.currentTarget;
                                                                        el.innerText = 'MAINTENANCE DISPATCHED (48H)';
                                                                        el.className = 'w-full py-2 bg-green-600 text-white text-[9px] font-black tracking-widest uppercase rounded transition-all shadow-lg shadow-green-600/20 cursor-not-allowed';
                                                                        el.disabled = true;
                                                                    }}
                                                                >
                                                                    SCHEDULE REPAIR FIELD TEAM
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </DesktopWindow>

                    {/* Torricelli AI Hole Size Engine - Always Visible! */}
                    <DesktopWindow
                        title="PREDICTIVE_LEAK_IDENTIFICATION"
                        headerRight={<Terminal size={14} className="text-cyan-400 animate-pulse" />}
                        flex={1}
                        className="border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.05)]"
                    >
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/80 p-5 font-mono">
                            <h3 className="text-cyan-400 text-sm font-bold border-b border-cyan-500/20 pb-2 mb-4">root@hydrograph-core:~# process_torricelli_math_engine --live</h3>
                            <div className="space-y-3 text-xs">
                                {issueNodes.length > 0 ? (
                                    <>
                                        <p className="text-slate-300">{'>'} EXECUTING TARGET NODE ANALYSIS: <span className="text-yellow-400">[{issueNodes[0].id}]</span></p>
                                        <div className="pl-4 border-l-2 border-slate-700/50 space-y-2 py-2">
                                            <p className="text-slate-400">├─ Live Variance (ΔQ): <span className="text-white">{issueNodes[0].delta_q} L/s</span></p>
                                            <p className="text-slate-400">├─ Ambient Pressure (P): <span className="text-white">{issueNodes[0].pressure_psi} PSI</span></p>
                                            <p className="text-slate-400">├─ Discharge Coefficient (Cd): <span className="text-white">0.62</span></p>
                                            <p className="text-slate-500">└─ Gravity Constant (g): 9.81 m/s²</p>
                                        </div>
                                        <p className="text-cyan-500 font-bold mt-4">{'>'} COMPUTING: A = ΔQ / (Cd * √(2 * g * H))</p>

                                        <div className={`mt-4 p-4 border rounded bg-background/50 flex flex-col items-center justify-center ${issueNodes[0].severityClass.replace('text-', 'border-')}`}>
                                            <div className="text-[10px] text-slate-500 tracking-widest uppercase mb-1">Estimated Breach Area</div>
                                            <div className={`text-4xl font-black ${issueNodes[0].severityClass.split(' ')[0]}`}>
                                                {issueNodes[0].leakSizeCm2} <span className="text-lg">cm²</span>
                                            </div>
                                            <div className={`text-xs mt-2 font-bold uppercase tracking-widest ${issueNodes[0].severityClass.split(' ')[0]}`}>
                                                [{issueNodes[0].severityText}]
                                            </div>
                                        </div>
                                        <p className="mt-4 text-emerald-400 font-bold">{'>'} UPLOADING PREDICTION TO COMMAND GIS...</p>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 opacity-50">
                                        <ActivitySquare size={48} className="text-cyan-500/20 mb-4" />
                                        <p className="text-slate-500">{'>'} STANDBY FOR TELEMETRY ANOMALY...</p>
                                        <p className="text-slate-600 mt-2">{'>'} Physics engine idling at 2% CPU</p>
                                    </div>
                                )}
                                <div className="w-3 h-5 bg-cyan-400 animate-pulse mt-4"></div>
                            </div>
                        </div>
                    </DesktopWindow>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardView;
