
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Shield, ShieldCheck, Database, Lock } from "lucide-react";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
  isFrontendOnly?: boolean;
  isApiOnly?: boolean;
  isSecure?: boolean;
};

const projects: Project[] = [
  {
    title: "Ahmed Hany's Portfolio",
    description: "A personal portfolio website with modern design, animations, and interactive elements.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Angular"],
    link: "https://ahmedhany102.github.io/Portfolio.Ahmed-Hany/",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isFrontendOnly: true,
    isSecure: true,
  },
  {
    title: "Big Web",
    description: "A comprehensive web platform showcasing frontend development skills and modern design principles.",
    technologies: ["React", "Node.js", "MongoDB", "Angular"],
    link: "https://ahmedhany102.github.io/ALMaw3EZaa/",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isFrontendOnly: true,
    isSecure: true,
  },
  {
    title: "Restaurant Project",
    description: "An elegant restaurant website with menu presentation, reservation system, and responsive design.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    link: "https://ahmedhany102.github.io/Restaurant/",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isFrontendOnly: true,
    isSecure: true,
  },
  {
    title: "Weather Dashboard",
    description: "An interactive weather application that fetches real-time data from OpenWeather API, displaying current conditions and forecasts.",
    technologies: ["React", "OpenWeather API", "Chart.js", "Angular"],
    link: "https://openweathermap.org/",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isApiOnly: true,
    isSecure: true,
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
        
        {/* Security notice banner */}
        <div className="mb-8 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
          <Lock className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-1">Enhanced Security Protection</h3>
            <p className="text-sm text-green-700 dark:text-green-400">
              All projects on this website implement advanced security measures to protect users. 
              We use secure connections, data encryption, and follow best practices for web security.
            </p>
          </div>
        </div>
        
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
                  <div className="flex justify-between items-start">
                    <CardTitle>{project.title}</CardTitle>
                    <div className="flex gap-2">
                      {project.isSecure && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" />
                          Secure
                        </span>
                      )}
                      {project.isFrontendOnly && (
                        <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-md">
                          Frontend Only
                        </span>
                      )}
                      {project.isApiOnly && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
                          API Only
                        </span>
                      )}
                    </div>
                  </div>
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
                  
                  <div className="bg-muted/30 rounded-md aspect-video flex items-center justify-center overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={activeIndex === index ? "default" : "outline"}
                    size="sm" 
                    asChild
                    className="transition-all duration-300 flex items-center gap-2"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project
                      <ExternalLink className="h-4 w-4" />
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
