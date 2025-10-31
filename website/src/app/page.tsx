'use client'
import { useEffect, useState } from 'react'
import HomeHero from "@/components/Home/HomeHero"
import Navbar from "@/components/Home/Navbar"
import Services from "@/components/Services/Services"
import SubPage from '@/components/Pricing/SubPage'
import TeamSection from '@/components/OurTeam/TeamSection'
import Contact from "@/components/Contact/Contact"
import Footer from "@/components/End/Footer"
import ThreeGraphBG from "./dynamicImport"

export default function Home() {
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const checkSize = () => setIsSmall(window.innerWidth < 768)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  return (
    <div>
      <main>
        <div className="services">
          <Navbar />
          <HomeHero />

          <div className="relative">
            <div className="absolute inset-0 -z-10">
              <ThreeGraphBG nodeCount={isSmall ? 102 : 32} />
            </div>
            <Services />
            <SubPage />
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10">
              <ThreeGraphBG nodeCount={isSmall ? 100 : 10} />
            </div>
            <TeamSection />
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10">
              <ThreeGraphBG nodeCount={isSmall ? 125 : 25} />
            </div>
            <Contact />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}
