
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, Server, Code, Cog } from "lucide-react";

export function BackendInfo() {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <section className="section">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">My Backend Journey</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          While I'm currently a frontend developer, I'm actively learning backend technologies 
          to become a full-stack developer. Here's my learning path and future goals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Programming Foundations
              </CardTitle>
              <CardDescription>
                Building strong fundamentals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                I'm learning C++ to improve my problem-solving skills and strengthen my programming logic. 
                Additionally, I'm studying C# and object-oriented programming principles to build a solid 
                foundation for backend development.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Future Learning
              </CardTitle>
              <CardDescription>
                Expanding my knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                My learning roadmap includes data structures, databases, and ASP.NET for building robust 
                web applications. These skills will allow me to create more complex and scalable projects 
                in the future.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Backend Technologies
              </CardTitle>
              <CardDescription>
                Modern web development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                I plan to learn Node.js as my primary backend technology, which will complement my 
                existing frontend skills and enable me to develop full-stack JavaScript applications
                with seamless integration between client and server.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          onClick={() => setShowInfo(!showInfo)} 
          className="mb-6"
        >
          {showInfo ? "Hide Journey Details" : "Show Journey Details"}
        </Button>
        
        {showInfo && (
          <Alert className="mb-8">
            <AlertTitle>My Full-Stack Development Path</AlertTitle>
            <AlertDescription>
              <p className="mb-2">
                My journey to becoming a full-stack developer follows these steps:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Mastering C++ for algorithmic problem-solving and logic</li>
                <li>Learning C# and object-oriented programming principles</li>
                <li>Studying data structures and algorithms for efficient code</li>
                <li>Exploring database concepts (SQL and NoSQL)</li>
                <li>Learning ASP.NET for enterprise-level applications</li>
                <li>Developing with Node.js for JavaScript-based backend services</li>
                <li>Building larger, more complex full-stack projects</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  );
}
