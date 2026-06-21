import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CommandCenter from '@/components/CommandCenter';
import Features from '@/components/Features';
import UniverseMap from '@/components/UniverseMap';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030014] text-white relative">
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>
      <div className="relative z-10 hidden sm:block">
        <Navbar />
      </div>
      <div className="relative z-10 sm:hidden">
        <Navbar />
      </div>
      <div className="relative z-10">
        <Hero />
        <CommandCenter />
        <UniverseMap />
        <Features />
        <Footer />
      </div>
    </main>
  );
}
