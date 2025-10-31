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

          <div className="relative -mt-10 md:mt-0" id='services'>
            <div className="absolute inset-0 -z-10">
              <ThreeGraphBG nodeCount={isSmall ? 102 : 32} />
            </div>
            <Services />
            <div id='subscription'>
              <SubPage />
            </div>
          </div>

          <div className="relative -mt-18 md:mt-0">
            <div className="absolute inset-0 -z-10">
              <ThreeGraphBG nodeCount={isSmall ? 100 : 10} />
            </div>
            <TeamSection />
          </div>

          <div className="relative -mt-16 md:mt-0">
            <div className="absolute inset-0 -z-10">
              <ThreeGraphBG nodeCount={isSmall ? 125 : 25} />
            </div>
            <Contact />
            <div className='-mt-22 md:mt-0'>
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
