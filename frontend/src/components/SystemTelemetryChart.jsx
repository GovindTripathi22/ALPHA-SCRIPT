import React, { useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import useStore from '../lib/store';

const SystemTelemetryChart = () => {
    const { nodes } = useStore((state) => state.networkData);

    // Generate some simulated historical data based on current node pressure averages
    const data = useMemo(() => {
        if (!nodes || nodes.length === 0) return [];

        const avgPressure = nodes.reduce((acc, n) => acc + (n.pressure || 100), 0) / nodes.length;
        const avgFlow = nodes.reduce((acc, n) => acc + (n.flow_rate || 50), 0) / nodes.length;

        // Create a rolling window of 20 data points
        const points = [];
        let currentPressure = avgPressure;
        let currentFlow = avgFlow;

        for (let i = 20; i >= 0; i--) {
            // Add some jitter
            currentPressure += (Math.random() - 0.5) * 5;
            currentFlow += (Math.random() - 0.5) * 2;

            points.push({
                time: `T-${i}s`,
                pressure: Math.max(0, currentPressure),
                flow: Math.max(0, currentFlow),
            });
        }

        return points;
    }, [nodes]);

    return (
        <div className="w-full h-full p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4 shrink-0">
                <div>
                    <h3 className="text-sm font-bold text-slate-200">System Telemetry</h3>
                    <p className="text-xs text-slate-500">Global Pressure & Flow Correlation</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00f3ff]"></div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Pressure (PSI)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#0066ff]"></div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Flow (GPM)</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0066ff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0066ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="time" stroke="#ffffff30" fontSize={10} tickMargin={10} />
                        <YAxis stroke="#ffffff30" fontSize={10} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#101922', border: '1px solid #ffffff20', borderRadius: '8px' }}
                            itemStyle={{ fontSize: '12px' }}
                            labelStyle={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}
                        />
                        <Area type="monotone" dataKey="pressure" stroke="#00f3ff" strokeWidth={2} fillOpacity={1} fill="url(#colorPressure)" />
                        <Area type="monotone" dataKey="flow" stroke="#0066ff" strokeWidth={2} fillOpacity={1} fill="url(#colorFlow)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SystemTelemetryChart;
