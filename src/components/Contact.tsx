import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { Facebook, Instagram, Github, Linkedin, Mail, Send, Check, AlertTriangle, Lock } from "lucide-react";
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
import { canSendMessage, recordMessageSent } from "@/utils/messageRateLimit";

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(3);
  const [securityEnabled, setSecurityEnabled] = useState(true);
  const { toast } = useToast();
  const { isEmailConfigured, securityInitialized } = useEmailStatus();

  // Initialize form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  // Check rate limit on component mount with enhanced security
  useEffect(() => {
    const checkRateLimit = async () => {
      const { allowed, remainingMessages } = await canSendMessage();
      setRateLimitExceeded(!allowed);
      setRemainingMessages(remainingMessages);
      
      if (!allowed) {
        sonnerToast("Daily message limit reached", {
          description: "For security reasons, you can only send 3 messages per day.",
          icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
        });
        
        // Store in session that this user has exceeded limits (backend simulation)
        const secToken = generateSecureToken();
        sessionStorage.setItem('security_breach_detected', encryptData(JSON.stringify({
          reason: 'rate_limit_exceeded',
          timestamp: Date.now(),
          token: secToken,
          action: 'block_form_submission'
        })));
      }
    };
    
    // Check if security is initialized before checking rate limits
    if (securityInitialized) {
      checkRateLimit();
    }
  }, [securityInitialized]);

  // Simple XOR encryption (simulating more complex backend encryption)
  const encryptData = (data: string): string => {
    const key = "java-backend-security-implementation";
    return Array.from(data).map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('');
  };

  // Generate a secure random token (simulating a backend-generated token)
  const generateSecureToken = () => {
    const array = new Uint8Array(24);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // Simulate backend validation - check if user might be using a VPN or different browser
    const securityCheck = performAdvancedSecurityCheck();
    if (!securityCheck.passed) {
      toast({
        title: "Security Warning",
        description: "Unusual activity detected. Message blocked for security reasons.",
        variant: "destructive",
      });
      return;
    }
    
    // Recheck rate limit before sending with enhanced security
    const { allowed, remainingMessages } = await canSendMessage();
    setRemainingMessages(remainingMessages);
    
    if (!allowed) {
      setRateLimitExceeded(true);
      
      // Store security breach attempt (simulating backend logging)
      sessionStorage.setItem('security_blocked_attempt', encryptData(JSON.stringify({
        timestamp: Date.now(),
        type: 'rate_limit_circumvention',
        data_hash: generateSecureToken()
      })));
      
      toast({
        title: "Message blocked",
        description: "Daily limit reached. Our security system has blocked this submission.",
        variant: "destructive",
      });
      
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Updated EmailJS configuration with new service, template, and public key
      await emailjs.send(
        "service_di7j65q", // Service ID
        "template_0jx0m0i", // Template ID
        {
          name: values.name,
          email: values.email,
          message: values.message,
          time: new Date().toLocaleString()
        },
        {
          publicKey: "IvJbg5_jvl0_jd4I7", // Public Key
        }
      );
      
      // Record message sent with enhanced security
      await recordMessageSent();
      const { remainingMessages: remaining } = await canSendMessage();
      setRemainingMessages(remaining);
      
      // Check if this was the last available message
      if (remaining === 0) {
        setRateLimitExceeded(true);
      }
      
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
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
      
      sonnerToast("Failed to send message", {
        description: "Please try again later or contact me directly at ahmedseifeldin97@gmail.com",
        icon: <Mail className="h-4 w-4 text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulated backend security check
  const performAdvancedSecurityCheck = () => {
    try {
      // Get browser fingerprint components that would be checked on a backend
      const userAgent = navigator.userAgent;
      const screenSize = `${window.screen.width}x${window.screen.height}`;
      const colorDepth = window.screen.colorDepth;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const language = navigator.language;
      
      // Calculate security hash - simulating what a backend would do
      const securityComponents = [userAgent, screenSize, colorDepth, timezone, language].join('|');
      let securityHash = 0;
      for (let i = 0; i < securityComponents.length; i++) {
        securityHash = ((securityHash << 5) - securityHash) + securityComponents.charCodeAt(i);
        securityHash |= 0; // Convert to 32bit integer
      }
      
      // Store security validation data (simulating backend session validation)
      const securityValidation = {
        hash: securityHash,
        timestamp: Date.now(),
        validation: generateSecureToken()
      };
      sessionStorage.setItem('security_validation', encryptData(JSON.stringify(securityValidation)));
      
      // In a real backend, this would do actual IP and fingerprint comparison
      // Here we're just simulating the behavior
      return { passed: true, securityLevel: 'high' };
    } catch (error) {
      console.error("Security check error:", error);
      return { passed: false, securityLevel: 'compromised' };
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
                <a href="mailto:ahmedseifeldin97@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>ahmedseifeldin97@gmail.com</span>
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
                    href="https://www.instagram.com/a7med0xd/" 
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
            <h3 className="text-xl font-semibold mb-6">Send Message</h3>

            {rateLimitExceeded ? (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 rounded-md p-6 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-amber-500" />
                <h4 className="text-lg font-medium mb-2">Daily Message Limit Reached</h4>
                <p className="text-sm">
                  You've sent the maximum number of messages allowed per day (3).
                  <br />
                  Please try again tomorrow or contact directly via email.
                </p>
                <div className="mt-4">
                  <a 
                    href="mailto:ahmedseifeldin97@gmail.com" 
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email Directly
                  </a>
                </div>
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
                  
                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full group relative overflow-hidden" 
                      disabled={isSubmitting || remainingMessages === 0}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && <Send className="w-4 h-4" />}
                      </span>
                      <span className={`absolute inset-0 bg-primary-foreground opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></span>
                    </Button>
                    
                    {remainingMessages < 3 && (
                      <p className="text-xs text-muted-foreground text-center">
                        You have {remainingMessages} message(s) remaining today
                      </p>
                    )}
                  </div>
                  
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
