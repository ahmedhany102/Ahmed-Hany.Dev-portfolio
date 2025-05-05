
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
    title: "Understanding React Hooks: A Comprehensive Guide",
    excerpt: "React Hooks have revolutionized how we write React components. Learn how to use useState, useEffect, useContext and more to build better applications.",
    date: "April 25, 2023",
    readTime: "8 min read",
    link: "https://reactjs.org/docs/hooks-intro.html",
    category: "React",
    progress: 75,
  },
  {
    title: "Building a RESTful API with Node.js and Express",
    excerpt: "Learn how to create a fully-featured REST API from scratch using Node.js, Express, and MongoDB. Includes authentication, validation, and error handling.",
    date: "March 30, 2023",
    readTime: "12 min read",
    link: "https://www.freecodecamp.org/news/build-a-restful-api-with-node-js-and-express-js/",
    category: "Node.js",
    progress: 90,
  },
  {
    title: "The Complete Guide to Modern Web Performance Optimization",
    excerpt: "Discover the latest techniques for improving web performance including code splitting, lazy loading, caching strategies, and server-side optimizations.",
    date: "March 12, 2023",
    readTime: "15 min read",
    link: "https://web.dev/learn/performance/",
    category: "Performance",
    progress: 60,
  },
  {
    title: "CSS Grid Layout: The Complete Developer's Guide",
    excerpt: "Master CSS Grid with practical examples and learn how to create responsive layouts with this powerful tool. Includes tips for browser compatibility.",
    date: "February 3, 2023",
    readTime: "10 min read",
    link: "https://css-tricks.com/snippets/css/complete-guide-grid/",
    category: "CSS",
    progress: 85,
  },
  {
    title: "TypeScript Best Practices for React Applications",
    excerpt: "Improve your React codebase with TypeScript. Learn about proper typing, generics, interfaces, and how to avoid common pitfalls in TypeScript React projects.",
    date: "January 18, 2023",
    readTime: "11 min read",
    link: "https://www.typescriptlang.org/docs/handbook/react.html",
    category: "TypeScript",
    progress: 70,
  },
];

const categories = ["All", "React", "Node.js", "Performance", "CSS", "TypeScript"];

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
