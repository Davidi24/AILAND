'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

type Props = {
  nodeCount?: number
}

export default function ThreeGraphBG({ nodeCount = 110 }: Props) {
  const { resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  )

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark')
  }, [resolvedTheme])

  const wrapRef = useRef<HTMLDivElement | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rafRef = useRef<number | null>(null)
  const groupRef = useRef<THREE.Group | null>(null)
  const linesRef = useRef<THREE.LineSegments | null>(null)

  const mouse = useRef({ x: 0, y: 0 })

  // --- INITIAL SCENE SETUP (only once) ---
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const w = wrap.clientWidth
    const h = wrap.clientHeight

    const scene = new THREE.Scene()
    sceneRef.current = scene
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
    camera.position.set(0, 0, 95)
    cameraRef.current = camera

    const fogColor = new THREE.Color(isDark ? 0x060607 : 0xf7fafc)
    scene.fog = new THREE.Fog(fogColor, 120, 240)
    scene.background = null

    scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.45 : 0.7))
    const key = new THREE.DirectionalLight(0xffffff, 0.8)
    key.position.set(4, 5, 6)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x8b5cf6, 0.6)
    rim.position.set(-5, -3, -4)
    scene.add(rim)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer
    wrap.appendChild(renderer.domElement)

    const group = new THREE.Group()
    groupRef.current = group
    scene.add(group)

    const palette = [0xc4b5fd, 0x6ee7b7, 0xa78bfa, 0x34d399, 0x8b5cf6]

    type Node = {
      mesh: THREE.Mesh
      v: THREE.Vector3
      zFactor: number
      radius: number
    }
    const nodes: Node[] = []
    const sphereGeo = new THREE.SphereGeometry(1, 24, 24)

    for (let i = 0; i < nodeCount; i++) {
      const zFactor = Math.random()
      const radius = 0.2 + zFactor * 0.6
      const mat = new THREE.MeshPhongMaterial({
        color: palette[(Math.random() * palette.length) | 0],
        emissive: palette[(Math.random() * palette.length) | 0],
        emissiveIntensity: 0.15 + zFactor * 0.25,
        shininess: 80,
        transparent: true,
        opacity: 0 // start invisible → fade-in
      })
      const m = new THREE.Mesh(sphereGeo, mat)
      m.position.set(
        (Math.random() - 0.5) * 180,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 180
      )
      m.scale.setScalar(radius * (isDark ? 1.05 : 0.95))
      group.add(m)

      const v = new THREE.Vector3(
        (Math.random() - 0.5) * (0.08 + zFactor * 0.12),
        (Math.random() - 0.5) * (0.08 + zFactor * 0.12),
        (Math.random() - 0.5) * (0.06 + zFactor * 0.1)
      )

      nodes.push({ mesh: m, v, zFactor, radius })
    }

    const pairs: Array<[number, number]> = []
    const maxDist = 26
    const computePairs = () => {
      pairs.length = 0
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i].mesh.position
          const b = nodes[j].mesh.position
          const d = a.distanceTo(b)
          if (d < maxDist && Math.random() > 0.65) pairs.push([i, j])
        }
      }
    }
    computePairs()

    const linePositions = new Float32Array(pairs.length * 2 * 3)
    const lineGeom = new THREE.BufferGeometry()
    lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x8b5cf6 : 0x6b7280,
      transparent: true,
      opacity: 0 // fade-in later
    })
    const lineSeg = new THREE.LineSegments(lineGeom, lineMat)
    linesRef.current = lineSeg
    group.add(lineSeg)

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouse.current.x = x
      mouse.current.y = y
    }
    window.addEventListener('mousemove', onMove)

    const onResize = () => {
      const W = wrap.clientWidth
      const H = wrap.clientHeight
      renderer.setSize(W, H)
      camera.aspect = W / H
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    let t = 0
    let fade = 0 // fade progress 0→1
    const bounds = new THREE.Box3(
      new THREE.Vector3(-95, -65, -110),
      new THREE.Vector3(95, 65, 110)
    )

    const animate = () => {
      t += 0.016
      if (fade < 1) fade += 0.02

      // smooth fade-in of spheres + lines
      for (const n of nodes) {
        const mat = n.mesh.material as THREE.MeshPhongMaterial
        mat.opacity = Math.min(0.9, fade * 0.9)
      }
      lineMat.opacity = Math.min(isDark ? 0.22 : 0.18, fade * (isDark ? 0.22 : 0.18))

      group.rotation.y += ((mouse.current.x * 0.35) - group.rotation.y) * 0.04
      group.rotation.x += ((mouse.current.y * 0.25) - group.rotation.x) * 0.04

      for (const n of nodes) {
        const p = n.mesh.position
        p.x += n.v.x + Math.sin(t * 0.6 + p.y * 0.02) * 0.02
        p.y += n.v.y + Math.cos(t * 0.5 + p.x * 0.02) * 0.02
        p.z += n.v.z + Math.sin(t * 0.4 + p.z * 0.015) * 0.015

        if (p.x < bounds.min.x) p.x = bounds.max.x
        if (p.x > bounds.max.x) p.x = bounds.min.x
        if (p.y < bounds.min.y) p.y = bounds.max.y
        if (p.y > bounds.max.y) p.y = bounds.min.y
        if (p.z < bounds.min.z) p.z = bounds.max.z
        if (p.z > bounds.max.z) p.z = bounds.min.z

        const pulse = 1 + Math.sin(t * 0.8 + p.x * 0.03) * 0.06 * (0.5 + n.zFactor)
        n.mesh.scale.setScalar(n.radius * pulse * (isDark ? 1.05 : 0.95))
      }

      let k = 0
      for (let i = 0; i < pairs.length; i++) {
        const [a, b] = pairs[i]
        const pa = nodes[a].mesh.position
        const pb = nodes[b].mesh.position
        linePositions[k++] = pa.x
        linePositions[k++] = pa.y
        linePositions[k++] = pa.z
        linePositions[k++] = pb.x
        linePositions[k++] = pb.y
        linePositions[k++] = pb.z
      }
      lineGeom.attributes.position.needsUpdate = true

      if ((performance.now() | 0) % 2000 < 16) computePairs()

      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      wrap.removeChild(renderer.domElement)
      lineGeom.dispose()
      lineMat.dispose()
      sphereGeo.dispose()
      renderer.dispose()
    }
  }, [nodeCount])

  // --- THEME UPDATE EFFECT ---
  useEffect(() => {
    const scene = sceneRef.current
    const lines = linesRef.current
    const group = groupRef.current
    if (!scene || !lines || !group) return

    scene.fog!.color = new THREE.Color(isDark ? 0x060607 : 0xf7fafc)
    const lineMat = lines.material as THREE.LineBasicMaterial
    lineMat.color = new THREE.Color(isDark ? 0x8b5cf6 : 0x6b7280)
    lineMat.opacity = isDark ? 0.22 : 0.18
    group.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.scale.multiplyScalar(isDark ? 1.05 : 0.95)
      }
    })
  }, [isDark])

  return (
    <div className="absolute inset-0 -z-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-400/30 blur-[80px]" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-violet-500/30 blur-[100px]" />
      </div>
      <div ref={wrapRef} className="absolute inset-0" />
    </div>
  )
}
