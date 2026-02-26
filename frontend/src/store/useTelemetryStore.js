import { create } from 'zustand';

const useTelemetryStore = create((set) => ({
    telemetry: [],
    anomalies: [],
    systemState: 1, // 1: Normal, 2: Micro-leak, 3: Critical
    currentFlow: 42.8,
    currentPressure: 115.2,

    addTelemetryData: (data) => set((state) => {
        const newTelemetry = [...state.telemetry, data];
        // Keep last 50 data points for the chart
        if (newTelemetry.length > 50) newTelemetry.shift();
        return { telemetry: newTelemetry };
    }),

    setAnomalies: (anomalies) => set({ anomalies }),

    updateMetrics: ({ flow, pressure, stateLevel }) => set({
        currentFlow: flow,
        currentPressure: pressure,
        systemState: stateLevel
    })
}));

export default useTelemetryStore;
