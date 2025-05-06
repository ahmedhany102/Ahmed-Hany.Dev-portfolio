
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-transition pt-16">
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
