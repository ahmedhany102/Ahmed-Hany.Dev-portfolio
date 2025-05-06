
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section id="home" className="section bg-gradient-to-b from-background to-muted/20 flex items-center relative min-h-screen">
      <div className="container-custom z-10">
        <div className="max-w-3xl text-center md:text-left">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to My Portfolio
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-medium mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover my journey as a frontend developer
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild size="lg">
              <Link to="/about">
                About Me
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/skills">
                My Skills
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Abstract background shapes */}
      <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1/4 h-1/4 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
}
