import { useState } from "react";
import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useSEO } from "@/hooks/useDocumentTitle";
import { PAGE_SEO, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { Calendar, Clock, ArrowRight, Tag, Search, CheckCircle, TrendingUp, Users } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  metaDescription: string;
  image: string;
}

/** One unique article per service offering */
const blogPosts: BlogPost[] = [
  {
    slug: "top-web-development-trends-2026",
    title: "Top Web Development Trends in 2026: What Leading IT Companies Are Building",
    excerpt: "Discover the cutting-edge web development trends shaping 2026. From AI-integrated apps to performance-first architectures, learn what your business needs to stay competitive.",
    date: "July 8, 2026",
    readTime: "12 min",
    category: "Web Development",
    tags: ["web development", "trends 2026", "IT company"],
    metaDescription: "Explore the top web development trends in 2026 including AI integration, edge computing, and performance optimization. Expert insights from We Raise Tech.",
    image: "web-development-trends-2026.jpg",
  },
  {
    slug: "full-stack-development-playbook",
    title: "Full-Stack Development Playbook: Frontend, Backend, and Everything Between",
    excerpt: "How modern full-stack teams ship reliable products — architecture choices, API design, databases, and delivery practices that scale.",
    date: "July 10, 2026",
    readTime: "14 min",
    category: "Full-Stack Development",
    tags: ["full-stack", "React", "Node.js", "APIs"],
    metaDescription: "Full-stack development playbook from We Raise Tech. Frontend, backend, databases, APIs, and engineering practices for production systems.",
    image: "full-stack-development.jpg",
  },
  {
    slug: "ecommerce-development-best-practices",
    title: "Ecommerce Development Best Practices to Maximize Conversions in 2026",
    excerpt: "Boost your online sales with proven ecommerce development strategies. Speed, UX, SEO, payments, and mobile optimization tactics used by top digital agencies.",
    date: "July 3, 2026",
    readTime: "11 min",
    category: "E-Commerce",
    tags: ["ecommerce", "conversion optimization", "online store"],
    metaDescription: "Master ecommerce development best practices for 2026. Speed, SEO, checkout, and conversion tactics from We Raise Tech.",
    image: "ecommerce-development.jpg",
  },
  {
    slug: "scalable-saas-development-guide",
    title: "Scalable SaaS Development Guide: Build Products That Grow With Your Business",
    excerpt: "A comprehensive guide to building scalable SaaS applications. Learn architecture patterns, multi-tenancy strategies, and tech stacks used by successful product teams.",
    date: "July 5, 2026",
    readTime: "15 min",
    category: "SaaS Development",
    tags: ["SaaS", "scalability", "multi-tenancy"],
    metaDescription: "Learn how to build scalable SaaS applications with multi-tenancy, architecture, and growth strategies from We Raise Tech.",
    image: "scalable-saas-development.jpg",
  },
  {
    slug: "technical-seo-guide-for-it-companies",
    title: "Technical SEO Guide for Modern Websites: An IT Company Perspective",
    excerpt: "Technical SEO is the foundation of organic growth. This in-depth guide covers Core Web Vitals, structured data, crawlability, and more for high-performing web apps.",
    date: "July 1, 2026",
    readTime: "14 min",
    category: "SEO",
    tags: ["technical SEO", "web performance", "Core Web Vitals"],
    metaDescription: "Technical SEO guide from We Raise Tech. Core Web Vitals, schema, mobile-first indexing, and modern optimization techniques.",
    image: "technical-seo.jpg",
  },
  {
    slug: "ui-ux-design-for-business-growth",
    title: "How Professional UI/UX Design Drives 3x Business Growth and Conversions",
    excerpt: "Great design isn't just pretty pixels. Learn the measurable business impact of professional UI/UX design and how product teams turn interfaces into growth engines.",
    date: "June 28, 2026",
    readTime: "10 min",
    category: "UI/UX Design",
    tags: ["UI/UX", "conversion rate", "user experience"],
    metaDescription: "See how professional UI/UX design can increase conversions, reduce bounce rates, and fuel sustainable business growth.",
    image: "ui-ux-design.jpg",
  },
  {
    slug: "shopify-development-vs-custom-solutions",
    title: "Shopify Development vs Custom Ecommerce: Choosing the Right Solution",
    excerpt: "Confused between Shopify and custom development? We break down the pros, cons, costs, and when to choose each option for your store from an expert agency.",
    date: "June 25, 2026",
    readTime: "13 min",
    category: "Shopify Development",
    tags: ["shopify", "shopify plus", "ecommerce platform"],
    metaDescription: "Shopify vs custom ecommerce development: detailed comparison by We Raise Tech. Find the best fit for budget, scale, and requirements.",
    image: "shopify-vs-custom.jpg",
  },
  {
    slug: "ecommerce-optimization-cro-guide",
    title: "E-Commerce Optimization Guide: CRO, Speed, and Revenue Experiments",
    excerpt: "Stop guessing why sales stall. Learn how conversion rate optimization, performance tuning, and experiment design lift revenue from existing traffic.",
    date: "July 11, 2026",
    readTime: "12 min",
    category: "E-Commerce Optimization",
    tags: ["CRO", "conversion rate", "page speed", "A/B testing"],
    metaDescription: "E-commerce optimization and CRO guide from We Raise Tech. Speed, experiments, funnels, and tactics that increase online revenue.",
    image: "ecommerce-optimization.jpg",
  },
  {
    slug: "website-maintenance-support-guide",
    title: "Website Maintenance & Support: Why Ongoing Care Protects Revenue",
    excerpt: "Launches are only the start. Learn how proactive website maintenance, security patches, and support keep your site fast, secure, and converting.",
    date: "July 12, 2026",
    readTime: "11 min",
    category: "Website Maintenance",
    tags: ["website maintenance", "support", "security", "uptime"],
    metaDescription: "Why website maintenance and support matter after launch. Security, speed, backups, and response plans from We Raise Tech.",
    image: "website-maintenance-support.jpg",
  },
  {
    slug: "mobile-app-development-guide-2026",
    title: "Mobile App Development in 2026: Native vs Cross-Platform Decisions",
    excerpt: "Build the right mobile product for iOS and Android. Compare native and cross-platform approaches, costs, and when each path makes business sense.",
    date: "July 14, 2026",
    readTime: "13 min",
    category: "Mobile App Development",
    tags: ["mobile app", "React Native", "Flutter", "iOS", "Android"],
    metaDescription: "Mobile app development guide for 2026. Native vs cross-platform, stacks, timelines, and launch strategy from We Raise Tech.",
    image: "mobile-app-development.jpg",
  },
  {
    slug: "custom-software-development-when-to-build",
    title: "Custom Software Development: When Off-the-Shelf Tools Stop Working",
    excerpt: "Know when to invest in custom software. We cover ROI signals, architecture choices, and how bespoke systems automate unique business workflows.",
    date: "July 16, 2026",
    readTime: "12 min",
    category: "Custom Software",
    tags: ["custom software", "enterprise", "automation", "integrations"],
    metaDescription: "When custom software development beats SaaS tools. ROI, process automation, integrations, and ownership insights from We Raise Tech.",
    image: "custom-software-development.jpg",
  },
];

