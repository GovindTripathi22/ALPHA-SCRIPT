import React, { useMemo } from 'react';
import {
    Activity,
    Droplet,
    Thermometer,
    AlertTriangle,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import useStore from '../lib/store';

const KPICard = ({ title, value, unit, trend, trendValue, icon: Icon, color }) => (
    <div className="glass-panel p-4 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform`}>
                <Icon size={18} />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'
                    }`}>
                    {trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {trendValue}
                </div>
            )}
        </div>

        <div>
            <h3 className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">{title}</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white font-mono tracking-tighter">{value}</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase font-sans">{unit}</span>
            </div>
        </div>

        <div className="mt-3 w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div
                className={`bg-${color}-500 h-full opacity-80 group-hover:opacity-100 transition-all`}
                style={{ width: `${Math.min(100, (value / 150) * 100)}%` }}
            />
        </div>
    </div>
);

const KPICards = () => {
    const { nodes } = useStore((state) => state.networkData);

    const stats = useMemo(() => {
        if (!nodes?.length) return { avgPressure: 0, avgFlow: 0, anomalies: 0, quality: 98.4 };

        const avgPressure = nodes.reduce((acc, n) => acc + (n.pressure || 0), 0) / nodes.length;
        const avgFlow = nodes.reduce((acc, n) => acc + (n.flow_rate || 0), 0) / nodes.length;
        const anomalies = nodes.filter(n => n.status !== 'healthy').length;

        return {
            avgPressure: Math.round(avgPressure),
            avgFlow: Math.round(avgFlow),
            anomalies,
            quality: 98.4 // Simulated
        };
    }, [nodes]);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <KPICard
                title="Avg Pressure"
                value={stats.avgPressure}
                unit="PSI"
                icon={Activity}
                trend="up"
                trendValue="2.4%"
                color="primary"
            />
            <KPICard
                title="Flow Volume"
                value={stats.avgFlow}
                unit="GPM"
                icon={Droplet}
                trend="down"
                trendValue="1.1%"
                color="blue"
            />
            <KPICard
                title="Network Health"
                value={stats.quality}
                unit="%"
                icon={TrendingUp}
                color="green"
            />
            <KPICard
                title="Active Anomalies"
                value={stats.anomalies}
                unit="Units"
                icon={AlertTriangle}
                trend={stats.anomalies > 5 ? "up" : "down"}
                trendValue={stats.anomalies > 5 ? "Alert" : "Stable"}
                color={stats.anomalies > 0 ? "red" : "slate"}
            />
        </div>
    );
};

export default KPICards;
