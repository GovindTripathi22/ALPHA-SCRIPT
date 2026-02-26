import React, { useMemo } from 'react';
import {
    PieChart,
    TrendingDown,
    IndianRupee,
    Activity,
    AlertCircle,
    TrendingUp,
    Droplet
} from 'lucide-react';
import DesktopWindow from '../components/DesktopWindow';
import useStore from '../lib/store';

const ImpactAnalysisView = () => {
    const { nodes } = useStore((state) => state.networkData);

    const metrics = useMemo(() => {
        if (!nodes?.length) return { savedWater: 0, savedMoney: 0, activeThreats: 0, efficiency: 98 };
        const threats = nodes.filter(n => n.status !== 'healthy').length;
        // Simulated values for Hackathon Impact Pitch
        return {
            savedWater: 14500 + Math.floor(Math.random() * 500), // Liters
            savedMoney: 85000 + Math.floor(Math.random() * 5000), // INR
            activeThreats: threats,
            efficiency: threats > 5 ? 89 : 98
        };
    }, [nodes]);

    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Economic Impact Analysis</h2>
                    <p className="text-sm text-slate-400">Financial forecasting and non-revenue water (NRW) loss mitigation.</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 shrink-0">
                <div className="glass-panel p-6 flex flex-col border-green-500/20 bg-green-500/5">
                    <div className="p-3 bg-green-500/20 rounded-lg w-max mb-4">
                        <IndianRupee size={24} className="text-green-500" />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Weekly Revenue Saved</p>
                    <h3 className="text-3xl font-mono font-bold text-white">₹{metrics.savedMoney.toLocaleString()}</h3>
                </div>

                <div className="glass-panel p-6 flex flex-col border-blue-500/20 bg-blue-500/5">
                    <div className="p-3 bg-blue-500/20 rounded-lg w-max mb-4">
                        <Droplet size={24} className="text-blue-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Water Conserved</p>
                    <h3 className="text-3xl font-mono font-bold text-white">{metrics.savedWater.toLocaleString()}<span className="text-sm text-slate-500 ml-1">Liters</span></h3>
                </div>

                <div className="glass-panel p-6 flex flex-col border-primary/20 bg-primary/5">
                    <div className="p-3 bg-primary/20 rounded-lg w-max mb-4">
                        <Activity size={24} className="text-primary" />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">System Efficiency</p>
                    <h3 className="text-3xl font-mono font-bold text-white">{metrics.efficiency}%</h3>
                </div>

                <div className="glass-panel p-6 flex flex-col border-red-500/20 bg-red-500/5">
                    <div className="p-3 bg-red-500/20 rounded-lg w-max mb-4">
                        <AlertCircle size={24} className="text-red-500" />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Active Threat Cost</p>
                    <h3 className="text-3xl font-mono font-bold text-white text-red-400">₹{(metrics.activeThreats * 1500).toLocaleString()}<span className="text-sm text-slate-500 ml-1">/hr</span></h3>
                </div>
            </div>

            <div className="flex gap-6 h-full min-h-0">
                <DesktopWindow title="NRW_FINANCIAL_FORECAST" flex={2}>
                    <div className="p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
                        <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                            <TrendingUp size={18} className="text-green-500" /> Projected Recovery over 12 Months
                        </h4>

                        <div className="flex-1 relative flex items-end gap-2 pb-6 border-b border-white/10">
                            {/* Simulated Bar Chart */}
                            {[20, 35, 45, 60, 55, 70, 85, 80, 95, 110, 105, 120].map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col justify-end items-center group">
                                    <div className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary/50 transition-all border border-primary/30" style={{ height: `${val}%` }}></div>
                                    <span className="text-[8px] text-slate-500 mt-2 font-mono uppercase">M{i + 1}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Base Loss: 30%</span>
                            <span className="text-[10px] text-green-500 uppercase font-bold tracking-widest">Target Loss: {"<"} 10%</span>
                        </div>
                    </div>
                </DesktopWindow>

                <DesktopWindow title="INFRASTRUCTURE_R.O.I" flex={1}>
                    <div className="p-6 h-full flex flex-col justify-between">
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs text-white font-black uppercase tracking-widest mb-2">Piping Fatigue Costs</h4>
                                <div className="p-4 bg-white/5 border border-white/5 rounded">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-slate-400">Preventative Maintenance</span>
                                        <span className="text-xs text-green-400 font-mono font-bold">₹15 Lakh</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-400">Emergency Digs (Avoided)</span>
                                        <span className="text-xs text-red-500 font-mono font-bold line-through">₹85 Lakh</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs text-white font-black uppercase tracking-widest mb-2">Energy Output (Pumping)</h4>
                                <div className="p-4 bg-white/5 border border-white/5 rounded">
                                    <div className="flex items-end gap-2 mb-2">
                                        <div className="text-3xl font-mono font-bold text-white">420 <span className="text-sm text-slate-500">kW</span></div>
                                        <div className="text-[10px] text-green-500 font-bold mb-1 flex items-center">-12% Optimization</div>
                                    </div>
                                    <p className="text-[10px] text-slate-500 leading-tight">By dynamically adjusting pressure during off-peak hours using GNN predictions.</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest border border-white/10 rounded transition-all">
                            Export Financial Audit Report
                        </button>
                    </div>
                </DesktopWindow>
            </div>
        </div>
    );
};

export default ImpactAnalysisView;
