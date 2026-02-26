import React, { useState } from 'react';
import {
    Settings as SettingsIcon,
    User,
    Bell,
    Monitor,
    Shield,
    Trash2,
    ChevronRight,
    LogOut,
    Save
} from 'lucide-react';
import DesktopWindow from '../components/DesktopWindow';

const SettingsView = () => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: SettingsIcon },
        { id: 'account', label: 'Account', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'display', label: 'Display', icon: Monitor },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="flex-1 h-full flex flex-col gap-6 overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">System Configuration</h2>
                    <p className="text-sm text-slate-400">Manage your workspace preferences, alert thresholds, and security parameters.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white text-sm font-bold rounded shadow-lg shadow-primary/20 hover:bg-primary/80 transition-all">
                    <Save size={16} /> Save Changes
                </button>
            </div>

            <div className="flex gap-6 h-full min-h-0">
                {/* Navigation Sidebar */}
                <div className="w-64 flex flex-col gap-2 shrink-0">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center justify-between p-4 glass-panel group transition-all ${activeTab === tab.id ? 'bg-primary/10 border-primary/40 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <div className="flex items-center gap-3">
                                <tab.icon size={18} className={activeTab === tab.id ? 'text-primary' : 'group-hover:text-slate-300'} />
                                <span className="text-sm font-bold tracking-tight">{tab.label}</span>
                            </div>
                            {activeTab === tab.id && <ChevronRight size={14} className="text-primary" />}
                        </button>
                    ))}

                    <div className="mt-auto pointer-events-auto">
                        <button className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-500/10 rounded-lg transition-all group">
                            <LogOut size={18} />
                            <span className="text-sm font-bold tracking-tight">System Logout</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col gap-6">
                    <DesktopWindow title={`${activeTab.toUpperCase()}_PREFERENCES`} flex={1}>
                        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                            <div className="max-w-2xl space-y-8">
                                {activeTab === 'general' && (
                                    <>
                                        <section>
                                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                                <SettingsIcon size={16} className="text-primary" /> Application Settings
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm text-slate-200">Autonomous Dispatching</p>
                                                        <p className="text-xs text-slate-500">Allow AI agents to automatically handle minor anomalies.</p>
                                                    </div>
                                                    <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                                                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                                    <div>
                                                        <p className="text-sm text-slate-200">System Telemetry Log Level</p>
                                                        <p className="text-xs text-slate-500">Determines the verbosity of telemetry data collected.</p>
                                                    </div>
                                                    <select className="bg-slate-900 border border-white/10 text-xs text-white rounded px-3 py-1.5 focus:ring-primary/50 outline-none">
                                                        <option>Standard (Optimized)</option>
                                                        <option>Verbose (Debugging)</option>
                                                        <option>Minimal (Performance)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </section>

                                        <section className="pt-8 border-t border-white/10">
                                            <h3 className="text-sm font-bold text-red-500 mb-4 flex items-center gap-2">
                                                <Trash2 size={16} /> Danger Zone
                                            </h3>
                                            <div className="glass-panel p-4 bg-red-500/5 border-red-500/20 flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-slate-200">Factory Reset</p>
                                                    <p className="text-xs text-slate-500">Clear all local configuration and session data.</p>
                                                </div>
                                                <button className="px-4 py-2 border border-red-500/30 text-red-500 text-xs font-bold rounded hover:bg-red-500 hover:text-white transition-all">
                                                    RESET SYSTEM
                                                </button>
                                            </div>
                                        </section>
                                    </>
                                )}

                                {activeTab !== 'general' && (
                                    <div className="py-20 text-center opacity-40">
                                        <SettingsIcon size={48} className="mx-auto mb-4 animate-spin-slow" />
                                        <h3 className="text-xl font-bold text-white mb-2">Module Offline</h3>
                                        <p className="text-sm text-slate-400">Settings for {activeTab} are being migrated to the v2.0 environment.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </DesktopWindow>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
