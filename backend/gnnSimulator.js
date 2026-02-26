const EventEmitter = require('events');

class GNNSimulator extends EventEmitter {
    constructor() {
        super();
        this.nodes = [];
        this.edges = [];
        this.cycleTime = 180000; // 3 minutes total cycle (180s)
        this.currentState = 'NORMAL';
        this.anomalyStartTime = 0;

        this.initializeNetwork();
        this.startSequence();
    }

    initializeNetwork() {
        // Create 10 nodes with some random 3D positions spread out
        for (let i = 0; i < 10; i++) {
            this.nodes.push({
                id: `N${i}`,
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10,
                z: (Math.random() - 0.5) * 10,
                status: 'normal',
                pressure: 100, // baseline pressure
                acoustic: 0,   // baseline acoustic noise
            });
        }

        // Create relatively dense connections to form a web
        this.edges = [
            { source: 'N0', target: 'N1', status: 'normal' },
            { source: 'N1', target: 'N2', status: 'normal' },
            { source: 'N2', target: 'N3', status: 'normal' },
            { source: 'N3', target: 'N4', status: 'normal' },
            { source: 'N4', target: 'N5', status: 'normal' },
            { source: 'N5', target: 'N6', status: 'normal' },
            { source: 'N6', target: 'N7', status: 'normal' },
            { source: 'N7', target: 'N8', status: 'normal' },
            { source: 'N8', target: 'N9', status: 'normal' },
            { source: 'N9', target: 'N0', status: 'normal' },

            // Cross connections for complexity
            { source: 'N0', target: 'N5', status: 'normal' },
            { source: 'N1', target: 'N6', status: 'normal' },
            { source: 'N2', target: 'N5', status: 'normal' }, // THIS IS THE CRITICAL EDGE 2-5
            { source: 'N3', target: 'N8', status: 'normal' },
            { source: 'N4', target: 'N9', status: 'normal' },
        ];
    }

    startSequence() {
        // Run a continuous loop updating the state
        setInterval(() => this.tick(), 1000); // 1 tick per second
    }

    tick() {
        const now = Date.now();

        // Let's divide the 3m (180s) cycle into phases:
        // 0 - 60s: Normal flow
        // 60 - 90s: Anomaly begins (Pressure drops at N2, Acoustic spikes at N5)
        // 90 - 150s: System predicts leak on Edge 2-5 (Virtual Sensing Triggered)
        // 150 - 180s: Recovery / Resetting

        // We use a modular counter for the timeline
        if (!this.startTime) this.startTime = now;
        const elapsedSeconds = ((now - this.startTime) % this.cycleTime) / 1000;

        // Reset state for new cycle
        if (elapsedSeconds < 1) {
            this.resetNetworkState();
        }

        if (elapsedSeconds >= 0 && elapsedSeconds < 60) {
            this.setStateNormal();
        } else if (elapsedSeconds >= 60 && elapsedSeconds < 90) {
            this.setStatePhysicalAnomaly();
        } else if (elapsedSeconds >= 90 && elapsedSeconds < 150) {
            this.setStateVirtualLeak();
        } else {
            this.setStateRecovering();
        }

        // Add some slight random jitter to all values to make it feel alive
        this.addJitter();

        this.emit('update', {
            nodes: this.nodes,
            edges: this.edges,
            systemState: this.currentState
        });
    }

    resetNetworkState() {
        this.currentState = 'NORMAL';
        this.nodes.forEach(n => {
            n.status = 'normal';
            n.pressure = 100;
            n.acoustic = 0;
        });
        this.edges.forEach(e => {
            e.status = 'normal';
        });
    }

    setStateNormal() {
        if (this.currentState !== 'NORMAL') this.resetNetworkState();
    }

    setStatePhysicalAnomaly() {
        if (this.currentState !== 'PHYSICAL_ANOMALY') {
            this.currentState = 'PHYSICAL_ANOMALY';

            // N2 experiences pressure drop
            const n2 = this.nodes.find(n => n.id === 'N2');
            if (n2) {
                n2.status = 'warning';
                n2.pressure = 60; // dropped
            }

            // N5 experiences acoustic spike
            const n5 = this.nodes.find(n => n.id === 'N5');
            if (n5) {
                n5.status = 'warning';
                n5.acoustic = 85; // spike
            }
        }
    }

    setStateVirtualLeak() {
        if (this.currentState !== 'VIRTUAL_LEAK') {
            this.currentState = 'VIRTUAL_LEAK';

            // Physical nodes remain in warning state
            const n2 = this.nodes.find(n => n.id === 'N2');
            if (n2) { n2.status = 'critical'; n2.pressure = 40; }
            const n5 = this.nodes.find(n => n.id === 'N5');
            if (n5) { n5.status = 'critical'; n5.acoustic = 95; }

            // GNN "predicts" the edge between them is the source
            const edge25 = this.edges.find(e =>
                (e.source === 'N2' && e.target === 'N5') ||
                (e.source === 'N5' && e.target === 'N2')
            );

            if (edge25) {
                edge25.status = 'critical';
            }

            // Emit a special one-off event for the Dispatch Agent to pick up
            this.emit('dispatchTriggered', {
                sourceEdge: 'N2-N5',
                timestamp: Date.now()
            });
        }
    }

    setStateRecovering() {
        if (this.currentState !== 'RECOVERING') {
            this.currentState = 'RECOVERING';
            // Slowly returning to normal
            const n2 = this.nodes.find(n => n.id === 'N2');
            if (n2) { n2.status = 'normal'; n2.pressure = 80; }
            const n5 = this.nodes.find(n => n.id === 'N5');
            if (n5) { n5.status = 'normal'; n5.acoustic = 30; }

            const edge25 = this.edges.find(e =>
                (e.source === 'N2' && e.target === 'N5') ||
                (e.source === 'N5' && e.target === 'N2')
            );
            if (edge25) edge25.status = 'normal';
        }
    }

    addJitter() {
        this.nodes.forEach(n => {
            // Random variance +/- 2
            const variance = (Math.random() * 4) - 2;

            // Keep roughly around targets depending on status
            let targetPressure = 100;
            let targetAcoustic = 0;

            if (n.id === 'N2' && this.currentState === 'PHYSICAL_ANOMALY') targetPressure = 60;
            if (n.id === 'N2' && this.currentState === 'VIRTUAL_LEAK') targetPressure = 40;
            if (n.id === 'N5' && this.currentState === 'PHYSICAL_ANOMALY') targetAcoustic = 85;
            if (n.id === 'N5' && this.currentState === 'VIRTUAL_LEAK') targetAcoustic = 95;

            n.pressure = Math.max(0, targetPressure + variance);
            n.acoustic = Math.max(0, targetAcoustic + variance);
        });
    }

    getState() {
        return {
            nodes: this.nodes,
            edges: this.edges,
            systemState: this.currentState
        };
    }
}

module.exports = GNNSimulator;
