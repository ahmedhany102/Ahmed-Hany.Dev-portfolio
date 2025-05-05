import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
  category: string;
  progress: number;
};

const blogPosts: BlogPost[] = [
  {
    title: "A Complete Guide to Flexbox",
    excerpt: "Our comprehensive guide to CSS flexbox layout. This complete guide explains everything about flexbox, focusing on all the properties for both the parent and the children.",
    date: "May 12, 2023",
    readTime: "15 min read",
    link: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
    category: "CSS",
    progress: 75,
  },
  {
    title: "You Don't Know JS: Scope & Closures",
    excerpt: "This book dives deep into how the JavaScript engine works under the hood, from basic scope, lexical scope, functional scope, and block scope, to closures and the module pattern.",
    date: "April 27, 2023",
    readTime: "25 min read",
    link: "https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures",
    category: "JavaScript",
    progress: 90,
  },
  {
    title: "Modern React with Redux [2023 Update]",
    excerpt: "Learn how to build complex and sophisticated user interfaces by mastering React and Redux. This guide covers both fundamental React concepts and advanced Redux patterns.",
    date: "March 18, 2023",
    readTime: "30 min read",
    link: "https://www.udemy.com/course/react-redux/",
    category: "React",
    progress: 60,
  },
  {
    title: "The Ultimate Guide to Web Performance",
    excerpt: "Discover techniques and best practices to improve the loading speed and runtime performance of your web applications, ensuring a smooth user experience.",
    date: "February 21, 2023",
    readTime: "20 min read",
    link: "https://web.dev/fast/",
    category: "Performance",
    progress: 85,
  },
  {
    title: "TypeScript Handbook: From Novice to Expert",
    excerpt: "A comprehensive guide to TypeScript, covering types, interfaces, generics, decorators, and how to effectively integrate TypeScript into your projects.",
    date: "January 15, 2023",
    readTime: "22 min read",
    link: "https://www.typescriptlang.org/docs/handbook/intro.html",
    category: "TypeScript",
    progress: 70,
  },
];

const categories = ["All", "React", "JavaScript", "TypeScript", "CSS", "Performance"];

export function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [progressValues, setProgressValues] = useState<number[]>(blogPosts.map(post => 0));

  // Filter posts based on search term and category
  useEffect(() => {
    const filtered = blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  // Animate progress bars
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValues(blogPosts.map(post => post.progress));
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="blog" className="section bg-muted/30">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Blog</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          I write about web development, technology trends, and my experiences
          as a developer. Check out some of my recent articles below.
        </p>
        
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search articles..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          {filteredPosts.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No articles found matching your search.
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className={`h-full transition-all duration-300 ${
                    hoveredPost === index ? 'shadow-lg transform scale-[1.02]' : 'hover:shadow-md'
                  }`}
                  onMouseEnter={() => setHoveredPost(index)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <CardDescription className="flex items-center justify-between">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Reading progress</span>
                          <span>{progressValues[blogPosts.indexOf(post)]}%</span>
                        </div>
                        <Progress value={progressValues[blogPosts.indexOf(post)]} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant={hoveredPost === index ? "default" : "link"} 
                      className={`px-0 ${hoveredPost === index ? 'px-4' : ''} flex items-center gap-2`} 
                      asChild
                    >
                      <a href={post.link} target="_blank" rel="noopener noreferrer">
                        Read More
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="https://dev.to" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              View All Posts
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
