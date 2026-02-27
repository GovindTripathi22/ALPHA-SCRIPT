import React from 'react';
import useStore from '../lib/store';
import { Leaf, Zap } from 'lucide-react';

const CarbonOffsetWidget = () => {
    const { anomalies = [] } = useStore((state) => state.networkData) || {};

    // Simulate savings based on AI intervention
    const pumpEnergySaved = 420 + (anomalies.length * 45); // kWh
    const co2Offset = (pumpEnergySaved * 0.4).toFixed(1); // kg CO2 (approx 0.4kg per kWh)
    const treesEquivalent = (co2Offset / 21).toFixed(1); // approx 21kg CO2 per tree per year

    return (
        <div className="h-full p-4 flex flex-col justify-between bg-gradient-to-br from-green-950/40 to-slate-900 border-l-[3px] border-green-500">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Leaf size={12} className="text-green-500" />
                    AI Carbon Offset
                </span>
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[9px] font-bold uppercase tracking-widest border border-green-500/20">
                    Verified
                </span>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4 my-2">
                <div>
                    <div className="text-2xl font-black text-white font-mono flex items-baseline gap-1">
                        {co2Offset} <span className="text-sm text-green-500">kg CO₂</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                        Prevented from entering atmosphere by autonomous AI leak-bypassing and pump regulation.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-white/5">
                <div className="bg-black/30 p-2 rounded flex flex-col gap-1 items-start">
                    <Zap size={12} className="text-yellow-500" />
                    <span className="text-[9px] text-slate-500 uppercase">Power Saved</span>
                    <span className="text-xs font-bold text-slate-300 font-mono">{pumpEnergySaved} kWh</span>
                </div>
                <div className="bg-black/30 p-2 rounded flex flex-col gap-1 items-start">
                    <Leaf size={12} className="text-green-500" />
                    <span className="text-[9px] text-slate-500 uppercase">Tree Eqv.</span>
                    <span className="text-xs font-bold text-slate-300 font-mono">{treesEquivalent} Trees</span>
                </div>
            </div>
        </div>
    );
};

export default CarbonOffsetWidget;
