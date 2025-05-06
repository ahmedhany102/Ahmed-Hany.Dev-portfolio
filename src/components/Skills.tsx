
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { ChartBar } from "lucide-react";

type Skill = {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
  color: string;
  description: string;
  status?: string;
  comingSoon?: boolean;
};

const skillsData: Skill[] = [
  { name: "HTML & CSS", level: 100, category: "frontend", color: "bg-orange-500", description: "Semantic HTML5 and modern CSS including Flexbox and Grid" },
  { name: "JavaScript", level: 50, category: "frontend", color: "bg-yellow-500", description: "ES6+, async/await, promises, and functional programming", status: "Learning" },
  { name: "React", level: 0, category: "frontend", color: "bg-blue-500", description: "Building interactive user interfaces with React components and hooks", comingSoon: true },
  { name: "TypeScript", level: 80, category: "frontend", color: "bg-blue-600", description: "Type-safe code with interfaces, generics, and utility types" },
  { name: "Tailwind CSS", level: 0, category: "frontend", color: "bg-cyan-500", description: "Utility-first CSS framework for rapid UI development", comingSoon: true },
  { name: "Next.js", level: 0, category: "frontend", color: "bg-black", description: "React framework for production with SSR and static site generation", comingSoon: true },
  { name: "C++", level: 70, category: "backend", color: "bg-blue-800", description: "Problem solving and strengthening programming logic" },
  { name: "C#", level: 70, category: "backend", color: "bg-purple-700", description: "Building applications with C# fundamentals" },
  { name: "OOP C#", level: 65, category: "backend", color: "bg-purple-800", description: "Object-oriented programming principles with C#" },
  { name: "GitHub", level: 80, category: "tools", color: "bg-gray-800", description: "Version control and collaborative development" },
  { name: "Vibe Coding", level: 90, category: "tools", color: "bg-pink-600", description: "Creating aesthetically pleasing and functional interfaces" },
  { name: "Node.js", level: 0, category: "backend", color: "bg-green-600", description: "Server-side JavaScript runtime environment", comingSoon: true },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [animateSkills, setAnimateSkills] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(skillsRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      setAnimateSkills(true);
    }
  }, [isInView]);

  const filteredSkills = skillsData.filter(
    (skill) => {
      const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
      const matchesSearch = searchTerm === '' || 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }
  );

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools & Others' },
  ];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section id="skills" className="section bg-background/50 backdrop-blur-sm overflow-hidden">
      <div className="container-custom" ref={skillsRef}>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>
        
        <motion.p 
          className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          As a junior frontend developer in a development team, I'm constantly improving my skills and learning new technologies to grow professionally.
        </motion.p>

        <motion.div 
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
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
          
          <div className="relative mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 w-full max-w-xs"
            />
            <svg 
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {filteredSkills.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-muted-foreground text-lg">No skills match your search criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
              className="mt-4"
            >
              Clear filters
            </Button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animateSkills ? 1 : 0, y: animateSkills ? 0 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{skill.name}</h3>
                <div className="flex items-center gap-2">
                  {skill.status && (
                    <span className="px-2 py-1 rounded text-xs bg-amber-500 text-white">
                      {skill.status}
                    </span>
                  )}
                  {skill.comingSoon && (
                    <span className="px-2 py-1 rounded text-xs bg-purple-500 text-white">
                      Coming Soon
                    </span>
                  )}
                  <div className={`px-2 py-1 rounded text-xs text-white ${skill.color}`}>
                    {Math.round(skill.level)}%
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <Progress value={skill.level} className="h-2" />
              </div>
              
              <p className="text-sm text-muted-foreground">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
