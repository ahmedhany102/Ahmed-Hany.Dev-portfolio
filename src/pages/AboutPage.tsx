
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-transition pt-16">
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
