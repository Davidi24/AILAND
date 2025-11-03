'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Graph = dynamic(() => import('@/components/Home/ThreeGraphBG'), { ssr: false })

export default function ThreeGraphBG(props: any) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // detect iPhone or iPad or Android
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) return // do NOT render the 3D graph

    const id = requestIdleCallback(() => setShow(true))
    return () => cancelIdleCallback(id)
  }, [])

  if (!show) return null
  return <Graph {...props} />
}
