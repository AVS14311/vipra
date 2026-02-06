import { useRef } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'

function Petal({ position, rotation, scale, color }) {
  const meshRef = useRef()
  // Petal shape: flattened cone (pointed oval)
  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      <coneGeometry args={[0.5, 1.2, 8]} />
      <meshStandardMaterial
        color={color}
        roughness={0.4}
        metalness={0.05}
        envMapIntensity={1}
      />
    </mesh>
  )
}

function RoseFlower() {
  const groupRef = useRef()
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15
  })

  const petalColor = '#c41e3a'
  const petalColorDark = '#8b0000'
  const innerColor = '#dc143c'

  const innerPetals = []
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    innerPetals.push(
      <Petal
        key={`inner-${i}`}
        position={[Math.cos(angle) * 0.35, Math.sin(angle) * 0.35 + 0.2, 0.1]}
        rotation={[-0.4, angle, 0.2]}
        scale={[0.5, 0.9, 0.15]}
        color={innerColor}
      />
    )
  }

  const midPetals = []
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 + 0.3
    midPetals.push(
      <Petal
        key={`mid-${i}`}
        position={[Math.cos(angle) * 0.6, Math.sin(angle) * 0.6 + 0.1, 0]}
        rotation={[-0.2, angle, 0]}
        scale={[0.65, 1.1, 0.12]}
        color={petalColor}
      />
    )
  }

  const outerPetals = []
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 + 0.1
    outerPetals.push(
      <Petal
        key={`outer-${i}`}
        position={[Math.cos(angle) * 0.85, Math.sin(angle) * 0.85 - 0.1, -0.05]}
        rotation={[0.1, angle, -0.1]}
        scale={[0.7, 1.2, 0.1]}
        color={petalColorDark}
      />
    )
  }

  return (
    <group ref={groupRef}>
      {/* Center */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#4a0a0a" roughness={0.6} metalness={0.1} />
      </mesh>
      {innerPetals}
      {midPetals}
      {outerPetals}
    </group>
  )
}

function Stem() {
  return (
    <group position={[0, -1.2, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.06, 1.2, 8]} />
        <meshStandardMaterial color="#0d3d0d" roughness={0.8} metalness={0} />
      </mesh>
      {/* Leaves */}
      <mesh position={[0.18, 0.35, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.35, 0.12, 0.08]} />
        <meshStandardMaterial color="#1a5c1a" roughness={0.7} metalness={0} />
      </mesh>
      <mesh position={[-0.15, 0.05, 0]} rotation={[0, 0, 0.45]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.06]} />
        <meshStandardMaterial color="#1a5c1a" roughness={0.7} metalness={0} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 4, 2]} intensity={0.8} color="#ffb6c1" />
      <pointLight position={[3, 2, -2]} intensity={0.5} color="#ff69b4" />

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.2} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <group scale={1.8} position={[0, 0, 0]}>
          <RoseFlower />
          <Stem />
        </group>
      </Float>
    </>
  )
}

export default function Rose3D({ className, style }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', minHeight: 320, ...style }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ display: 'block' }}
      >
        <color attach="background" args={['transparent']} />
        <Scene />
      </Canvas>
    </div>
  )
}
