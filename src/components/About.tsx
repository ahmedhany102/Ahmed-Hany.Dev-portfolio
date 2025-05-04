
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="section bg-muted/30">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg">
              I'm Ahmed Hany, a passionate web developer with a keen eye for creating 
              beautiful, functional websites and applications. I focus on writing clean, 
              efficient code and implementing modern design principles.
            </p>
            <p className="text-lg">
              With a strong foundation in frontend and backend technologies, I enjoy 
              building complete web solutions that provide exceptional user experiences.
              I'm constantly learning and adapting to new technologies to stay at the
              forefront of web development.
            </p>
            <p className="text-lg">
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open-source projects, or sharing my knowledge through blog posts and tutorials.
            </p>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold">My Journey</h3>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-2">Education</h4>
                  <p className="text-sm text-muted-foreground">
                    I hold a degree in Computer Science and have completed multiple specialized 
                    courses in web development, focusing on modern frameworks and practices.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-2">Work Experience</h4>
                  <p className="text-sm text-muted-foreground">
                    I've worked with various clients and companies, helping them build 
                    robust web solutions that meet their business needs and engage their users.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-2">Philosophy</h4>
                  <p className="text-sm text-muted-foreground">
                    I believe in creating clean, maintainable code and user-friendly interfaces. 
                    Every project is an opportunity to deliver exceptional value and exceed expectations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
