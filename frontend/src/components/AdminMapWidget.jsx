import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import useStore from '../lib/store';
import 'leaflet/dist/leaflet.css';

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

const createAdminMarker = (status, nodeId) => {
    if (status !== 'critical' && status !== 'warning') return L.divIcon({ className: 'hidden-icon' });

    const isCritical = status === 'critical';
    return L.divIcon({
        className: 'admin-marker-container',
        html: `
      <div class="flex flex-col items-center -mt-8 animate-fade-in">
        <div class="bg-white border-2 border-${isCritical ? 'red-500' : 'orange-500'} rounded shadow-2xl px-2 py-1 flex items-center gap-2 whitespace-nowrap">
          <div class="w-2 h-2 rounded-full bg-${isCritical ? 'red-500' : 'orange-500'} ${isCritical ? 'animate-pulse' : ''}"></div>
          <span class="text-[10px] font-bold text-slate-800 tracking-tighter uppercase">${isCritical ? 'CRITICAL LEAK' : 'INTAKE DROP'}</span>
          <span class="text-[10px] font-mono bg-slate-100 px-1 rounded text-slate-500">${nodeId}</span>
        </div>
        <div class="w-0.5 h-4 bg-${isCritical ? 'red-500' : 'orange-500'} shadow-lg transform -translate-y-0.5"></div>
      </div>
    `,
        iconSize: [120, 40],
        iconAnchor: [60, 40]
    });
};

const AdminMapWidget = ({ showHeatmap = true }) => {
    const { nodes } = useStore((state) => state.networkData);
    const [showEvacuation, setShowEvacuation] = useState(false);

    const processedNodes = useMemo(() => {
        if (!nodes?.length) return [];
        return nodes.map(node => ({
            ...node,
            lat: AMRAVATI_NODES[node.id]?.lat || 20.9320,
            lng: AMRAVATI_NODES[node.id]?.lng || 77.7523,
            // Simulate "Risk Score" for the heatmap
            riskScore: node.status === 'critical' ? 100 : node.status === 'warning' ? 60 : Math.random() * 30
        }));
    }, [nodes]);

    return (
        <div className="w-full h-full relative z-0">
            <MapContainer
                center={[20.9320, 77.7523]}
                zoom={14}
                style={{ height: '100%', width: '100%', background: '#F8FAFC' }}
                zoomControl={false}
            >
                <ZoomControl position="bottomright" />
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {/* Hydra-Scan Heatmap / Risk Zones */}
                {showHeatmap && processedNodes.map((node) => (
                    node.riskScore > 40 && (
                        <Circle
                            key={`risk-${node.id}`}
                            center={[node.lat, node.lng]}
                            radius={200 + (node.riskScore * 2)}
                            pathOptions={{
                                fillColor: node.riskScore > 80 ? '#ef4444' : '#f59e0b',
                                fillOpacity: 0.15,
                                color: 'transparent',
                                weight: 0
                            }}
                        />
                    )
                ))}

                {/* Critical/Warning Markers */}
                {processedNodes.filter(n => n.status !== 'healthy').map((node) => (
                    <Marker
                        key={node.id}
                        position={[node.lat, node.lng]}
                        icon={createAdminMarker(node.status, node.id)}
                    >
                        <Popup className="admin-popup-custom">
                            <div className="p-3 font-sans w-56">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`p-1.5 rounded bg-${node.status === 'critical' ? 'red' : 'orange'}-100 text-${node.status === 'critical' ? 'red' : 'orange'}-600`}>
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    </div>
                                    <h3 className="font-bold text-slate-800 uppercase text-xs">Incident Command: {node.id}</h3>
                                </div>
                                <div className="space-y-1 mb-4">
                                    <div className="flex justify-between text-[11px]"><span className="text-slate-500">Stability Index:</span><span className="font-bold text-red-600">{node.integrity_score}%</span></div>
                                    <div className="flex justify-between text-[11px]"><span className="text-slate-500">Risk Factor:</span><span className="font-bold text-orange-600">{Math.round(node.riskScore)}%</span></div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="py-2 bg-slate-900 text-white rounded text-[10px] font-bold">DISPATCH</button>
                                    <button className="py-2 bg-white border border-slate-200 text-slate-600 rounded text-[10px] font-bold">ISOLATE</button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Emergency Evacuation / Detour Routes */}
                {showEvacuation && processedNodes.filter(n => n.status === 'critical').map(node => {
                    const detourPath = [
                        [node.lat + 0.006, node.lng - 0.006],
                        [node.lat + 0.008, node.lng],
                        [node.lat + 0.006, node.lng + 0.006],
                        [node.lat - 0.006, node.lng + 0.006],
                        [node.lat - 0.008, node.lng],
                        [node.lat - 0.006, node.lng - 0.006],
                    ];

                    return (
                        <React.Fragment key={`detour-${node.id}`}>
                            <Circle center={[node.lat, node.lng]} radius={400} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3, weight: 2, dashArray: '10, 10' }} />
                            <Polyline positions={detourPath} pathOptions={{ color: '#00f3ff', weight: 5, dashArray: '5, 10', opacity: 0.9 }} />
                        </React.Fragment>
                    );
                })}
            </MapContainer>

            <div className="absolute top-4 left-4 z-[1000] space-y-2">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-lg p-3 shadow-xl">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">Prediction Layers</h4>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                            <span className="text-[10px] text-slate-600 font-bold uppercase">Burst Probability</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className="w-3 h-3 rounded-full bg-orange-500/20 border border-orange-500"></div>
                            <span className="text-[10px] text-slate-600 font-bold uppercase">Stress Nodes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer pt-3 mt-3 border-t border-slate-200">
                            <input type="checkbox" className="sr-only peer" checked={showEvacuation} onChange={() => setShowEvacuation(!showEvacuation)} />
                            <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-cyan-500 relative"></div>
                            <span className="text-[10px] text-cyan-600 font-bold uppercase">Alternate Routes</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMapWidget;
