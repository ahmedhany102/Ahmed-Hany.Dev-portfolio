
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
};

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with product listings, cart functionality, and secure payment processing.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    link: "#",
  },
  {
    title: "Portfolio Website",
    description: "A responsive personal portfolio website showcasing projects and skills with a modern, minimalist design.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    link: "#",
  },
  {
    title: "Task Management App",
    description: "A drag-and-drop task management application with user authentication and real-time updates.",
    technologies: ["Next.js", "Firebase", "React DnD", "TypeScript"],
    link: "#",
  },
  {
    title: "Weather Dashboard",
    description: "A weather application displaying current conditions and forecasts using external API data.",
    technologies: ["JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
    link: "#",
  },
];

export function Projects() {
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
            <Card key={index} className="transition-transform hover:-translate-y-1 duration-300">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
