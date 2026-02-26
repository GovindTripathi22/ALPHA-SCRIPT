let systemState = 1; // 1: Normal, 2: Micro-leak, 3: Critical
let startTime = Date.now();
let flowRate = 42.8;
let pressurePsi = 115.2;

// The narrative plays over 3 minutes (180 seconds)
// 0-60s: Normal operations (State 1)
// 60-120s: Micro-leak detected (State 2)
// 120-180s: Critical failure prediction (State 3)

function updateNarrativeState() {
    const elapsedSeconds = (Date.now() - startTime) / 1000;

    if (elapsedSeconds < 60) {
        if (systemState !== 1) console.log("State -> 1 (Normal)");
        systemState = 1;
    } else if (elapsedSeconds < 120) {
        if (systemState !== 2) console.log("State -> 2 (Micro-leak)");
        systemState = 2;
    } else {
        if (systemState !== 3) console.log("State -> 3 (Critical)");
        systemState = 3;
    }
}

function generateTelemetry() {
    updateNarrativeState();

    // Base noise
    let acousticBase = 20 + Math.random() * 5;

    if (systemState === 1) {
        flowRate = 42.8 + (Math.random() - 0.5) * 0.5;
        pressurePsi = 115.2 + (Math.random() - 0.5) * 0.5;
    } else if (systemState === 2) {
        acousticBase = 45 + Math.random() * 15; // Noise rises
        flowRate = 41.5 + (Math.random() - 0.5) * 1.5; // Slight drop
        pressurePsi = 110.0 + (Math.random() - 0.5) * 2.0; // Pressure drops slightly
    } else if (systemState === 3) {
        acousticBase = 85 + Math.random() * 20; // Critical noise
        flowRate = 35.0 + (Math.random() - 0.5) * 3.0; // Huge drop
        pressurePsi = 85.0 + (Math.random() - 0.5) * 5.0; // Pressure plummets
    }

    return {
        timestamp: new Date().toISOString().substring(11, 19),
        flow_rate: flowRate.toFixed(2),
        pressure_psi: pressurePsi.toFixed(2),
        acoustic_db: acousticBase.toFixed(2),
        system_state: systemState
    };
}

function generateAnomalies() {
    const anomalies = [];

    // In state 2, show a micro leak
    if (systemState >= 2) {
        anomalies.push({
            id: "ANOM-084",
            node_id: "NODE-X1",
            latitude: 40.7128,
            longitude: -74.006,
            detected_at: new Date().toISOString(),
            severity_level: systemState === 3 ? 9 : 4,
            ai_confidence_score: systemState === 3 ? 0.98 : 0.65,
            status: "Open"
        });
    }

    // In state 3, add another compounding anomaly
    if (systemState === 3) {
        anomalies.push({
            id: "ANOM-085",
            node_id: "NODE-Y2",
            latitude: 40.7135,
            longitude: -74.004,
            detected_at: new Date().toISOString(),
            severity_level: 8,
            ai_confidence_score: 0.91,
            status: "Open"
        });
    }

    return anomalies;
}

module.exports = { generateTelemetry, generateAnomalies };
