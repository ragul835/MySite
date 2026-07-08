import { useState } from "react";
import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
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

const blogPosts: BlogPost[] = [
  {
    slug: "top-web-development-trends-2026",
    title: "Top Web Development Trends in 2026: What Leading IT Companies Are Building",
    excerpt: "Discover the cutting-edge web development trends shaping 2026. From AI-integrated apps to performance-first architectures, learn what your business needs to stay competitive.",
    date: "July 8, 2026",
    readTime: "12 min",
    category: "Web Development",
    tags: ["web development", "trends 2026", "IT company"],
    metaDescription: "Explore the top web development trends in 2026 including AI integration, edge computing, and performance optimization. Expert insights from Seichox, a premier IT company.",
    image: "web-development-trends-2026.jpg",
  },
  {
    slug: "scalable-saas-development-guide",
    title: "Scalable SaaS Development Guide: Build Products That Grow With Your Business",
    excerpt: "A comprehensive guide to building scalable SaaS applications. Learn architecture patterns, multi-tenancy strategies, and tech stacks used by successful IT companies.",
    date: "July 5, 2026",
    readTime: "15 min",
    category: "SaaS Development",
    tags: ["SaaS", "scalability", "software development"],
    metaDescription: "Learn how to build scalable SaaS applications with proven strategies from an experienced IT company. Multi-tenancy, architecture, and growth tips included.",
    image: "scalable-saas-development.jpg",
  },
  {
    slug: "ecommerce-development-best-practices",
    title: "Ecommerce Development Best Practices to Maximize Conversions in 2026",
    excerpt: "Boost your online sales with proven ecommerce development strategies. Speed, UX, SEO, payments, and mobile optimization tactics used by top digital agencies.",
    date: "July 3, 2026",
    readTime: "11 min",
    category: "E-Commerce",
    tags: ["ecommerce", "conversion optimization", "shopify"],
    metaDescription: "Master ecommerce development best practices for 2026. Discover how an IT company optimizes stores for speed, SEO, and conversions that drive real revenue.",
    image: "ecommerce-development.jpg",
  },
  {
    slug: "technical-seo-guide-for-it-companies",
    title: "Technical SEO Guide for Modern Websites: An IT Company Perspective",
    excerpt: "Technical SEO is the foundation of organic growth. This in-depth guide covers Core Web Vitals, structured data, crawlability, and more for high-performing web apps.",
    date: "July 1, 2026",
    readTime: "14 min",
    category: "SEO",
    tags: ["technical SEO", "web performance", "IT services"],
    metaDescription: "Technical SEO guide from a leading IT company. Improve rankings with Core Web Vitals, schema, mobile-first indexing, and modern optimization techniques.",
    image: "technical-seo.jpg",
  },
  {
    slug: "ui-ux-design-for-business-growth",
    title: "How Professional UI/UX Design Drives 3x Business Growth and Conversions",
    excerpt: "Great design isn't just pretty pixels. Learn the measurable business impact of professional UI/UX design and how top IT companies turn interfaces into growth engines.",
    date: "June 28, 2026",
    readTime: "10 min",
    category: "UI/UX Design",
    tags: ["UI/UX", "conversion rate", "user experience"],
    metaDescription: "See how professional UI/UX design from an IT company can dramatically increase conversions, reduce bounce rates, and fuel sustainable business growth.",
    image: "ui-ux-design.jpg",
  },
  {
    slug: "shopify-development-vs-custom-solutions",
    title: "Shopify Development vs Custom Ecommerce: Choosing the Right Solution",
    excerpt: "Confused between Shopify and custom development? We break down the pros, cons, costs, and when to choose each option for your business from an expert IT company.",
    date: "June 25, 2026",
    readTime: "13 min",
    category: "E-Commerce",
    tags: ["shopify", "custom development", "ecommerce platform"],
    metaDescription: "Shopify vs custom ecommerce development: detailed comparison by a top IT company. Find the best fit for your budget, scale, and unique business requirements.",
    image: "shopify-vs-custom.jpg",
  },
];

const categories = ["All", "Web Development", "SaaS Development", "E-Commerce", "SEO", "UI/UX Design"];