const categories = [
  "All",
  "Web Development",
  "Full-Stack Development",
  "E-Commerce",
  "SaaS Development",
  "SEO",
  "UI/UX Design",
  "Shopify Development",
  "E-Commerce Optimization",
  "Website Maintenance",
  "Mobile App Development",
  "Custom Software",
];

export default function BlogPage() {
  useSEO({
    title: PAGE_SEO.blog.title,
    description: PAGE_SEO.blog.description,
    path: PAGE_SEO.blog.path,
    brandTitle: false,
    keywords: [
      "software development blog",
      "web development insights",
      "SaaS architecture",
      "mobile app development guide",
      "technical SEO",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
      itemListJsonLd(
        "We Raise Tech Blog Articles",
        blogPosts.map((p) => ({
          name: p.title,
          path: `/blog/${p.slug}`,
          description: p.metaDescription,
        }))
      ),
    ],
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q)) ||
      post.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col">
      <section className="relative overflow-hidden pb-14 pt-16 sm:pb-16 sm:pt-24 lg:pt-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,hsl(var(--primary)/0.12),transparent)]" />
        </div>
        <Container>
          <AnimateOnScroll>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                Insights · One article per service
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tighter leading-[1.05] mb-6">
                Blog{" "}
                <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent">
                  by Service
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Unique deep-dives for every offering — web, full-stack, ecommerce, SaaS, SEO, design, Shopify, optimization, maintenance, mobile, and custom software.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2 max-w-4xl">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border/50 bg-card/40 text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          {filteredPosts.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">No articles match your filters.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <AnimateOnScroll key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="premium-card h-full overflow-hidden flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={`/blog/${post.image}`}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white border border-white/10">
                          {post.category}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {post.date}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {post.readTime}
                          </span>
                        </div>
                        <h2 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{post.excerpt}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                              <Tag className="w-2.5 h-2.5" /> {tag}
                            </span>
                          ))}
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                          Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          )}

          <div className="mt-20 premium-card p-8 md:p-10 text-center">
            <SectionHeader
              title="Explore the service behind each article"
              subtitle="Every post maps to a real We Raise Tech capability — from maintenance retainers to mobile apps and custom platforms."
            />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/services">
                <GradientButton>View all services</GradientButton>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-border text-sm font-medium hover:bg-muted transition">
                Talk to our team
              </Link>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
              {[
                { icon: CheckCircle, label: "11 services", sub: "One unique article each" },
                { icon: TrendingUp, label: "Practical playbooks", sub: "Built from delivery work" },
                { icon: Users, label: "For founders & teams", sub: "Clear next steps" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 p-3 rounded-xl border border-border/40 bg-card/30">
                  <item.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
