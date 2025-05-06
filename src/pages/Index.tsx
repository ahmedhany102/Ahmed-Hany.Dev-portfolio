
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-transition">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
