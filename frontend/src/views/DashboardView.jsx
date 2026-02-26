import React from 'react';
import useStore from '../lib/store';
import DesktopWindow from '../components/DesktopWindow';
import SystemTelemetryChart from '../components/SystemTelemetryChart';
import CityMapWidget from '../components/CityMapWidget';
import KPICards from '../components/KPICards';
import AgentPanel from '../components/AgentPanel';
import { Cpu, Globe, Terminal as TerminalIcon } from 'lucide-react';

const DashboardView = () => {
    const { networkData, setNetworkData } = useStore();

    const triggerManualAnomaly = () => {
        // Force the leak client-side immediately for guaranteed functionality
        if (!networkData.nodes || networkData.nodes.length === 0) {
            // If nodes aren't loaded yet, try a brief wait or just return
            console.warn("No nodes found in store to trigger leak.");
            return;
        }

        const updatedNodes = networkData.nodes.map((n, i) => {
            // Force a massive leak on Node 1 (central Nagpur node)
            if (n.id === 'N1' || i === 1) {
                return {
                    ...n,
                    status: 'critical',
                    integrity_score: 12,
                    flow_rate: 84.2, // Simulated high flow
                    pressure: 27.0   // Simulated low pressure
                };
            }
            return n;
        });

        setNetworkData({
            ...networkData,
            nodes: updatedNodes,
            systemState: 'ANOMALOUS'
        });

        // Try the backend in background if it exists
        fetch('http://localhost:5000/api/trigger-anomaly', { method: 'POST' }).catch(() => { });
    };

    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden">
            {/* Action Bar */}
            <div className="flex justify-end shrink-0">
                <button
                    onClick={triggerManualAnomaly}
                    className="bg-red-600 hover:bg-red-500 text-white font-black uppercase text-[10px] tracking-[0.2em] px-6 py-3 rounded shadow-[0_0_20px_rgba(220,38,38,0.4)] border border-red-500 transition-all flex items-center gap-2 group"
                >
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    Trigger Torricelli Pipe Leak
                </button>
            </div>

            {/* Top Row: Network Visualizer & Stats */}
            <div className="flex gap-6 h-2/3">
                <DesktopWindow
                    title="Global_Telemetry_Matrix.exe"
                    headerRight={
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Cpu size={12} className="text-primary" /> CPU: 14%</span>
                            <span className="text-green-500">LIVE</span>
                        </div>
                    }
                    flex={2}
                >
                    <div className="relative flex-1 bg-black/20">
                        <div className="absolute inset-0">
                            <SystemTelemetryChart />
                        </div>
                    </div>
                </DesktopWindow>

                {/* Geospatial Window */}
                <DesktopWindow
                    title="City_Grid_Nagpur.map"
                    headerRight={
                        <div className="flex items-center gap-1 text-primary">
                            <Globe size={12} /> SYNCED
                        </div>
                    }
                    flex={1}
                >
                    <div className="flex-1 relative bg-slate-900 overflow-hidden">
                        <CityMapWidget />
                    </div>
                </DesktopWindow>
            </div>

            {/* Bottom Row: Agent Console & Real-time Metrics */}
            <div className="flex gap-6 h-1/3 min-h-[250px] shrink-0">
                {/* Metrics Dashboard */}
                <DesktopWindow
                    title="Live_Metrics_Console.bin"
                    headerRight={<div className="text-[10px] text-slate-500 uppercase">Buffer: 4.8MB</div>}
                    flex={2}
                >
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                        <KPICards />
                    </div>
                </DesktopWindow>

                {/* AI Dispatcher Window */}
                <DesktopWindow
                    title="Dispatch_Agent_Llama3.log"
                    headerRight={<TerminalIcon size={14} className="text-slate-500" />}
                    flex={1}
                >
                    <div className="flex-1 overflow-hidden">
                        <AgentPanel />
                    </div>
                </DesktopWindow>
            </div>
        </div>
    );
};

export default DashboardView;
