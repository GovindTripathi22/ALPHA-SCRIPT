import React from 'react';
import {
    Network,
    Cpu,
    Activity,
    Database,
    Search,
    Plus,
    ArrowRight,
    Monitor
} from 'lucide-react';
import DesktopWindow from '../components/DesktopWindow';

const PlatformView = () => {
    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">System Infrastructure</h2>
                    <p className="text-sm text-slate-400">Deep-analysis of virtual sensing nodes and GNN processing layers.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 glass-panel text-xs text-white hover:bg-white/10 transition-colors">
                        <Search size={14} /> Search Node
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white text-xs font-bold rounded shadow-lg shadow-primary/20 hover:bg-primary/80 transition-all">
                        <Plus size={14} /> Deploy Node
                    </button>
                </div>
            </div>

            <div className="flex gap-6 h-full min-h-0">
                {/* Main Infrastructure Overview */}
                <div className="flex-[3] flex flex-col gap-6">
                    <div className="grid grid-cols-3 gap-6 shrink-0">
                        <div className="glass-panel p-6 border-l-4 border-primary">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/20 rounded text-primary"><Network size={20} /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node Density</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-mono mb-1">1,402</div>
                            <p className="text-[10px] text-green-400 flex items-center gap-1 font-bold">+12 since last reload</p>
                        </div>
                        <div className="glass-panel p-6 border-l-4 border-blue-400">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-400/20 rounded text-blue-400"><Cpu size={20} /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">GNN Epochs</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-mono mb-1">42,801</div>
                            <p className="text-[10px] text-blue-400 flex items-center gap-1 font-bold">Latency: 0.12ms</p>
                        </div>
                        <div className="glass-panel p-6 border-l-4 border-purple-400">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-400/20 rounded text-purple-400"><Database size={20} /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Virtual Memory</span>
                            </div>
                            <div className="text-3xl font-bold text-white font-mono mb-1">2.4<span className="text-sm font-sans font-normal text-slate-500 ml-1">PB</span></div>
                            <p className="text-[10px] text-purple-400 flex items-center gap-1 font-bold">Compressed Storage</p>
                        </div>
                    </div>

                    <DesktopWindow title="LOGICAL_INFRASTRUCTURE_VIEWER" flex={1}>
                        <div className="flex-1 bg-black/40 relative overflow-hidden p-8 flex items-center justify-center">
                            {/* Decorative Background for the Logic Graph */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                                {/* Mock Logic Graph visualization */}
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-2xl bg-primary shadow-[0_0_30px_rgba(13,127,242,0.5)] flex items-center justify-center text-white mb-20 mx-auto border-2 border-white/20">
                                        <Monitor size={32} />
                                        <div className="absolute -bottom-6 text-[10px] font-bold text-white tracking-widest uppercase">Master</div>
                                    </div>

                                    <div className="flex gap-20">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="relative">
                                                {/* Connector Lines */}
                                                <div className="absolute bottom-full left-1/2 w-px h-20 bg-gradient-to-t from-primary/50 to-transparent -translate-x-1/2 -mb-2"></div>

                                                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 shadow-xl hover:border-primary transition-all cursor-pointer group">
                                                    <Activity size={20} className="group-hover:text-primary transition-colors" />
                                                    <div className="absolute -bottom-6 text-[9px] font-bold text-slate-500 tracking-tighter uppercase whitespace-nowrap">Grid_Segment_{i}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DesktopWindow>
                </div>

                {/* Right Detail Sidebar */}
                <div className="flex-1 flex flex-col gap-6">
                    <DesktopWindow title="NODE_HEALTH_INDEX" flex={1}>
                        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="flex items-center justify-between p-3 glass-panel group cursor-pointer hover:bg-white/5 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 font-mono text-xs">
                                                0{i}
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-bold text-white tracking-tight">NAGPUR_SEC_{102 + i}</h4>
                                                <p className="text-[9px] text-slate-500">Uptime: 402h 12m</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-right">
                                                <div className="text-[10px] font-mono text-green-400">PASS</div>
                                                <div className="text-[8px] text-slate-600">99.8%</div>
                                            </div>
                                            <ArrowRight size={12} className="text-slate-700 group-hover:text-white transition-colors" />
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

export default PlatformView;
