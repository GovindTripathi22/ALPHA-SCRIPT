import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useTelemetryStore from '../store/useTelemetryStore';

function ChartWidget() {
    const telemetry = useTelemetryStore((state) => state.telemetry);

    return (
        <div className="w-full h-full pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={telemetry} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#22d3ee' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="acoustic_db"
                        stroke="#22d3ee"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: '#22d3ee' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ChartWidget;
