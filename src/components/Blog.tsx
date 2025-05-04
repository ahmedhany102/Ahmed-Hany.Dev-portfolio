
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
  category: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "Getting Started with React Hooks",
    excerpt: "Learn how to use React Hooks to simplify your components and manage state more effectively.",
    date: "April 25, 2023",
    readTime: "5 min read",
    link: "#",
    category: "React",
  },
  {
    title: "Building a RESTful API with Node.js and Express",
    excerpt: "A step-by-step guide to creating your own REST API using Node.js, Express, and MongoDB.",
    date: "March 30, 2023",
    readTime: "8 min read",
    link: "#",
    category: "Node.js",
  },
  {
    title: "Optimizing Website Performance",
    excerpt: "Techniques and strategies to improve your website's loading speed and overall performance.",
    date: "March 12, 2023",
    readTime: "8 min read",
    link: "#",
    category: "Performance",
  },
  {
    title: "The Power of CSS Grid Layout",
    excerpt: "Explore the capabilities of CSS Grid and how it can transform your web layouts.",
    date: "February 3, 2023",
    readTime: "6 min read",
    link: "#",
    category: "CSS",
  },
  {
    title: "TypeScript Best Practices for React Developers",
    excerpt: "Learn how to effectively use TypeScript with React to create type-safe and maintainable applications.",
    date: "January 18, 2023",
    readTime: "7 min read",
    link: "#",
    category: "TypeScript",
  },
];

const categories = ["All", "React", "Node.js", "Performance", "CSS", "TypeScript"];

export function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

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
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant={hoveredPost === index ? "default" : "link"} 
                      className={`px-0 ${hoveredPost === index ? 'px-4' : ''}`} 
                      asChild
                    >
                      <a href={post.link}>Read More →</a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
}
