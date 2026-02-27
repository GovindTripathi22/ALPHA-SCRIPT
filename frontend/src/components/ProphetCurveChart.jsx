import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const generateProphetData = () => {
    const data = [];
    let base = 500;
    for (let i = 0; i < 24; i++) {
        const hour = (new Date().getHours() + i) % 24;
        const timeLabel = `${hour.toString().padStart(2, '0')}:00`;

        // Simulate peak hours morning and evening
        let demand = base;
        if (hour >= 6 && hour <= 9) demand += 300 + Math.random() * 100;
        else if (hour >= 18 && hour <= 21) demand += 400 + Math.random() * 150;
        else demand += (Math.random() - 0.5) * 100;

        // Simulate AI pre-adjustment (lower pressure right before peaks to prevent bursts)
        const autoAdjustment = (hour === 5 || hour === 17) ? -150 : 0;

        data.push({
            time: timeLabel,
            predictedDemand: Math.round(demand),
            aiAdjustment: autoAdjustment,
            actualPressure: Math.round(demand + autoAdjustment)
        });
    }
    return data;
};

const ProphetCurveChart = () => {
    const data = React.useMemo(() => generateProphetData(), []);

    return (
        <div className="w-full h-full flex flex-col p-4">
            <div className="flex justify-between items-center mb-4 shrink-0">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">24h Demand Forecasting</span>
                    <span className="text-[10px] text-slate-500 font-mono">MODEL: fbprophet-v3.1-fluid</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> predicted</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-cyan-400 rounded-full"></div> optimized</div>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="time" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                            labelStyle={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px' }}
                        />
                        <Area type="monotone" dataKey="predictedDemand" name="Raw Demand" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorDemand)" />
                        <Area type="monotone" dataKey="actualPressure" name="AI Regulated" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorOpt)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProphetCurveChart;
