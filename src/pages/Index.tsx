
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const Index = () => {
  useEffect(() => {
    // Welcome toast when the homepage loads
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (!hasVisited) {
      toast.success("Welcome to my portfolio!", {
        description: "Explore my skills and projects",
        duration: 4000,
      });
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Navbar />
      <main className="flex-1 page-transition">
        <Hero />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
