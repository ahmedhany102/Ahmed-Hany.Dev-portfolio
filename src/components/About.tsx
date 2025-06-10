

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="section bg-muted/30">
      <div className="container-custom">
        <div className="py-12 md:py-16">
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
            Frontend Developer | Future Full-Stack & Cybersecurity Specialist
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            I build beautiful, responsive websites and applications with modern web technologies. 
            Currently evolving toward becoming a full-stack developer and cybersecurity specialist, 
            focusing on penetration testing, bug bounty hunting, and vulnerability discovery to create secure digital experiences.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mb-12"
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

          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            About Me
          </motion.h2>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-lg">
                I'm Ahmed Hany, a passionate frontend web developer with a keen eye for creating 
                beautiful, functional websites and applications. I'm on an exciting journey toward 
                becoming a full-stack developer and cybersecurity expert specializing in penetration testing and vulnerability assessment.
              </p>
              <p className="text-lg">
                Currently, I'm a frontend team member in a development team where I'm constantly 
                improving my skills and gaining valuable real-world experience. I'm actively learning 
                database management, network fundamentals, and cybersecurity principles with a focus on ethical hacking and bug bounty hunting.
              </p>
              <p className="text-lg">
                When I'm not coding, you can find me exploring new security technologies, practicing penetration testing techniques, 
                or building projects that combine my frontend skills with backend 
                and security knowledge to create robust, secure applications.
              </p>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h3 className="text-2xl font-semibold">My Journey</h3>
              
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2">Education & Development</h4>
                    <p className="text-sm text-muted-foreground">
                      I am currently in the early stages of my Computer Science education, 
                      learning the fundamentals and building a strong theoretical foundation while 
                      applying practical skills through projects and preparing for a career in full-stack development and cybersecurity.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2">Current Focus</h4>
                    <p className="text-sm text-muted-foreground">
                      I'm currently working as a frontend developer while actively expanding into backend technologies 
                      and cybersecurity. My goal is to specialize in penetration testing, bug bounty hunting, 
                      and vulnerability discovery to build more secure applications.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2">Philosophy</h4>
                    <p className="text-sm text-muted-foreground">
                      I believe in creating clean, maintainable, and secure code. 
                      As I transition toward full-stack development and cybersecurity, I value continuous learning 
                      and ethical practices to deliver secure, exceptional value in every project.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

