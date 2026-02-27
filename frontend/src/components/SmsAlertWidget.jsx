import React, { useEffect, useState } from 'react';
import useStore from '../lib/store';
import { Smartphone, CheckCheck } from 'lucide-react';

const SmsAlertWidget = () => {
    const { anomalies = [] } = useStore((state) => state.networkData) || {};
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (anomalies.length > 0) {
            const latest = anomalies[0];
            const newMsg = {
                id: Date.now(),
                text: `ALERT: Water pressure dropping in ${latest.nodeId} zone due to emergency isolation. Teams dispatched.`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                status: 'sending'
            };
            setMessages(prev => [newMsg, ...prev].slice(0, 5));

            // Simulate delivery
            setTimeout(() => {
                setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m));
            }, 1500);
        }
    }, [anomalies]);

    if (messages.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-slate-600 text-xs font-mono p-4 text-center">
                Awaiting anomaly detection to trigger automated SMS broadcast protocols...
            </div>
        );
    }

    return (
        <div className="p-3 space-y-3 overflow-y-auto h-full custom-scrollbar">
            {messages.map((msg, i) => (
                <div key={msg.id} className="animate-fade-in-up flex gap-3 bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                        <Smartphone size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-slate-400">CITIZEN BROADCAST</span>
                            <span className="text-[9px] text-slate-500 font-mono">{msg.time}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-snug">{msg.text}</p>
                        <div className="flex items-center gap-1 mt-2 justify-end">
                            <span className="text-[9px] text-slate-500 uppercase font-bold">
                                {msg.status === 'sending' ? 'Dispatching...' : '14,203 Delivered'}
                            </span>
                            {msg.status === 'delivered' && <CheckCheck size={12} className="text-cyan-400" />}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SmsAlertWidget;
