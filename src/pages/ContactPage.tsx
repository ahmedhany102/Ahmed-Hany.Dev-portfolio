
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-transition pt-16">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
