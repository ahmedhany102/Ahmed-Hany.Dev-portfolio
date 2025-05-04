import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { Facebook, Instagram, Github, Linkedin, Mail, Send, Check } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useEmailStatus } from "@/hooks/use-email-status";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const { toast } = useToast();
  const { isEmailConfigured } = useEmailStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use EmailJS directly, bypassing account configuration
      await emailjs.send(
        "default_service",
        "default_template",
        {
          from_name: name,
          from_email: email,
          message: message,
          to_name: "Ahmed Hany",
          reply_to: email
        },
        {
          publicKey: "IZgn4jwjJOvB-KaZs",
        }
      );
      
      console.log("Email sent successfully");
      
      setFormSuccess(true);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      sonnerToast("Message sent successfully!", {
        description: "I'll get back to you soon.",
        icon: <Check className="h-4 w-4 text-green-500" />
      });
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      
      // Reset success state after delay
      setTimeout(() => setFormSuccess(false), 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
      
      sonnerToast("Failed to send message", {
        description: "Please try again or contact me directly via email.",
        icon: <Mail className="h-4 w-4 text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have a project in mind or want to discuss a potential collaboration?
              Feel free to reach out using the contact form or through my social media.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Email</h3>
                <a href="mailto:ahmedhanyseif97@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>this is a secret</span>
                </a>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">Location</h3>
                <p className="text-muted-foreground">Elgharbia, Egypt</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">Connect</h3>
                <div className="flex flex-wrap gap-4 mt-2">
                  <a 
                    href="https://github.com/ahmedhany102" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ahmed-hany-436342257/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://www.facebook.com/profile.php?id=100053134410761" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/a7med._.hany/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className={`transition-all duration-300 ${formSuccess ? 'border-green-500' : ''}`}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className={`transition-all duration-300 ${formSuccess ? 'border-green-500' : ''}`}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can I help you?"
                  rows={5}
                  required
                  className={`transition-all duration-300 ${formSuccess ? 'border-green-500' : ''}`}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full group relative overflow-hidden" 
                disabled={isSubmitting}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </span>
                <span className={`absolute inset-0 bg-primary-foreground opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></span>
              </Button>
              
              {formSuccess && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-md p-4 mt-4 text-sm flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Message sent successfully!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
