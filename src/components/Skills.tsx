
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { ChartBar, Database, Server, Code, Cog } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SkillsFilter } from "@/components/SkillsFilter";
import { toast } from "sonner";

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
  { name: "React", level: 10, category: "frontend", color: "bg-blue-500", description: "Building interactive user interfaces with React components and hooks", status: "Learning" },
  { name: "TypeScript", level: 0, category: "coming-soon", color: "bg-blue-600", description: "Type-safe code with interfaces, generics, and utility types" },
  { name: "Tailwind CSS", level: 0, category: "coming-soon", color: "bg-cyan-500", description: "Utility-first CSS framework for rapid UI development" },
  { name: "Next.js", level: 0, category: "coming-soon", color: "bg-black", description: "React framework for production with SSR and static site generation" },
  { name: "C++", level: 70, category: "backend", color: "bg-blue-800", description: "Problem solving and strengthening programming logic" },
  { name: "C#", level: 70, category: "backend", color: "bg-purple-700", description: "Building applications with C# fundamentals" },
  { name: "OOP C#", level: 65, category: "backend", color: "bg-purple-800", description: "Object-oriented programming principles with C#" },
  { name: "GitHub", level: 80, category: "tools", color: "bg-gray-800", description: "Version control and collaborative development" },
  { name: "Vibe Coding", level: 90, category: "tools", color: "bg-pink-600", description: "Creating aesthetically pleasing and functional interfaces" },
  { name: "Node.js", level: 0, category: "coming-soon", color: "bg-green-600", description: "Server-side JavaScript runtime environment" },
  { name: "Linux", level: 60, category: "tools", color: "bg-yellow-800", description: "Operating system skills and command line proficiency" },
  { name: "Webflow", level: 50, category: "frontend", color: "bg-blue-500", description: "Visual web design platform for creating responsive websites", status: "Learning" },
  { name: "SQL Database", level: 30, category: "backend", color: "bg-green-700", description: "Database design and structured query language for data management", status: "Learning" },
  { name: "Network Basics", level: 70, category: "backend", color: "bg-red-600", description: "Understanding network fundamentals and protocols" },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools' | 'coming-soon'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [animateSkills, setAnimateSkills] = useState(true);
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

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
    if (selectedSkill?.name !== skill.name) {
      toast(`${skill.name} selected`, {
        description: skill.category === 'coming-soon' ? 'On my learning roadmap' : `Current proficiency: ${skill.level}%`,
        duration: 2000,
        position: 'bottom-center',
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    toast.info("Filters cleared", {
      duration: 1500,
    });
  };

  // Card container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  // Individual card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
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
            As a junior frontend developer in a development team, I'm on my journey toward becoming a cybersecurity expert and full-stack developer, constantly improving my skills and learning new technologies.
          </motion.p>

          <SkillsFilter 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onClearFilters={clearFilters}
          />

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
                onClick={clearFilters}
                className="mt-4"
              >
                Clear filters
              </Button>
            </motion.div>
          )}

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className={`bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer ${selectedSkill?.name === skill.name ? 'ring-2 ring-primary' : ''}`}
                variants={cardVariants}
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
          </motion.div>
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
            Future Skills & Career Path
          </motion.h2>

          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFutureInView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I'm actively working toward becoming a cybersecurity expert and full-stack developer. 
            Currently learning database management, network fundamentals, and building my path to advanced security and development skills.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isFutureInView ? 1 : 0, y: isFutureInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cog className="h-5 w-5" />
                  Cybersecurity Path
                </CardTitle>
                <CardDescription>
                  Building security expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  I'm learning network fundamentals and cybersecurity principles to become a security expert. 
                  This includes understanding network protocols, security frameworks, and threat analysis to 
                  protect digital assets and systems.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database & Backend
                </CardTitle>
                <CardDescription>
                  Data management skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Currently learning SQL database design and management, along with backend development 
                  principles. These skills will enable me to build secure, scalable applications with 
                  proper data handling and storage solutions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Full-Stack Development
                </CardTitle>
                <CardDescription>
                  Complete web solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  My goal is to become a full-stack developer with strong cybersecurity knowledge. 
                  This combination will allow me to create secure, end-to-end web applications 
                  while understanding and implementing security best practices.
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
              onClick={() => {
                setShowInfo(!showInfo);
                if (!showInfo) {
                  toast.info("Journey details expanded", {
                    duration: 1500,
                  });
                }
              }} 
              className="mb-6"
              variant="secondary"
            >
              {showInfo ? "Hide Journey Details" : "Show Journey Details"}
            </Button>
            
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
