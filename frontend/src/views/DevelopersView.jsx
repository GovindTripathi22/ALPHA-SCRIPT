import React from 'react';
import {
    Terminal,
    Code2,
    Key,
    BookOpen,
    Copy,
    ExternalLink,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';
import DesktopWindow from '../components/DesktopWindow';

const DevelopersView = () => {
    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Developer Environment</h2>
                    <p className="text-sm text-slate-400">Integrate HydroGraph logic into your own urban planning and utility stacks.</p>
                </div>
            </div>

            <div className="flex gap-6 h-full min-h-0">
                {/* Left: Documentation & API Keys */}
                <div className="flex-[2] flex flex-col gap-6">
                    <DesktopWindow title="API_ACCESS_CONTROLS" flex={0.6}>
                        <div className="flex-1 p-6 flex flex-col justify-center">
                            <div className="glass-panel p-4 mb-4 flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary/20 rounded text-primary"><Key size={20} /></div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Public Production Key</p>
                                        <code className="text-sm font-mono text-white">hk_prod_92x_********************</code>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white">
                                    <Copy size={16} />
                                </button>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex-1 py-3 glass-panel text-xs font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/5">
                                    <ShieldCheck size={16} className="text-green-500" /> Rotate API Key
                                </button>
                                <button className="flex-1 py-3 bg-primary text-white text-xs font-bold rounded shadow-lg shadow-primary/20 hover:bg-primary/80 transition-all">
                                    Generate Secret
                                </button>
                            </div>
                        </div>
                    </DesktopWindow>

                    <DesktopWindow title="QUICK_START_DOCUMENTATION" flex={1}>
                        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                            <div className="space-y-6">
                                <section>
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                                        <BookOpen size={16} className="text-primary" /> Core Integration
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                        HydroGraph provides a high-performance SSE stream for real-time sensor topology. Use our standard JSON schema to map pipe coordinates to your GIS system.
                                    </p>
                                    <div className="bg-black/60 rounded border border-white/10 p-4 font-mono text-[11px] text-slate-300">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-slate-500">GET /api/stream/network</span>
                                            <span className="text-green-400">200 OK</span>
                                        </div>
                                        <div className="text-blue-400">{"{"}</div>
                                        <div className="pl-4"><span className="text-slate-400">"type"</span>: <span className="text-orange-400">"update"</span>,</div>
                                        <div className="pl-4"><span className="text-slate-400">"payload"</span>: {"{"}</div>
                                        <div className="pl-8"><span className="text-slate-400">"nodes"</span>: [...],</div>
                                        <div className="pl-8"><span className="text-slate-400">"edges"</span>: [...]</div>
                                        <div className="pl-4">{"}"}</div>
                                        <div className="text-blue-400">{"}"}</div>
                                    </div>
                                </section>

                                <nav className="space-y-2">
                                    {['Webhooks', 'Auth Patterns', 'Rate Limits', 'SDKs'].map(item => (
                                        <div key={item} className="flex items-center justify-between p-3 glass-panel hover:bg-white/5 transition-all cursor-pointer group">
                                            <span className="text-xs font-bold text-slate-300 group-hover:text-white">{item}</span>
                                            <ChevronRight size={14} className="text-slate-700 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </DesktopWindow>
                </div>

                {/* Right: Terminal Console */}
                <div className="flex-1 flex flex-col gap-6">
                    <DesktopWindow title="DEBUG_TERMINAL" flex={1} headerRight={<Code2 size={14} />}>
                        <div className="flex-1 p-4 bg-black/90 font-mono text-[11px] leading-relaxed overflow-y-auto custom-scrollbar">
                            <div className="space-y-1">
                                <div className="text-slate-500">$ curl -X GET "https://api.hydrograph.ai/v2/grid/status"</div>
                                <div className="text-slate-500">&gt; Connection established...</div>
                                <div className="text-slate-500">&gt; Authorization verified.</div>
                                <div className="text-green-400">&gt; [SUCCESS] Returning grid metrics for 1,402 nodes.</div>
                                <div className="text-slate-500 mt-4">$ _</div>
                                <div className="w-2 h-4 bg-primary animate-pulse inline-block align-middle ml-1"></div>
                            </div>
                        </div>
                    </DesktopWindow>

                    <div className="glass-panel p-6 flex flex-col gap-3 shrink-0">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Status</h4>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-white">API Gateway</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                                <span className="text-[10px] text-green-500 font-bold">STABLE</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-white">SSE Stream</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                                <span className="text-[10px] text-green-500 font-bold">STABLE</span>
                            </div>
                        </div>
                        <button className="mt-2 w-full py-2 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2">
                            <ExternalLink size={12} /> View Status Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevelopersView;
