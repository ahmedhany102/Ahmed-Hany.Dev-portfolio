
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="section bg-muted/30">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className="text-lg">
              I'm Ahmed Hany, a passionate web developer with a keen eye for creating 
              beautiful, functional websites and applications. I focus on writing clean, 
              efficient code and implementing modern design principles.
            </p>
            <p className="text-lg">
              With a strong foundation in frontend and backend technologies, I enjoy 
              building complete web solutions that provide exceptional user experiences.
              I'm constantly learning and adapting to new technologies to stay at the
              forefront of web development.
            </p>
            <p className="text-lg">
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open-source projects, or sharing my knowledge through blog posts and tutorials.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">My Skills</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-3">Frontend</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>React & Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Responsive Design</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-3">Backend</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>REST APIs</li>
                    <li>MongoDB & SQL</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-3">Tools</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Git & GitHub</li>
                    <li>VS Code</li>
                    <li>Figma</li>
                    <li>Webpack</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-3">Other</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>SEO Basics</li>
                    <li>Agile/Scrum</li>
                    <li>UI/UX Principles</li>
                    <li>Performance Optimization</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
