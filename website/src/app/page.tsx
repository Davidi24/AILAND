import HomeHero from "@/components/Home/HomeHero";
import Navbar from "@/components/Home/Navbar";
import Services from "@/components/Services/Services";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <div className="services">
          <Navbar/>
          <HomeHero/>
          <Services />
        </div>
      </main>
    </div>
  );
}
