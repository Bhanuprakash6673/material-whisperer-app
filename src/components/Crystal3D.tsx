import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function CrystalMesh({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetScale = hovered ? 1.4 : 1;
  const currentScale = useRef(1);

  const facetColors = useMemo(() => {
    const colors = [
      new THREE.Color("#ff6b9d"), // pink
      new THREE.Color("#c084fc"), // purple
      new THREE.Color("#38bdf8"), // sky blue
      new THREE.Color("#34d399"), // emerald
      new THREE.Color("#fbbf24"), // amber
      new THREE.Color("#f97316"), // orange
      new THREE.Color("#06b6d4"), // cyan
      new THREE.Color("#a78bfa"), // violet
    ];
    return colors;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.x += delta * 0.12;
      currentScale.current += (targetScale - currentScale.current) * delta * 4;
      groupRef.current.scale.setScalar(currentScale.current);
    }
  });

  const geo = useMemo(() => new THREE.OctahedronGeometry(1.6, 0), []);
  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(1.4, 0), []);

  // Vertex positions for outer crystal
  const vertices = useMemo(() => {
    const pos = geo.getAttribute("position");
    const verts: [number, number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < pos.count; i++) {
      const key = `${pos.getX(i).toFixed(2)},${pos.getY(i).toFixed(2)},${pos.getZ(i).toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        verts.push([pos.getX(i), pos.getY(i), pos.getZ(i)]);
      }
    }
    return verts;
  }, [geo]);

  // Inner icosahedron vertices
  const innerVertices = useMemo(() => {
    const pos = icoGeo.getAttribute("position");
    const verts: [number, number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < pos.count; i++) {
      const key = `${pos.getX(i).toFixed(2)},${pos.getY(i).toFixed(2)},${pos.getZ(i).toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        verts.push([pos.getX(i), pos.getY(i), pos.getZ(i)]);
      }
    }
    return verts;
  }, [icoGeo]);

  return (
    <group ref={groupRef}>
      {/* Outer crystal - colorful transparent */}
      <mesh geometry={geo}>
        <meshPhysicalMaterial
          color="#7c3aed"
          transparent
          opacity={0.12}
          roughness={0.05}
          metalness={0.9}
          side={THREE.DoubleSide}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Inner icosahedron */}
      <mesh geometry={icoGeo}>
        <meshPhysicalMaterial
          color="#06b6d4"
          transparent
          opacity={0.08}
          roughness={0.1}
          metalness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Colorful edges - outer */}
      <lineSegments geometry={new THREE.EdgesGeometry(geo)}>
        <lineBasicMaterial color="#c084fc" transparent opacity={0.9} />
      </lineSegments>

      {/* Colorful edges - inner */}
      <lineSegments geometry={new THREE.EdgesGeometry(icoGeo)}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </lineSegments>

      {/* Outer corner atoms - colorful */}
      {vertices.map((pos, i) => (
        <mesh key={`outer-${i}`} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={facetColors[i % facetColors.length].getStyle()}
            emissive={facetColors[i % facetColors.length].getStyle()}
            emissiveIntensity={2.5}
          />
        </mesh>
      ))}

      {/* Inner atoms */}
      {innerVertices.slice(0, 8).map((pos, i) => (
        <mesh key={`inner-${i}`} position={pos}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color={facetColors[(i + 3) % facetColors.length].getStyle()}
            emissive={facetColors[(i + 3) % facetColors.length].getStyle()}
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* Glowing center core */}
      <mesh>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const count = 300;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      [0.753, 0.42, 0.616],  // pink
      [0.478, 0.518, 0.988], // purple
      [0.22, 0.741, 0.973],  // cyan
      [0.204, 0.827, 0.6],   // emerald
      [0.984, 0.749, 0.141], // amber
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Crystal3D({ className = "", interactive = true, forceHover }: { className?: string; interactive?: boolean; forceHover?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isHovered = forceHover !== undefined ? forceHover : hovered;

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#c084fc" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[0, -5, 3]} intensity={0.6} color="#f97316" />
        <pointLight position={[3, 3, -5]} intensity={0.5} color="#34d399" />
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <CrystalMesh hovered={hovered} />
        </Float>
        <ParticleField />
        {interactive && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />}
      </Canvas>
    </div>
  );
}
