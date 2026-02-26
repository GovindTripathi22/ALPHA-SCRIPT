import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import useStore from '../lib/store';
import 'leaflet/dist/leaflet.css';

// Hardcoded coordinates for 10 intersections in Nagpur, Maharashtra
const NAGPUR_NODES = {
    N0: { lat: 21.1458, lng: 79.0882 },
    N1: { lat: 21.1498, lng: 79.0806 },
    N2: { lat: 21.1385, lng: 79.0833 },
    N3: { lat: 21.1311, lng: 79.0900 },
    N4: { lat: 21.1250, lng: 79.0750 },
    N5: { lat: 21.1350, lng: 79.0600 },
    N6: { lat: 21.1450, lng: 79.0650 },
    N7: { lat: 21.1550, lng: 79.0750 },
    N8: { lat: 21.1600, lng: 79.0850 },
    N9: { lat: 21.1500, lng: 79.1000 }
};

// Professional Red Signs for leaks
const createAdminMarker = (status, nodeId) => {
    if (status !== 'critical' && status !== 'warning') {
        return L.divIcon({ className: 'hidden-icon', html: '', iconSize: [0, 0] });
    }

    const isCritical = status === 'critical';
    const color = isCritical ? '#ef4444' : '#f59e0b';

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

const AdminMapWidget = () => {
    const { nodes } = useStore((state) => state.networkData);

    const issueNodes = useMemo(() => {
        if (!nodes?.length) return [];
        return nodes
            .filter(n => n.status === 'critical' || n.status === 'warning')
            .map(node => ({
                ...node,
                lat: NAGPUR_NODES[node.id]?.lat || 21.1458,
                lng: NAGPUR_NODES[node.id]?.lng || 79.0882
            }));
    }, [nodes]);

    return (
        <div className="w-full h-full relative z-0 group">
            <MapContainer
                center={[21.1458, 79.0882]}
                zoom={14}
                style={{ height: '100%', width: '100%', background: '#F8FAFC' }}
                zoomControl={false}
            >
                <ZoomControl position="bottomright" />

                {/* Professional Light Mode Canvas */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {issueNodes.map((node) => (
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

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-[11px]">
                                        <span className="text-slate-500">Integrity:</span>
                                        <span className="font-mono font-bold text-red-600">{node.integrity_score}%</span>
                                    </div>
                                    <div className="flex justify-between text-[11px]">
                                        <span className="text-slate-500">Last Telemetry:</span>
                                        <span className="font-mono text-slate-800">4s ago</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <button className="py-2 bg-slate-900 text-white rounded text-[10px] font-bold hover:bg-black transition-colors">
                                        DISPATCH
                                    </button>
                                    <button className="py-2 bg-white border border-slate-200 text-slate-600 rounded text-[10px] font-bold hover:bg-slate-50 transition-colors">
                                        ISOLATE
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Admin Overlay Map Controls */}
            <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-lg p-3 shadow-xl pointer-events-auto">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Map Filters</h4>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-3 h-3 text-red-600 rounded focus:ring-red-500" />
                            <span className="text-[11px] text-slate-600 font-medium">Critical Leaks</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-3 h-3 text-orange-500 rounded focus:ring-orange-500" />
                            <span className="text-[11px] text-slate-600 font-medium">Anomaly Warning</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMapWidget;