export default function BlogPage() {
  useDocumentTitle(
    "Blog | Seichox — IT Company Insights on Web Development, SaaS & SEO",
    "Expert articles from Seichox, a leading IT company. Read in-depth guides on web development, SaaS architecture, ecommerce, technical SEO, and modern software engineering."
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-border/30 bg-gradient-to-b from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_0.8px,transparent_1px)] bg-[length:5px_5px]" />
        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-[0.5px] mb-5">
                EXPERT GUIDES • 2026
              </div>
              <h1 className="text-5xl md:text-[56px] font-heading font-black tracking-[-1.8px] leading-[1.05] mb-5">
                Insights from the<br />engineering team
              </h1>
              <p className="text-[17px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Practical, in-depth articles on modern web development, SaaS architecture, ecommerce, technical SEO, and building products that actually scale.
              </p>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-lg border-b border-border/40 py-4">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow"
                      : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted/60 border border-border/50 rounded-full text-sm focus:outline-none focus:border-primary/60"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <Container>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <AnimateOnScroll key={post.slug} delay={index * 0.03}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="bg-card border border-border/60 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-0.5">
                      {/* Card Header Image - optimized visibility */}
                      <div className="relative h-48 md:h-52 overflow-hidden bg-muted rounded-t-2xl">
                        <img 
                          src={`/blog/${post.image}`} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out transform-gpu will-change-transform"
                          loading="lazy"
                          decoding="async"
                          width="400"
                          height="208"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-black/65" />
                        <div className="absolute top-3 right-3 text-[10px] font-semibold px-3 py-0.5 bg-white/95 text-foreground rounded-full shadow-sm tracking-wide">
                          {post.category}
                        </div>
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] text-white/95 font-medium bg-black/30 px-2 py-0.5 rounded">
                          <Clock className="h-3 w-3" /> {post.readTime}
                        </div>
                      </div>
                      
                      <div className="p-6 md:p-7 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-[12px] text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                        </div>

                        <h2 className="text-[21px] leading-[1.25] font-heading font-semibold tracking-[-0.3px] mb-3 group-hover:text-primary transition-colors line-clamp-3">
                          {post.title}
                        </h2>

                        <p className="text-[14.5px] text-muted-foreground leading-[1.55] flex-1 line-clamp-3 mb-5">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto pt-3 border-t border-border/40">
                          <div className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 gap-1.5 transition-all">
                            Read full article 
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          )}

          {/* Professional "What makes our content different" section - fills space meaningfully */}
          <div className="mt-16 border-t border-border/40 pt-16">
            <div className="text-center mb-10">
              <div className="inline text-xs font-semibold tracking-[1.5px] text-primary bg-primary/10 px-3 py-1 rounded-full">FROM THE BUILDERS</div>
              <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold tracking-tight">What makes our insights different</h2>
              <p className="mt-2 text-muted-foreground max-w-md mx-auto">We don’t write theory. We share patterns that actually work in production.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-card border border-border/60 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Built by practitioners</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Every article is written by engineers who are actively shipping scalable web apps, SaaS platforms, and high-converting ecommerce experiences for real clients.</p>
              </div>

              <div className="bg-card border border-border/60 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Focused on what scales</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">We skip the hype. You’ll find battle-tested approaches that work from early traction to thousands of users and enterprise requirements.</p>
              </div>

              <div className="bg-card border border-border/60 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">2026 realities, not 2023 advice</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">AI integration, edge performance, composable architecture, and modern SEO — we cover what actually moves the needle for ambitious companies right now.</p>
              </div>
            </div>
          </div>

          {/* CTA Section - more prominent */}
          <div className="mt-16 text-center bg-muted/30 border border-border/40 rounded-3xl py-14 px-6">
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-3 tracking-tight">Ready to build something that lasts?</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-[15px]">
              Let’s discuss how Seichox can help you apply these patterns to your next web, SaaS, or ecommerce project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <GradientButton href="/contact#contact-form">Start a conversation</GradientButton>
              <Link href="/services" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-border text-sm font-medium hover:bg-muted transition">Explore our services</Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
