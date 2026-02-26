import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import useTelemetryStore from '../store/useTelemetryStore';

function PipeModel() {
    const group = useRef();
    const systemState = useTelemetryStore(state => state.systemState);

    // We'll use a basic cylinder to represent the pipe segment if we don't have a GLTF
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y += 0.005;
            if (systemState === 3) {
                // Shake effect on critical failure
                group.current.position.x = Math.sin(state.clock.elapsedTime * 20) * 0.05;
            } else {
                group.current.position.x = 0;
            }
        }
    });

    const materialColor = systemState === 3 ? "#ef4444" : systemState === 2 ? "#eab308" : "#94a3b8";

    return (
        <group ref={group}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[1, 1, 4, 32, 1, true]} />
                <meshStandardMaterial
                    color={materialColor}
                    metalness={0.8}
                    roughness={0.2}
                    side={THREE.DoubleSide}
                    wireframe={systemState > 1}
                />
            </mesh>

            {/* Inner fluid effect */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.95, 0.95, 4.1, 32]} />
                <meshPhysicalMaterial
                    color="#06b6d4"
                    transmission={0.9}
                    opacity={0.8}
                    transparent
                    roughness={0.1}
                />
            </mesh>
        </group>
    );
}

function PipeDigitalTwin() {
    const systemState = useTelemetryStore(state => state.systemState);

    return (
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden">
            <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                <color attach="background" args={['#020617']} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />

                {/* Warning Light */}
                {systemState > 1 && (
                    <pointLight
                        position={[0, 0, 0]}
                        intensity={systemState === 3 ? 50 : 20}
                        color={systemState === 3 ? "red" : "yellow"}
                        distance={5}
                    />
                )}

                <PipeModel />
                <OrbitControls enableZoom={false} enablePan={false} />
                <Environment preset="city" />
            </Canvas>
            <div className="absolute top-4 left-4 text-xs font-bold font-mono text-gray-400 bg-black/50 px-2 py-1 rounded">
                DIGITAL_TWIN: ACTIVE
            </div>
        </div>
    );
}

export default PipeDigitalTwin;
