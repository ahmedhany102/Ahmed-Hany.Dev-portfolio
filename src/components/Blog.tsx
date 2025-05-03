
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "Getting Started with React Hooks",
    excerpt: "Learn how to use React Hooks to simplify your components and manage state more effectively.",
    date: "April 25, 2023",
    readTime: "5 min read",
    link: "#",
  },
  {
    title: "Optimizing Website Performance",
    excerpt: "Techniques and strategies to improve your website's loading speed and overall performance.",
    date: "March 12, 2023",
    readTime: "8 min read",
    link: "#",
  },
  {
    title: "The Power of CSS Grid Layout",
    excerpt: "Explore the capabilities of CSS Grid and how it can transform your web layouts.",
    date: "February 3, 2023",
    readTime: "6 min read",
    link: "#",
  },
];

export function Blog() {
  return (
    <section id="blog" className="section bg-muted/30">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Blog</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          I write about web development, technology trends, and my experiences
          as a developer. Check out some of my recent articles below.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0" asChild>
                  <a href={post.link}>Read More →</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
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
