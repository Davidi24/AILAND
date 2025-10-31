'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Graph = dynamic(() => import('@/components/Home/ThreeGraphBG'), { ssr: false })

export default function ThreeGraphBG(props: any) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const id = requestIdleCallback(() => setShow(true))
    return () => cancelIdleCallback(id)
  }, [])

  if (!show) return null
  return <Graph {...props} />
}
