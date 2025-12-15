'use client'

import Grid from './Grid'
import Blurs from './Blurs'
import ThreeGraphBG from '../Home/ThreeGraphBG'

export default function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[#ededed] dark:bg-black" />
      <div className="absolute inset-0">
        <Grid />
        <Blurs />
      </div>
    </div>
  )
}
