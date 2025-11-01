'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'

function RobotModel() {
  const { scene } = useGLTF('/models/robot.glb')
  return <primitive object={scene} scale={1.6} position={[0, -1, 0]} />
}

export default function RobotScene() {
  return (
    <Suspense fallback={<div className="h-full w-full bg-transparent" />}>
      <Canvas camera={{ position: [0, 1.5, 4], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Environment preset="city" />
        <RobotModel />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </Suspense>
  )
}
