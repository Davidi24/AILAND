import HomeHero from "@/components/Home/HomeHero";
import Navbar from "@/components/Home/Navbar";
import Services from "@/components/Services/Services";
import SubPage from '@/components/Pricing/SubPage'
import TeamSection from '@/components/OurTeam/TeamSection'


export default function Home() {
  return (
    <div className="">
      <main className="">
        <div className="services">
          <Navbar/>
          <HomeHero/>
          <Services />
          <SubPage/>
          <TeamSection/>
        </div>
      </main>
    </div>
  );
}
