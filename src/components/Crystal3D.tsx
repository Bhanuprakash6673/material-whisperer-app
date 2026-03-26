import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function CrystalMesh({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const targetScale = hovered ? 1.3 : 1;
  const currentScale = useRef(1);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
      currentScale.current += (targetScale - currentScale.current) * delta * 3;
      meshRef.current.scale.setScalar(currentScale.current);
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.y += delta * 0.3;
      edgesRef.current.rotation.x += delta * 0.1;
      edgesRef.current.scale.setScalar(currentScale.current);
    }
  });

  const geo = new THREE.OctahedronGeometry(1.6, 0);

  return (
    <group>
      <mesh ref={meshRef} geometry={geo}>
        <meshPhysicalMaterial
          color="#0ea5e9"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments ref={edgesRef} geometry={new THREE.EdgesGeometry(geo)}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.8} />
      </lineSegments>

      {/* Corner atoms */}
      {geo.getAttribute("position") &&
        Array.from({ length: 6 }).map((_, i) => {
          const positions = [
            [0, 1.6, 0], [0, -1.6, 0],
            [1.6, 0, 0], [-1.6, 0, 0],
            [0, 0, 1.6], [0, 0, -1.6],
          ];
          return (
            <mesh key={i} position={positions[i] as [number, number, number]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={2} />
            </mesh>
          );
        })}
    </group>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#38bdf8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function Crystal3D({ className = "", interactive = true }: { className?: string; interactive?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#0ea5e9" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7c3aed" />
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <CrystalMesh hovered={hovered} />
        </Float>
        <ParticleField />
        {interactive && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />}
      </Canvas>
    </div>
  );
}
