
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const SkillsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-transition pt-16">
        <Skills />
      </main>
      <Footer />
    </div>
  );
};

export default SkillsPage;
