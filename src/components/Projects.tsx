import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GithubLogo } from "phosphor-react";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(titleRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      });

      // Ensure all cards are initially visible
      gsap.set(cardsRef.current, { opacity: 1, y: 0, scale: 1 });

      // Animate each card individually on scroll
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.from(card, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Hover effect
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -10, scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-visible"
    >
      <div className="container mx-auto max-w-7xl overflow-visible">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Featured <span className="text-primary-glow">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Full-stack projects demonstrating my skills in building modern, scalable web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-visible">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="glass relative z-10 cursor-pointer rounded-xl overflow-hidden hover:shadow-glow-primary transition-all duration-500 group"
              onClick={() =>
                window.open(project.liveDemoLink || project.githubLink, "_blank")
              }
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary-glow transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary-glow text-xs rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent outer div click
                      window.open(project.githubLink, "_blank");
                    }}
                    className="flex items-center gap-1 text-secondary-foreground hover:text-secondary transition-colors"
                  >
                    <GithubLogo size={16} />
                    Code
                  </button>
                  {project.liveDemoLink && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveDemoLink, "_blank");
                      }}
                      className="flex items-center gap-1 text-primary-glow hover:text-primary transition-colors"
                    >
                      <ArrowUpRight size={16} />
                      Live
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
