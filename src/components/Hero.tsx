
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  const handleContactClick = () => {
    toast.success("Let's get in touch!", {
      description: "Navigate to the Contact page to reach out",
      duration: 3000,
    });
  };

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
            Discover my journey as a frontend developer & bug hunter
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="transition-all duration-300 hover:translate-y-[-3px]"
            >
              <Link to="/about">
                About Me
              </Link>
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="secondary" 
                size="lg" 
                asChild
                onClick={handleContactClick}
              >
                <Link to="/contact">
                  Get in Touch
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Abstract background shapes */}
      <motion.div 
        className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl"
        initial={{ opacity: 0.2, x: 50 }}
        animate={{ opacity: 0.4, x: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-1/4 h-1/4 bg-secondary/10 rounded-full blur-3xl"
        initial={{ opacity: 0.1, y: 30 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />
    </section>
  );
}
