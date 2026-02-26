import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldAlert, Cpu, LogOut, BarChart3, Radio } from 'lucide-react';
import useTelemetryStore from '../store/useTelemetryStore';
import ChartWidget from '../components/ChartWidget';
import PipeDigitalTwin from '../components/PipeDigitalTwin';
import GeospatialView from '../components/GeospatialView';

function Dashboard() {
    const navigate = useNavigate();
    const currentFlow = useTelemetryStore(state => state.currentFlow);
    const currentPressure = useTelemetryStore(state => state.currentPressure);
    const anomalies = useTelemetryStore(state => state.anomalies);
    const addTelemetryData = useTelemetryStore(state => state.addTelemetryData);
    const setAnomalies = useTelemetryStore(state => state.setAnomalies);
    const updateMetrics = useTelemetryStore(state => state.updateMetrics);

    // Connect to SSE stream
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/stream');

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'initial' || data.type === 'update') {
                addTelemetryData(data.telemetry);
                setAnomalies(data.anomalies);
                updateMetrics({
                    flow: parseFloat(data.telemetry.flow_rate),
                    pressure: parseFloat(data.telemetry.pressure_psi),
                    stateLevel: data.telemetry.system_state
                });
            }
        };

        return () => eventSource.close();
    }, [addTelemetryData, setAnomalies, updateMetrics]);

    // Quick counter animation component for KPIs
    const AnimatedValue = ({ value }) => {
        const [displayValue, setDisplayValue] = React.useState(0);

        useEffect(() => {
            let start = displayValue;
            const end = parseFloat(value);
            if (start === end) return;

            const duration = 1000;
            const stepTime = Math.abs(Math.floor(duration / (end - start)));

            let timer = setInterval(() => {
                start += (end > start ? 0.1 : -0.1);
                setDisplayValue(start);
                if ((end > start && start >= end) || (start > end && start <= end)) {
                    setDisplayValue(end);
                    clearInterval(timer);
                }
            }, stepTime || 10);

            return () => clearInterval(timer);
        }, [value]);

        return <span>{displayValue.toFixed(1)}</span>;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#020617] text-white flex overflow-hidden selection:bg-cyan-500/30 font-sans"
        >
            {/* Ambient Background Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]" />
            </div>

            {/* Sidebar */}
            <div className="w-64 relative z-10 flex flex-col p-6 border-r border-white/5 bg-[#020617]/50 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 p-[1px] shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        <div className="w-full h-full bg-[#020617] rounded-lg flex items-center justify-center">
                            <Cpu className="w-4 h-4 text-cyan-400" />
                        </div>
                    </div>
                    <div className="text-xl font-bold tracking-tight text-white/90">
                        ALPHA<span className="text-cyan-400 font-black">SCRIPT</span>
                    </div>
                </div>

                <div className="space-y-2 flex-1">
                    <button className="w-full text-left px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium flex items-center gap-3 shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]">
                        <BarChart3 className="w-5 h-5" /> Overview
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white font-medium transition-all flex items-center gap-3">
                        <Radio className="w-5 h-5" /> Sensors
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white font-medium transition-all flex items-center gap-3">
                        <ShieldAlert className="w-5 h-5" /> Alerts
                    </button>
                </div>

                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mt-auto px-4 py-2 hover:bg-white/5 rounded-lg">
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4 pl-0 gap-4 relative z-10 h-screen overflow-hidden">

                {/* KPI Row */}
                <div className="flex gap-4 min-h-[8rem] shrink-0 px-2 pt-2">
                    {[
                        { label: 'Total Flow Velocity', value: currentFlow, unit: 'm/s', color: 'text-cyan-400', glow: 'drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]' },
                        { label: 'Current System Pressure', value: currentPressure, unit: 'PSI', color: 'text-blue-400', glow: 'drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]' },
                        { label: 'Active Anomalies', value: anomalies.length, unit: 'Critical', color: 'text-rose-500', noDecimals: true, glow: 'drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]' }
                    ].map((kpi, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="flex-1 glass-panel p-6 flex flex-col justify-center bg-gradient-to-br from-slate-900/60 to-[#020617]/80 border-slate-800/50 hover:border-white/10 transition-colors"
                        >
                            <div className="text-sm text-slate-400 mb-2 font-medium flex items-center justify-between">
                                {kpi.label}
                                {i === 2 && kpi.value > 0 && (
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                    </span>
                                )}
                            </div>
                            <div className={`text-4xl font-black tracking-tighter ${kpi.color} ${kpi.glow}`}>
                                {kpi.noDecimals ? kpi.value : <AnimatedValue value={kpi.value} />} <span className="text-sm font-semibold text-slate-500 tracking-normal ml-1">{kpi.unit}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mapbox & 3D Model Area */}
                <div className="flex-1 flex gap-4 min-h-0 px-2">
                    {/* Geospatial Map */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex-[2] glass-panel relative p-1 bg-[#020617] border-slate-800/80 overflow-hidden"
                    >
                        <GeospatialView />
                    </motion.div>

                    {/* 3D Pipe Viewer */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex-1 glass-panel relative p-1 bg-[#020617] border-slate-800/80 overflow-hidden"
                    >
                        <PipeDigitalTwin />
                    </motion.div>
                </div>

                {/* Charts Panel */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="h-64 glass-panel flex flex-col shrink-0 mx-2 mb-4 bg-gradient-to-t from-[#020617] to-slate-900/50 border-slate-800/80"
                >
                    <div className="w-full px-6 pt-4 pb-2 text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                        <Activity className="w-4 h-4 text-cyan-500" />
                        Acoustic Telemetry Stream
                    </div>
                    <div className="flex-1 w-[calc(100%-2rem)] mx-auto relative mb-2">
                        <ChartWidget />
                    </div>
                </motion.div>
            </div>

        </motion.div>
    );
}

export default Dashboard;
