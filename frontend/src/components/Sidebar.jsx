import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Layers, Droplets, PieChart, Sliders, LogIn, ShieldAlert } from 'lucide-react';

const Sidebar = () => {
    const getNavClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded transition-all ${isActive
            ? 'bg-primary/20 text-white border border-primary/30 shadow-[0_0_15px_rgba(13,127,242,0.15)]'
            : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
        }`;

    const getAdminNavClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded transition-all mt-4 ${isActive
            ? 'bg-red-500/20 text-red-500 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
            : 'text-red-400/70 hover:text-red-500 hover:bg-red-500/10 border border-transparent'
        }`;

    return (
        <aside className="hidden lg:flex flex-col w-64 shrink-0 glass-panel rounded-lg overflow-hidden h-full animate-fade-in-up shadow-2xl">
            {/* Window Header */}
            <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-xs text-slate-400 font-medium tracking-wide uppercase">Menu</span>
            </div>

            {/* Nav Content */}
            <div className="flex-1 flex flex-col justify-between p-4 custom-scrollbar overflow-y-auto pointer-events-auto">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <h1 className="text-white text-xl font-bold leading-tight tracking-tight">Alpha Script</h1>
                        <p className="text-primary text-xs font-mono mt-1">v2.0 System Online</p>
                    </div>

                    <nav className="flex flex-col gap-1">
                        <NavLink to="/" className={getNavClass}>
                            <Home size={20} />
                            <span className="text-sm font-medium">Dashboard</span>
                        </NavLink>
                        <NavLink to="/platform" className={getNavClass}>
                            <Layers size={20} />
                            <span className="text-sm font-medium">Platform</span>
                        </NavLink>
                        <NavLink to="/hydrology" className={getNavClass}>
                            <Droplets size={20} />
                            <span className="text-sm font-medium">Hydrology</span>
                        </NavLink>
                        <NavLink to="/impact" className={getNavClass}>
                            <PieChart size={20} />
                            <span className="text-sm font-medium">Impact Analysis</span>
                        </NavLink>
                        <NavLink to="/control" className={getNavClass}>
                            <Sliders size={20} />
                            <span className="text-sm font-medium">System Control</span>
                        </NavLink>

                        <div className="h-px bg-white/10 my-2"></div>

                        <NavLink to="/admin" className={getAdminNavClass}>
                            <ShieldAlert size={20} />
                            <span className="text-sm font-medium">Admin Panel</span>
                        </NavLink>
                    </nav>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <button className="w-full flex items-center justify-center gap-2 h-10 px-4 rounded btn-primary-glow cursor-pointer">
                        <span>Login</span>
                        <LogIn size={18} />
                    </button>

                    <div className="mt-4 flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-slate-800">
                            <div className="w-full h-full bg-gradient-to-br from-primary to-blue-400" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background-dark"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-white">Guest User</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Read-only access</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
