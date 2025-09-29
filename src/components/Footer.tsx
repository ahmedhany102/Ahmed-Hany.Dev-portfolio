
import { ThemeToggle } from "./ThemeToggle";
import { Facebook, Instagram, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Ahmed Hany. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/ahmedhany102" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/ahmed-hany-436342257/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=100053134410761" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
            <a 
              href="https://www.instagram.com/a7med0xd/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
            <a 
              href="mailto:ahmedhanyseif97@gmail.com" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
