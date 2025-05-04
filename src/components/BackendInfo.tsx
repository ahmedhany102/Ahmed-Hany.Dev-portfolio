
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, Server, Code } from "lucide-react";

export function BackendInfo() {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <section className="section">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Backend Development</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          While this portfolio is primarily a frontend application, it can be connected to 
          various backend services. Here's information about how I build backend systems.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Node.js
              </CardTitle>
              <CardDescription>
                Server-side JavaScript runtime
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                I build robust, scalable backend services using Node.js and Express, 
                creating RESTful APIs that connect to various databases and third-party services.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Databases
              </CardTitle>
              <CardDescription>
                Data storage and management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                I work with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB) databases, 
                implementing efficient data schemas and optimizing queries for performance.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                API Development
              </CardTitle>
              <CardDescription>
                Creating robust interfaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                I design and develop well-structured APIs with proper authentication, 
                validation, error handling, and documentation for seamless integration.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          onClick={() => setShowInfo(!showInfo)} 
          className="mb-6"
        >
          {showInfo ? "Hide Technical Details" : "Show Technical Details"}
        </Button>
        
        {showInfo && (
          <Alert className="mb-8">
            <AlertTitle>Important Note About Backend Integration</AlertTitle>
            <AlertDescription>
              <p className="mb-2">
                This portfolio website is currently running as a standalone frontend application.
                To implement a full backend with Node.js, we would need to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Set up a separate Node.js server repository</li>
                <li>Configure Express routes and controllers</li>
                <li>Connect to a database for persistent storage</li>
                <li>Deploy the backend to a hosting service</li>
                <li>Connect this frontend to the backend via API calls</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  );
}
