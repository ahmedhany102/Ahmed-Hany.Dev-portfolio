
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BackendInfo } from "@/components/BackendInfo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-transition">
        <Hero />
        <BackendInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
