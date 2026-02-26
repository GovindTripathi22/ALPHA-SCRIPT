import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import useStore from '../lib/store';

// Helper component for individual nodes
const Node = ({ position, status, id }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (status === 'critical' || status === 'warning') {
            // Pulse effect
            const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.15;
            meshRef.current.scale.set(scale, scale, scale);
        } else {
            meshRef.current.scale.set(1, 1, 1);
        }
    });

    // Determine color based on status
    let color = '#0066ff'; // normal electric blue
    let glowColor = '#00f3ff'; // neon cyan glow

    if (status === 'warning') {
        color = '#ffaa00';
        glowColor = '#ffbb33';
    } else if (status === 'critical') {
        color = '#ff3333';
        glowColor = '#ff5555';
    }

    return (
        <Sphere ref={meshRef} position={position} args={[0.3, 32, 32]}>
            <meshStandardMaterial
                color={color}
                emissive={glowColor}
                emissiveIntensity={status === 'normal' ? 0.5 : 2}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
};

// Helper component for edges
const Edge = ({ start, end, status }) => {
    const points = useMemo(() => [
        new THREE.Vector3(...start),
        new THREE.Vector3(...end)
    ], [start, end]);

    let color = '#0044aa';
    let lineWidth = 2;

    if (status === 'critical') {
        color = '#ff3333';
        lineWidth = 6;
    }

    return (
        <Line
            points={points}
            color={color}
            lineWidth={lineWidth}
            transparent
            opacity={status === 'critical' ? 1 : 0.4}
        />
    );
};


// Main Scene
const Scene = () => {
    const { nodes, edges } = useStore((state) => state.networkData);
    const groupRef = useRef();

    // Very slow continuous rotation for aesthetics
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
        }
    });

    if (!nodes || nodes.length === 0) return null;

    // Create a quick lookup for positions
    const nodePositions = {};
    nodes.forEach(n => {
        // Scale up the coordinates a bit for better visual spread
        nodePositions[n.id] = [n.x * 2, n.y * 2, n.z * 2];
    });

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />

            {/* Render Edges */}
            {edges.map((edge, idx) => {
                const startPos = nodePositions[edge.source];
                const endPos = nodePositions[edge.target];
                // Fallback if simulation data is momentarily out of sync
                if (!startPos || !endPos) return null;

                return (
                    <Edge
                        key={`edge-${idx}`}
                        start={startPos}
                        end={endPos}
                        status={edge.status}
                    />
                );
            })}

            {/* Render Nodes */}
            {nodes.map((node) => (
                <Node
                    key={node.id}
                    id={node.id}
                    position={nodePositions[node.id]}
                    status={node.status}
                />
            ))}
        </group>
    );
};


const NetworkGraph3D = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 15], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
        >
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={false}
            />

            {/* Postprocessing or environment effects could go here for "Premium" feel if requested */}
            <Scene />
        </Canvas>
    );
};

export default NetworkGraph3D;
