
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sonner as sonnerToast } from "sonner";
import { Facebook, Instagram, Github, Linkedin, Mail, Send, Check, MessageSquare } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useEmailStatus } from "@/hooks/use-email-status";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [useWhatsApp, setUseWhatsApp] = useState(false);
  const { toast } = useToast();
  const { isEmailConfigured } = useEmailStatus();

  // Initialize form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      if (useWhatsApp) {
        // Format message for WhatsApp
        const whatsAppMessage = `Name: ${values.name}%0AEmail: ${values.email}%0AMessage: ${values.message}`;
        // Open WhatsApp with the message
        window.open(`https://wa.me/qr/2O2JSVLBTNEIJ1?text=${whatsAppMessage}`, '_blank');
        
        setFormSuccess(true);
        toast({
          title: "WhatsApp opened!",
          description: "Please send your message through WhatsApp.",
        });
        
        form.reset();
        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        // Configure EmailJS parameters
        await emailjs.send(
          "default_service", // Service ID from EmailJS
          "default_template", // Template ID from EmailJS
          {
            from_name: values.name,
            from_email: values.email,
            message: values.message,
            to_name: "Ahmed Hany",
            reply_to: values.email
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
        form.reset();
        
        // Reset success state after delay
        setTimeout(() => setFormSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Try using WhatsApp instead.",
        variant: "destructive",
      });
      
      sonnerToast("Failed to send message", {
        description: "Please try using WhatsApp or contact me directly at ahmedhanyseif97@gmail.com",
        icon: <Mail className="h-4 w-4 text-red-500" />,
      });
      
      // Suggest using WhatsApp instead
      setUseWhatsApp(true);
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
                  <span>ahmedhanyseif97@gmail.com</span>
                </a>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3">WhatsApp</h3>
                <a href="https://wa.me/qr/2O2JSVLBTNEIJ1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Message me on WhatsApp</span>
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Send Message</h3>
              <div className="flex items-center gap-3">
                <Button 
                  variant={!useWhatsApp ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setUseWhatsApp(false)}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
                <Button 
                  variant={useWhatsApp ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseWhatsApp(true)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {useWhatsApp ? (
              <div className="bg-card border rounded-lg p-6">
                <h4 className="font-medium mb-3">Send via WhatsApp</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Click the button below to open WhatsApp and send a message directly.
                </p>
                <a 
                  href="https://wa.me/qr/2O2JSVLBTNEIJ1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Open WhatsApp
                </a>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className={`transition-all duration-300 ${formSuccess ? 'border-green-500' : ''}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            {...field} 
                            className={`transition-all duration-300 ${formSuccess ? 'border-green-500' : ''}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can I help you?" 
                            rows={5} 
                            {...field} 
                            className={`transition-all duration-300 ${formSuccess ? 'border-green-500' : ''}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
