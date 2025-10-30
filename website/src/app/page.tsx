import HomeHero from "@/components/Home/HomeHero";
import Navbar from "@/components/Home/Navbar";
import Services from "@/components/Services/Services";
import SubPage from '@/components/Pricing/SubPage'
import TeamSection from '@/components/OurTeam/TeamSection'
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/End/Footer";
import ThreeGraphBG from "@/components/Home/ThreeGraphBG";


export default function Home() {
  return (
    <div className="">
      <main className="">
        <div className="services">
          <Navbar />
          <HomeHero />
          <div className="relative">
            <div className="absolute inset-0 -z-10">
              <ThreeGraphBG nodeCount={32} />
            </div>
            <div >
              <Services />
            </div>
            <SubPage />
          </div>
          <TeamSection />
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}
