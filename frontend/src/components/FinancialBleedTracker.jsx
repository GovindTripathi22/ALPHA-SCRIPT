import React, { useState, useEffect } from 'react';
import useStore from '../lib/store';
import { IndianRupee, TrendingDown } from 'lucide-react';

const FinancialBleedTracker = () => {
    const { anomalies = [] } = useStore((state) => state.networkData) || {};
    const [totalLost, setTotalLost] = useState(142050);
    const [ratePerSec, setRatePerSec] = useState(2.45);

    useEffect(() => {
        // Calculate dynamic bleed rate based on active anomalies
        const activeCount = anomalies.length;
        const newRate = 2.45 + (activeCount * 18.75); // base + spike per anomaly
        setRatePerSec(newRate);

        const interval = setInterval(() => {
            setTotalLost(prev => prev + newRate);
        }, 1000);

        return () => clearInterval(interval);
    }, [anomalies]);

    return (
        <div className="h-full flex flex-col p-4 justify-center bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <IndianRupee size={12} className="text-red-500" />
                    Real-Time Financial Bleed
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${anomalies.length > 0 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-green-500/20 text-green-400'}`}>
                    ₹{ratePerSec.toFixed(2)} / sec
                </span>
            </div>

            <div className="text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-1">
                <span className="text-slate-500 text-xl">₹</span>
                {totalLost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase">Est. Purification Cost Wasted</span>
                    <span className="text-xs font-bold text-slate-300">₹{(totalLost * 0.4).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-[9px] text-slate-500 uppercase">Pumping Energy Wasted</span>
                    <span className="text-xs font-bold text-slate-300">₹{(totalLost * 0.6).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
            </div>
        </div>
    );
};

export default FinancialBleedTracker;
