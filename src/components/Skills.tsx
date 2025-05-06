
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { ChartBar, Database, Server, Code, Cog } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Skill = {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'coming-soon';
  color: string;
  description: string;
  status?: string;
};

const skillsData: Skill[] = [
  { name: "HTML & CSS", level: 100, category: "frontend", color: "bg-orange-500", description: "Semantic HTML5 and modern CSS including Flexbox and Grid" },
  { name: "JavaScript", level: 50, category: "frontend", color: "bg-yellow-500", description: "ES6+, async/await, promises, and functional programming", status: "Learning" },
  { name: "React", level: 0, category: "coming-soon", color: "bg-blue-500", description: "Building interactive user interfaces with React components and hooks" },
  { name: "TypeScript", level: 80, category: "frontend", color: "bg-blue-600", description: "Type-safe code with interfaces, generics, and utility types" },
  { name: "Tailwind CSS", level: 0, category: "coming-soon", color: "bg-cyan-500", description: "Utility-first CSS framework for rapid UI development" },
  { name: "Next.js", level: 0, category: "coming-soon", color: "bg-black", description: "React framework for production with SSR and static site generation" },
  { name: "C++", level: 70, category: "backend", color: "bg-blue-800", description: "Problem solving and strengthening programming logic" },
  { name: "C#", level: 70, category: "backend", color: "bg-purple-700", description: "Building applications with C# fundamentals" },
  { name: "OOP C#", level: 65, category: "backend", color: "bg-purple-800", description: "Object-oriented programming principles with C#" },
  { name: "GitHub", level: 80, category: "tools", color: "bg-gray-800", description: "Version control and collaborative development" },
  { name: "Vibe Coding", level: 90, category: "tools", color: "bg-pink-600", description: "Creating aesthetically pleasing and functional interfaces" },
  { name: "Node.js", level: 0, category: "coming-soon", color: "bg-green-600", description: "Server-side JavaScript runtime environment" },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools' | 'coming-soon'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [animateSkills, setAnimateSkills] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const futureSkillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(skillsRef, { once: false, amount: 0.2 });
  const isFutureInView = useInView(futureSkillsRef, { once: false, amount: 0.2 });
  
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
    { id: 'coming-soon', label: 'Coming Soon' },
  ];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
  };

  return (
    <>
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
            <div className="flex justify-center w-full md:w-auto mb-4 md:mb-0">
              <ToggleGroup type="single" value={activeCategory} onValueChange={(value) => value && setActiveCategory(value as any)}>
                {categories.map((category) => (
                  <ToggleGroupItem 
                    key={category.id} 
                    value={category.id}
                    className="transition-all duration-300"
                    variant="outline"
                  >
                    {category.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            
            <div className="relative w-full md:w-auto">
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
            <AnimatePresence>
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={`bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer ${selectedSkill?.name === skill.name ? 'ring-2 ring-primary' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: animateSkills ? 1 : 0, y: animateSkills ? 0 : 20 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">{skill.name}</h3>
                    <div className="flex items-center gap-2">
                      {skill.status && (
                        <span className="px-2 py-1 rounded text-xs bg-amber-500 text-white">
                          {skill.status}
                        </span>
                      )}
                      {skill.category === "coming-soon" && (
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

                  <AnimatePresence>
                    {selectedSkill?.name === skill.name && (
                      <motion.div 
                        className="mt-4 pt-4 border-t"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm">
                          {skill.category === 'coming-soon' 
                            ? `${skill.name} is on my learning roadmap. I'm planning to start learning it soon to add to my skillset.` 
                            : `I've been working with ${skill.name} for ${skill.level > 80 ? 'a while' : 'some time'} now. Click anywhere on this card to close this detail.`}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="future-skills" className="section bg-muted/30" ref={futureSkillsRef}>
        <div className="container-custom">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isFutureInView ? 1 : 0, y: isFutureInView ? 0 : -20 }}
            transition={{ duration: 0.6 }}
          >
            Future Skills
          </motion.h2>

          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFutureInView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            While I'm currently a frontend developer, I'm actively learning backend technologies 
            to become a full-stack developer. Here's my learning path and future goals.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isFutureInView ? 1 : 0, y: isFutureInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cog className="h-5 w-5" />
                  Programming Foundations
                </CardTitle>
                <CardDescription>
                  Building strong fundamentals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  I'm learning C++ to improve my problem-solving skills and strengthen my programming logic. 
                  Additionally, I'm studying C# and object-oriented programming principles to build a solid 
                  foundation for backend development.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Future Learning
                </CardTitle>
                <CardDescription>
                  Expanding my knowledge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  My learning roadmap includes data structures, databases, and ASP.NET for building robust 
                  web applications. These skills will allow me to create more complex and scalable projects 
                  in the future.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Backend Technologies
                </CardTitle>
                <CardDescription>
                  Modern web development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  I plan to learn Node.js as my primary backend technology, which will complement my 
                  existing frontend skills and enable me to develop full-stack JavaScript applications
                  with seamless integration between client and server.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isFutureInView ? 1 : 0, y: isFutureInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              onClick={() => setShowInfo(!showInfo)} 
              className="mb-6"
            >
              {showInfo ? "Hide Journey Details" : "Show Journey Details"}
            </Button>
            
            {showInfo && (
              <Alert className="mb-8">
                <AlertTitle>My Full-Stack Development Path</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">
                    My journey to becoming a full-stack developer follows these steps:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Mastering C++ for algorithmic problem-solving and logic</li>
                    <li>Learning C# and object-oriented programming principles</li>
                    <li>Studying data structures and algorithms for efficient code</li>
                    <li>Exploring database concepts (SQL and NoSQL)</li>
                    <li>Learning ASP.NET for enterprise-level applications</li>
                    <li>Developing with Node.js for JavaScript-based backend services</li>
                    <li>Building larger, more complex full-stack projects</li>
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
