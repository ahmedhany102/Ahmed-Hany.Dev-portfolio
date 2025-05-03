
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="container-custom">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hi, I'm <span className="text-primary">Ahmed Hany</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
            Web Developer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            I build elegant, responsive, and user-friendly web applications
            with modern technologies and best practices.
          </p>
          <div className="flex gap-4 mt-4">
            <Button size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
