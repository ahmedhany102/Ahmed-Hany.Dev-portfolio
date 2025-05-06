
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section id="home" className="section bg-gradient-to-b from-background to-muted/20 flex items-center relative min-h-screen">
      <div className="container-custom z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ahmed Hany
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-4xl font-medium text-primary mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Junior Frontend Developer
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            I build beautiful, responsive websites and applications with modern web technologies. 
            As a junior developer on a team, I'm constantly learning and improving my skills to create 
            better digital experiences.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild size="lg">
              <Link to="/projects">
                View My Work
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">
                Contact Me
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
