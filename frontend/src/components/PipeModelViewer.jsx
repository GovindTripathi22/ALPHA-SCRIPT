import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PipeGeometry = ({ materialType, age, isLeaking }) => {
    const pipeRef = useRef();

    // Rotate the pipe slowly
    useFrame((state, delta) => {
        if (pipeRef.current) {
            pipeRef.current.rotation.x += delta * 0.2;
            pipeRef.current.rotation.y += delta * 0.1;
        }
    });

    // Material logic based on pipe type and age
    const getMaterialProps = () => {
        const isOld = age > 12;

        switch (materialType) {
            case 'DUCTILE IRON':
                return {
                    color: isOld ? '#5c3a21' : '#4a4a4a', // Rust vs clean iron
                    metalness: 0.8,
                    roughness: isOld ? 0.9 : 0.4,
                    wireframe: false
                };
            case 'PVC':
                return {
                    color: isOld ? '#b0b5a1' : '#e2e8f0', // Yellowing/dirty vs clean white PVC
                    metalness: 0.1,
                    roughness: 0.3,
                    clearcoat: 0.5,
                    wireframe: false
                };
            case 'ASBESTOS CEMENT':
            default:
                return {
                    color: isOld ? '#696969' : '#8c8c8c',
                    metalness: 0.0,
                    roughness: 1.0,
                    wireframe: false
                };
        }
    };

    const matProps = getMaterialProps();

    return (
        <group ref={pipeRef}>
            {/* Main Pipe Cylinder */}
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[1, 1, 4, 32, 1, false, 0, Math.PI * 2]} />
                <meshStandardMaterial {...matProps} />
            </mesh>

            {/* Inner Hollow (Subtracted visually by adding a slightly smaller, darker inner cylinder) */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 4.01, 32]} />
                <meshBasicMaterial color="#000000" side={THREE.BackSide} />
            </mesh>

            {/* Pipe Flanges (Connectors at ends) */}
            <mesh position={[0, 2, 0]}>
                <torusGeometry args={[1.1, 0.2, 16, 32]} />
                <meshStandardMaterial {...matProps} />
            </mesh>
            <mesh position={[0, -2, 0]}>
                <torusGeometry args={[1.1, 0.2, 16, 32]} />
                <meshStandardMaterial {...matProps} />
            </mesh>

            {/* Visual Anomaly / Leak Effect */}
            {isLeaking && (
                <>
                    {/* Glowing rupture point */}
                    <mesh position={[1, 0, 0]}>
                        <sphereGeometry args={[0.3, 16, 16]} />
                        <meshBasicMaterial color="#ff0000" wireframe />
                    </mesh>

                    {/* Simulated High-Pressure Water Spray (Sparkles) */}
                    <group position={[1.5, 0, 0]}>
                        <Sparkles count={100} scale={2} size={4} speed={0.4} opacity={0.8} color="#00ffff" />
                    </group>
                </>
            )}

            {/* Wireframe Overlay for "AI Scan" effect */}
            <mesh>
                <cylinderGeometry args={[1.02, 1.02, 4.05, 16, 1]} />
                <meshBasicMaterial color={isLeaking ? "#ff0000" : "#00ffff"} wireframe transparent opacity={0.1} />
            </mesh>
        </group>
    );
};

const PipeModelViewer = ({ materialType = 'DUCTILE IRON', age = 5, isLeaking = false }) => {
    return (
        <div className="w-full h-full relative group">
            <Canvas shadows camera={{ position: [4, 2, 4], fov: 45 }}>
                <color attach="background" args={['#000000']} />

                {/* Advanced Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <PipeGeometry materialType={materialType} age={age} isLeaking={isLeaking} />
                </Float>

                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />

                {/* Cyberpunk Studio Environment */}
                <Environment preset="city" />

                {/* Auto-rotating camera controls */}
                <OrbitControls autoRotate autoRotateSpeed={0.5} enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            </Canvas>

            {/* Scan Overlay UI */}
            <div className="absolute top-4 left-4 pointer-events-none">
                <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest bg-black/50 px-2 py-1 rounded inline-block">
                    LIVE_3D_SCAN_FEED
                </div>
            </div>
            {isLeaking && (
                <div className="absolute bottom-4 left-4 pointer-events-none">
                    <div className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-2 py-1 rounded inline-block animate-pulse">
                        STRUCTURAL_BREACH_DETECTED
                    </div>
                </div>
            )}
        </div>
    );
};

export default PipeModelViewer;
