import React from 'react';
import useStore from '../lib/store';
import DesktopWindow from '../components/DesktopWindow';
import SystemTelemetryChart from '../components/SystemTelemetryChart';
import CityMapWidget from '../components/CityMapWidget';
import KPICards from '../components/KPICards';
import AgentPanel from '../components/AgentPanel';
import { Cpu, Globe, Terminal as TerminalIcon } from 'lucide-react';

const DashboardView = () => {
    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden">
            {/* Top Row: Network Visualizer & Stats */}
            <div className="flex gap-6 h-2/3">
                {/* Telemetry Window */}
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
                        <SystemTelemetryChart />
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
