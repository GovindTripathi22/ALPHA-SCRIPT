import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import useStore from '../lib/store';
import 'leaflet/dist/leaflet.css';

// Hardcoded coordinates for 10 intersections in Amravati, Maharashtra
const AMRAVATI_NODES = {
    N0: { lat: 20.9320, lng: 77.7523 }, // Amravati Central
    N1: { lat: 20.9400, lng: 77.7400 },
    N2: { lat: 20.9250, lng: 77.7600 },
    N3: { lat: 20.9150, lng: 77.7650 },
    N4: { lat: 20.9500, lng: 77.7450 },
    N5: { lat: 20.9350, lng: 77.7300 },
    N6: { lat: 20.9200, lng: 77.7400 },
    N7: { lat: 20.9450, lng: 77.7600 },
    N8: { lat: 20.9100, lng: 77.7500 },
    N9: { lat: 20.9550, lng: 77.7350 }
};

// Custom Marker Creator (DivIcon)
const createMarkerIcon = (status) => {
    let color = '#00f3ff'; // neon-cyan
    let shadowColor = 'rgba(0, 243, 255, 0.6)';
    let animateClass = '';

    if (status === 'critical') {
        color = '#ff3333';
        shadowColor = 'rgba(255, 51, 51, 0.8)';
        animateClass = 'animate-ping';
    } else if (status === 'warning') {
        color = '#facc15';
        shadowColor = 'rgba(250, 204, 21, 0.6)';
        animateClass = 'animate-pulse';
    }

    return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-6 h-6 rounded-full bg-[${color}] opacity-40 ${animateClass}"></div>
        <div class="relative w-3 h-3 rounded-full border border-white/20 shadow-lg" 
             style="background-color: ${color}; box-shadow: 0 0 10px ${shadowColor}"></div>
      </div>
    `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

const CityMapWidget = () => {
    const { nodes } = useStore((state) => state.networkData);
    const [showEvacuation, setShowEvacuation] = useState(false);

    const mappedNodes = useMemo(() => {
        if (!nodes?.length) return [];
        return nodes.map(node => ({
            ...node,
            lat: AMRAVATI_NODES[node.id]?.lat || 20.9320,
            lng: AMRAVATI_NODES[node.id]?.lng || 77.7523
        }));
    }, [nodes]);

    return (
        <div className="w-full h-full relative z-0">
            <MapContainer
                center={[20.9320, 77.7523]}
                zoom={14}
                style={{ height: '100%', width: '100%', background: '#101922' }}
                zoomControl={false}
            >
                {/* Dark Themed Tile Layer from CartoDB */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {mappedNodes.map((node) => (
                    <Marker
                        key={node.id}
                        position={[node.lat, node.lng]}
                        icon={createMarkerIcon(node.status)}
                    >
                        <Popup className="custom-popup">
                            <div className="p-1 font-sans">
                                <h3 className="font-bold text-slate-800">Node: {node.id}</h3>
                                <p className="text-xs text-slate-600">Status: <span className="uppercase font-mono">{node.status}</span></p>
                                <p className="text-xs text-slate-600">Health: {node.integrity_score}%</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Emergency Evacuation / Detour Routes */}
                {showEvacuation && mappedNodes.filter(n => n.status === 'critical').map(node => {
                    // Generate a simple detour box around the critical node
                    const detourPath = [
                        [node.lat + 0.006, node.lng - 0.006],
                        [node.lat + 0.008, node.lng],
                        [node.lat + 0.006, node.lng + 0.006],
                        [node.lat - 0.006, node.lng + 0.006],
                        [node.lat - 0.008, node.lng],
                        [node.lat - 0.006, node.lng - 0.006],
                    ];

                    return (
                        <React.Fragment key={`evac-${node.id}`}>
                            {/* Road Closed Danger Zone */}
                            <Circle
                                center={[node.lat, node.lng]}
                                radius={400}
                                pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3, weight: 2, dashArray: '10, 10' }}
                            />
                            {/* Alternate Safe Route for Traffic */}
                            <Polyline
                                positions={detourPath}
                                pathOptions={{ color: '#00f3ff', weight: 5, dashArray: '5, 10', opacity: 0.9 }}
                            />
                        </React.Fragment>
                    );
                })}
            </MapContainer>

            {/* Map Overlay Logic */}
            <div className="absolute top-4 right-4 z-[1000] pointer-events-auto flex flex-col gap-2 items-end">
                <div className="glass-panel px-3 py-1.5 flex items-center gap-2 border border-white/10 shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Live Satellite Relay</span>
                </div>
                <button
                    onClick={() => setShowEvacuation(!showEvacuation)}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded shadow-lg transition-all ${showEvacuation ? 'bg-cyan-500 text-white shadow-cyan-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'}`}
                >
                    {showEvacuation ? 'Hide Safe Routes' : 'Show Alternate Routes'}
                </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-[1000] glass-panel p-3 text-xs bg-black/60 pointer-events-none border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 bg-neon-cyan rounded-full"></div>
                    <span className="text-slate-300 font-medium">Healthy Node</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-slate-300 font-medium">Anomaly Detected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full shadow-[0_0_5px_red]"></div>
                    <span className="text-red-400 font-bold tracking-widest uppercase">Critical Leak</span>
                </div>
            </div>
        </div>
    );
};

export default CityMapWidget;
