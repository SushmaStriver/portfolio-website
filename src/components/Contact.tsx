import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  Envelope,
  Phone,
  MapPin,
} from "phosphor-react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(formRef.current?.children || [], {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      });

      gsap.from(infoRef.current?.children || [], {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Get In <span className="text-primary-glow">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I’m a computer science student actively seeking internships,
            real-world projects, and opportunities to grow as a web developer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@gmail.com"
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Tell me about the opportunity, project, or internship…"
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-gradient-primary text-primary-foreground font-medium hover:scale-105 transition"
              >
                Send Message
                <PaperPlaneTilt size={20} />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-light mb-4 text-foreground">
                Let’s Connect
              </h3>
              <p className="text-muted-foreground mb-4">
                Open to internships, collaborations, and learning opportunities.
              </p>
              <span className="inline-block px-4 py-1 text-sm rounded-full bg-primary/10 text-primary">
                Open to Internships
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 rounded-lg glass">
              <Envelope size={22} />
              <a
                href="mailto:sushmapotnuru1@gmail.com"
                className="hover:text-primary transition"
              >
                sushmapotnuru1@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 rounded-lg glass">
              <Phone size={22} />
              <a
                href="tel:+919652096915"
                className="hover:text-secondary transition"
              >
                +91 96520 96915
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-lg glass">
              <MapPin size={22} />
              <span>India</span>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-medium mb-3 text-foreground">Follow Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/SushmaStriver"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-primary hover:scale-110 transition"
                >
                  <GithubLogo size={20} />
                </a>

                <a
                  href="https://linkedin.com/in/sushma-potnuru-aa1441310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-secondary hover:scale-110 transition"
                >
                  <LinkedinLogo size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
};

export default Contact;
