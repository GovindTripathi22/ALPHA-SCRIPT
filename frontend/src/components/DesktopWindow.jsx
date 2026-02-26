import React from 'react';

const DesktopWindow = ({ title, children, headerRight, flex = 1, className = "" }) => {
    return (
        <div className={`glass-panel rounded-lg flex flex-col overflow-hidden relative group shadow-2xl ${className}`} style={{ flex }}>
            {/* Window Header */}
            <div className="h-10 border-b border-white/5 bg-white/5 flex items-center justify-between px-4 shrink-0 pointer-events-auto">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                    <span className="ml-2 text-xs text-slate-400 font-medium tracking-wide uppercase truncate max-w-[150px]">{title}</span>
                </div>
                {headerRight && (
                    <div className="flex gap-4 text-xs text-slate-500 font-mono">
                        {headerRight}
                    </div>
                )}
            </div>

            {children}
        </div>
    );
};

export default DesktopWindow;
