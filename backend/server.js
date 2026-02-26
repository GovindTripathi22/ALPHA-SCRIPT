const express = require('express');
const cors = require('cors');
const GNNSimulator = require('./gnnSimulator');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize our Simulation Engine
const simulator = new GNNSimulator();

// Variables to hold dispatch state
let latestDispatch = null;

// Listen for the trigger from the simulator
simulator.on('dispatchTriggered', (data) => {
    // Generate the LLM Agent Report deterministically
    latestDispatch = {
        id: `INC-${Math.floor(Math.random() * 10000)}`,
        timestamp: new Date(data.timestamp).toISOString(),
        severity: "CRITICAL",
        event: "Virtual Leak Predicted (Edge 2-5)",
        report: `HydroGraph AI Agent Analysis:
A high probability unmonitored leak has been detected between Node 2 (Pressure Drop 40%) and Node 5 (Acoustic Spike 95dB). 
Location Context: Subsurface pipeline cross-section, Industrial District.
Estimated Water Loss Cost: $2,450 / hour.
Recommended Action: Autonomous dispatch of field engineers. Shutting off isolation valves V-112 and V-114 recommended to prevent sinkhole formation on Elm Street.`
    };
});

// Clear dispatch on reset
simulator.on('update', (state) => {
    if (state.systemState === 'NORMAL') {
        latestDispatch = null; // Clear old reports when cycle restarts
    }
});


// -------------------------------------------------------------------------- //
// ENDPOINTS
// -------------------------------------------------------------------------- //

/**
 * Force Trigger Anomaly Endpoint
 */
app.post('/api/trigger-anomaly', (req, res) => {
    // Force the simulator to generate a specific critical anomaly
    simulator.currentState.nodes = simulator.currentState.nodes.map((n, i) => {
        if (i === 1) { // Force a massive leak on node 1
            return {
                ...n,
                status: 'critical',
                integrity_score: 12,
                flow_rate: n.flow_rate + 24.2,
                pressure: n.pressure - 18
            };
        }
        return n;
    });
    simulator.currentState.systemState = 'ANOMALOUS';
    simulator.emit('update', simulator.currentState);
    res.json({ success: true, message: 'Anomaly Triggered Manually' });
});

/**
 * Health Check
 */
app.get('/api/health', (req, res) => {
    res.json({ status: 'active', simulatorState: simulator.currentState });
});

/**
 * SSE Endpoint for Real-time Network Graph Stream
 */
app.get('/api/stream/network', (req, res) => {
    // SSE Setup
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Flush headers to client immediately
    res.flushHeaders();

    // Send initial state immediately
    res.write(`data: ${JSON.stringify({ type: 'init', payload: simulator.getState() })}\n\n`);

    // Listen to simulator ticks and broadcast
    const updateListener = (data) => {
        res.write(`data: ${JSON.stringify({ type: 'update', payload: data })}\n\n`);
    };

    simulator.on('update', updateListener);

    // Clean up on disconnect
    req.on('close', () => {
        simulator.removeListener('update', updateListener);
    });
});

/**
 * API Endpoint for the AI Dispatch Agent
 * Frontend can poll this, or we could send via SSE. We will provide a REST endpoint.
 */
app.get('/api/agent/dispatch', (req, res) => {
    if (latestDispatch) {
        res.json({ hasDispatch: true, dispatch: latestDispatch });
    } else {
        res.json({ hasDispatch: false, message: "No active anomalous incidents requiring dispatch." });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`HydroGraph AI Backend Engine running on port ${PORT}`);
});
