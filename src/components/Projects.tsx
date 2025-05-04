
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Ahmed Hany's Portfolio",
    description: "A personal portfolio website with modern design, animations, and interactive elements.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "#",
    image: "portfolio.jpg",
  },
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with product listings, cart functionality, and secure payment processing.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    link: "#",
    image: "ecommerce.jpg",
  },
  {
    title: "Real Estate Listing App",
    description: "A property listing website with search filters, maps integration, and user accounts.",
    technologies: ["Next.js", "Firebase", "Google Maps API", "Tailwind CSS"],
    link: "#",
    image: "realestate.jpg",
  },
  {
    title: "Weather Dashboard",
    description: "A weather application displaying current conditions and forecasts using external API data.",
    technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
    link: "#",
    image: "weather.jpg",
  },
];

export function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">My Projects</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Here are some of the projects I've worked on. Each one presented unique 
          challenges and opportunities to apply different technologies and techniques.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`transition-all duration-300 hover:-translate-y-2 h-full ${
                  activeIndex === index ? 'ring-2 ring-primary' : ''
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="bg-muted/50 rounded-md aspect-video flex items-center justify-center text-muted-foreground">
                    {project.image ? (
                      <div className="w-full h-full bg-secondary/30 rounded-md flex items-center justify-center">
                        Project Screenshot
                      </div>
                    ) : null}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={activeIndex === index ? "default" : "outline"}
                    size="sm" 
                    asChild
                    className="transition-all duration-300"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
