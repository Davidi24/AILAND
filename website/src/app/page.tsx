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
          <section id="home">
            <HomeHero />
          </section>

          <section className="relative -mt-10 md:mt-0" id="services">
            <div className="absolute inset-0 -z-10">
              <ThreeGraphBG nodeCount={isSmall ? 102 : 32} />
            </div>
            <Services />
          </section>

          <section id="who">
            {/* your "Who's it for" component here */}
          </section>

          <section id="subscription">
            <SubPage />
          </section>

          <section className="relative -mt-18 md:mt-0" id="team">
            <div className="absolute inset-0 -z-10">
              <ThreeGraphBG nodeCount={isSmall ? 100 : 10} />
            </div>
            <TeamSection />
          </section>

          <section className="relative -mt-16 md:mt-0" id="contact">
            <div className="absolute inset-0 -z-10">
              <ThreeGraphBG nodeCount={isSmall ? 125 : 25} />
            </div>
            <Contact />
          </section>

          <section id="blog">
            {/* optional blog section */}
          </section>

          <div className='-mt-3 md:mt-0'>
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}
