
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

type Skill = {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
  color: string;
  description: string;
};

const skillsData: Skill[] = [
  { name: "React", level: 90, category: "frontend", color: "bg-blue-500", description: "Building interactive user interfaces with React components and hooks" },
  { name: "JavaScript", level: 85, category: "frontend", color: "bg-yellow-500", description: "ES6+, async/await, promises, and functional programming" },
  { name: "TypeScript", level: 80, category: "frontend", color: "bg-blue-600", description: "Type-safe code with interfaces, generics, and utility types" },
  { name: "HTML & CSS", level: 90, category: "frontend", color: "bg-orange-500", description: "Semantic HTML5 and modern CSS including Flexbox and Grid" },
  { name: "Tailwind CSS", level: 85, category: "frontend", color: "bg-cyan-500", description: "Utility-first CSS framework for rapid UI development" },
  { name: "Redux", level: 75, category: "frontend", color: "bg-purple-600", description: "State management with Redux and Redux Toolkit" },
  { name: "Next.js", level: 80, category: "frontend", color: "bg-black", description: "React framework for production with SSR and static site generation" },
  { name: "Node.js", level: 75, category: "backend", color: "bg-green-600", description: "Server-side JavaScript runtime environment" },
  { name: "Express", level: 70, category: "backend", color: "bg-gray-600", description: "Web application framework for Node.js" },
  { name: "MongoDB", level: 65, category: "backend", color: "bg-green-700", description: "NoSQL database for modern applications" },
  { name: "Firebase", level: 70, category: "backend", color: "bg-yellow-600", description: "Backend-as-a-Service platform with realtime database" },
  { name: "REST API", level: 80, category: "backend", color: "bg-blue-700", description: "Designing and consuming RESTful APIs" },
  { name: "Git & GitHub", level: 85, category: "tools", color: "bg-orange-600", description: "Version control system and repository hosting" },
  { name: "VS Code", level: 90, category: "tools", color: "bg-blue-800", description: "Code editor with powerful extensions" },
  { name: "Webpack", level: 70, category: "tools", color: "bg-blue-500", description: "Module bundler for JavaScript applications" },
  { name: "Jest", level: 65, category: "tools", color: "bg-red-600", description: "JavaScript testing framework" },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools & Others' },
  ];

  return (
    <section id="skills" className="section bg-background/50 backdrop-blur-sm">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">My Skills</h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Here are the technologies I work with to bring ideas to life. I'm constantly learning and adding new skills to my repertoire.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id as any)}
              className="transition-all duration-300"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              className="bg-card border rounded-lg p-6 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{skill.name}</h3>
                <Badge variant="outline" className={`${skill.color} text-white`}>
                  {skill.category}
                </Badge>
              </div>

              <div className="w-full bg-muted rounded-full h-2.5 mb-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                        style={{
                          width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                          backgroundColor: skill.color.replace('bg-', ''),
                          transition: 'width 1s ease-in-out'
                        }}
                      ></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{skill.level}%</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <p className="text-sm text-muted-foreground">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
