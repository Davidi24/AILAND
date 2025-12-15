'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Graph = dynamic(() => import('@/components/Home/ThreeGraphBG'), { ssr: false })

export default function ThreeGraphBG(props: any) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const requestIdle = window.requestIdleCallback || ((cb: Function) => setTimeout(cb, 1))
    const cancelIdle = window.cancelIdleCallback || clearTimeout

    const id = requestIdle(() => setShow(true))
    return () => cancelIdle(id)
  }, [])

  if (!show) return null
  return <Graph {...props} />
}
