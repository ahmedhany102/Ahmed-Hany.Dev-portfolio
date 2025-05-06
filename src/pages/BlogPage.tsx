
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-transition pt-16">
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
