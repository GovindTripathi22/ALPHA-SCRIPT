import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useTelemetryStore from '../store/useTelemetryStore';

// In a real app this would be in .env
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZHVtbXl1c2VyIiwiYSI6ImNsMWYxdHhkdTAyeHoycHFxbXU0Zmg0cXUifQ.1ABCDEFGHIJ';

export default function GeospatialView() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const anomalies = useTelemetryStore(state => state.anomalies);
    const [mapLoaded, setMapLoaded] = useState(false);
    const markersRef = useRef([]);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        try {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v11',
                center: [-74.006, 40.7128], // Default to NYC
                zoom: 1.5,
                pitch: 45,
                bearing: -20,
                antialias: true,
                projection: 'globe' // Render as a 3D Globe
            });

            map.current.on('style.load', () => {
                setMapLoaded(true);

                // Add premium atmosphere and space background
                map.current.setFog({
                    'color': 'rgb(2, 6, 23)', // deep slate-950 blue
                    'high-color': 'rgb(14, 165, 233)', // cyan atmosphere rim
                    'space-color': 'rgb(0, 0, 0)', // black space
                    'star-intensity': 0.8
                });
                // Insert 3D building layer beneath labels
                const layers = map.current.getStyle().layers;
                const labelLayerId = layers.find(
                    (layer) => layer.type === 'symbol' && layer.layout['text-field']
                ).id;

                map.current.addLayer(
                    {
                        'id': 'add-3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['==', 'extrude', 'true'],
                        'type': 'fill-extrusion',
                        'minzoom': 15,
                        'paint': {
                            'fill-extrusion-color': '#0f172a',
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': 0.8
                        }
                    },
                    labelLayerId
                );
            });
        } catch (e) {
            console.warn("Mapbox failed to load, probably bad token. Using fallback.", e);
        }
    }, []);

    useEffect(() => {
        if (!mapLoaded || !map.current) return;

        // Clear old markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add new markers
        anomalies.forEach(anomaly => {
            if (!anomaly.latitude || !anomaly.longitude) return;

            const el = document.createElement('div');
            const isCritical = anomaly.severity_level > 7;

            el.className = `w-4 h-4 rounded-full ${isCritical ? 'bg-red-500 shadow-[0_0_20px_5px_rgba(239,68,68,0.7)] animate-pulse'
                : 'bg-yellow-400 shadow-[0_0_15px_3px_rgba(250,204,21,0.5)]'
                }`;

            const marker = new mapboxgl.Marker(el)
                .setLngLat([anomaly.longitude, anomaly.latitude])
                .setPopup(new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<div class="text-slate-900 font-bold p-1">Anomaly ID: ${anomaly.id}<br/>Severity: ${anomaly.severity_level}</div>`))
                .addTo(map.current);

            markersRef.current.push(marker);
        });
    }, [anomalies, mapLoaded]);

    return (
        <div className="w-full h-full relative border-2 border-white/5 rounded-2xl overflow-hidden group">
            <div ref={mapContainer} className="w-full h-full bg-slate-900" />
            {/* Decorative HUD overlay */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-10"></div>
            <div className="absolute top-4 left-4 z-20 font-mono text-cyan-400 text-xs px-3 py-1 bg-black/50 backdrop-blur rounded flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                LIVE SAT_LINK ESTABLISHED
            </div>
        </div>
    );
}
