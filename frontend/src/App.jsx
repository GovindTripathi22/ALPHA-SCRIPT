import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useStore from './lib/store';
import Sidebar from './components/Sidebar';
import DashboardView from './views/DashboardView';
import AdminDashboardView from './views/AdminDashboardView';
import PlatformView from './views/PlatformView';
import HydrologyView from './views/HydrologyView';
import DevelopersView from './views/DevelopersView';
import SettingsView from './views/SettingsView';

function App() {
    const setNetworkData = useStore((state) => state.setNetworkData);
    const setDispatchReport = useStore((state) => state.setDispatchReport);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/stream/network');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'init' || data.type === 'update') setNetworkData(data.payload);
        };
        eventSource.onerror = (error) => { eventSource.close(); };

        const pollDispatch = setInterval(async () => {
            try {
                const response = await fetch('http://localhost:5000/api/agent/dispatch');
                const data = await response.json();
                if (data.hasDispatch) setDispatchReport(data.dispatch);
                else setDispatchReport(null);
            } catch (error) { console.error("Error fetching dispatch", error); }
        }, 2000);

        return () => {
            eventSource.close();
            clearInterval(pollDispatch);
        };
    }, [setNetworkData, setDispatchReport]);

    return (
        <BrowserRouter>
            <div className="relative w-screen h-screen overflow-hidden bg-background-dark font-sans selection:bg-primary/30 selection:text-white">
                {/* Desktop Wallpaper */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div
                        className="absolute inset-0 bg-cover bg-center brightness-[0.4]"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')" }}
                    />
                    <div className="absolute inset-0 bg-background-dark/60 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                </div>

                {/* Main Desktop Layout */}
                <div className="relative z-10 w-full h-full p-4 md:p-6 flex gap-4 md:gap-6 overflow-hidden">
                    {/* Fixed Sidebar */}
                    <Sidebar />

                    {/* Routing Area */}
                    <main className="flex-1 h-full min-w-0">
                        <Routes>
                            <Route path="/" element={<DashboardView />} />
                            <Route path="/platform" element={<PlatformView />} />
                            <Route path="/hydrology" element={<HydrologyView />} />
                            <Route path="/developers" element={<DevelopersView />} />
                            <Route path="/settings" element={<SettingsView />} />
                            <Route path="/admin" element={<AdminDashboardView />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
