export const SERVICES = [
  {
    title: "E-Commerce Development",
    slug: "e-commerce",
    description: "We build scalable, conversion-focused e-commerce platforms.",
    longDescription: "Your online store isn’t just a website — it’s your business in motion. At We Raise Tech, we create e-commerce experiences that convert visitors into loyal customers. From performance-optimized storefronts to flexible integrations and blazing-fast checkouts, we focus on what matters most: driving growth, not just traffic. Whether you’re launching your first shop or scaling to thousands of orders, we build platforms that grow with you.",
    icon: "ShoppingCart",
    targetAudience: "Established retail brands, ambitious D2C startups, and B2B wholesalers looking to scale their digital sales channels and overcome technical limitations.",
    hurdles: [
      "Slow website & high bounce rates",
      "Poor conversion & UX friction",
      "Integration & scalability issues",
      "SEO / discoverability problems",
      "Maintenance & support gaps"
    ],
    benefits: [
      { title: "Increased Conversions", description: "By reducing friction in the checkout process and optimizing product discovery, we turn more visitors into buyers.", icon: "Target" },
      { title: "Scalable Infrastructure", description: "Our architectures run on modern cloud technologies, ensuring your store is fast during major sales events.", icon: "Layers" },
      { title: "Secure Transactions", description: "We implement enterprise-grade security protocols, PCI compliance, and robust data encryption.", icon: "Shield" },
    ],
    features: [
      { 
        title: "Custom Store Development", 
        description: "Build a fully custom e-commerce store from scratch, tailored to your business logic.",
        details: ["Fully responsive, mobile-first design", "Custom modules and features", "High performance & clean code", "SEO optimized architecture"]
      },
      { 
        title: "Platform Migration", 
        description: "Seamlessly migrate from legacy systems without losing SEO or data.",
        details: ["SEO-preserving migrations", "Data (products, orders, customers) migration", "URL redirects strategy", "Testing and rollback planning"]
      },
      { 
        title: "UX & Conversion Optimization", 
        description: "Improve user experience, reduce friction, and boost conversion rates.",
        details: ["User journey mapping", "A/B testing & heatmaps", "Checkout flow optimization", "Trust signals refinement"]
      },
      { 
        title: "Integrations & API Development", 
        description: "Connect your store with ERP, CRM, inventory tools, shipping, and payment gateways.",
        details: ["REST / GraphQL API building", "Middleware & synchronization", "Payment gateway integration", "Webhooks & automation"]
      }
    ],
    security: [
      { title: "Data Encryption", description: "AES-256 encryption at rest and TLS 1.3 in transit." },
      { title: "Access Control", description: "Strict JWT-based authentication and Role-Based Access Control (RBAC)." },
      { title: "Disaster Recovery", description: "Automated daily backups and multi-region failover configuration." }
    ],
    process: [
      { step: "01", title: "Discovery", description: "We audit your current tech stack and analyze your competitors." },
      { step: "02", title: "Design", description: "Our designers create high-converting wireframes." },
      { step: "03", title: "Development", description: "We build the platform using modern frameworks and integrate APIs." },
      { step: "04", title: "Launch", description: "Rigorous QA testing, load testing, and security audits." }
    ],
    technologies: ["React", "Next.js", "Node.js", "Stripe", "PostgreSQL", "Redis", "GraphQL"],
    faqs: [
      { question: "Do you build custom platforms or use existing CMS?", answer: "We do both. We build custom headless e-commerce solutions from scratch, or leverage platforms like Shopify Plus." },
      { question: "How long does a typical e-commerce project take?", answer: "A custom e-commerce build typically takes between 3 to 6 months, depending on the complexity of integrations." },
      { question: "Will my team be able to manage the store easily?", answer: "Yes. We provide an intuitive admin panel for your team to manage products, orders, and content without needing technical skills." }
    ]
  },
  {
    title: "Full-Stack Web Developers",
    slug: "full-stack",
    description: "Scalable web solutions using modern tech stacks.",
    longDescription: "From intuitive frontends to powerful backends, our full-stack engineering team builds robust, dynamic web applications tailored to your specific business logic. We don't just write code; we engineer solutions. By leveraging the latest technologies and best practices in software architecture, we deliver secure, highly available, and easily maintainable digital products that serve as the technical backbone of your company.",
    icon: "Layout",
    targetAudience: "Tech startups needing MVPs, enterprises looking to digitize internal processes, and companies requiring complex custom web applications.",
    hurdles: [
      "Monolithic, hard-to-maintain codebases",
      "Slow application load times",
      "Lack of scalable infrastructure",
      "Security vulnerabilities in old frameworks",
      "Poor API integrations"
    ],
    benefits: [
      { title: "End-to-End Solutions", description: "Complete development from database architecture to user interface design.", icon: "Layers" },
      { title: "High Performance", description: "Optimized, clean code combined with modern rendering techniques.", icon: "Zap" },
      { title: "Future-Proof Tech", description: "Built using modern, community-backed frameworks.", icon: "Code" },
    ],
    features: [
      { 
        title: "Frontend Engineering", 
        description: "Building interactive, responsive, and accessible user interfaces.",
        details: ["React, Vue, or Next.js architectures", "State management solutions", "Micro-frontend setups", "Performance optimization"]
      },
      { 
        title: "Backend Systems", 
        description: "Developing robust server-side logic and microservices.",
        details: ["Node.js, Python, or Go APIs", "Event-driven architecture", "Serverless computing", "Background job processing"]
      },
      { 
        title: "API Development", 
        description: "Designing scalable APIs to seamlessly connect your services.",
        details: ["RESTful API design", "GraphQL endpoints", "Third-party integrations", "Rate limiting & security"]
      },
      { 
        title: "Database Architecture", 
        description: "Strategic modeling of databases for optimized data storage.",
        details: ["SQL and NoSQL modeling", "Database sharding", "In-memory caching", "Data migration strategies"]
      }
    ],
    security: [
      { title: "Vulnerability Scanning", description: "Automated dependency checks and SAST/DAST integration." },
      { title: "Data Protection", description: "End-to-end encryption and compliance with GDPR/CCPA." },
      { title: "Secure APIs", description: "Implementation of OAuth 2.0, API gateways, and DDoS protection." }
    ],
    process: [
      { step: "01", title: "Architecture", description: "System mapping, database schema design, and tech stack selection." },
      { step: "02", title: "Planning", description: "Dividing the project into agile sprints with clear milestones." },
      { step: "03", title: "Implementation", description: "Writing clean code with continuous peer reviews." },
      { step: "04", title: "Deployment", description: "Setting up continuous integration pipelines (CI/CD)." }
    ],
    technologies: ["TypeScript", "React", "Node.js", "Python", "GraphQL", "AWS", "Docker"],
    faqs: [
      { question: "Do you provide source code ownership?", answer: "Absolutely. Once the project is completed, the intellectual property is 100% yours." },
      { question: "Can you scale my existing application?", answer: "Yes. We often perform codebase audits, refactor legacy code, and migrate applications." },
      { question: "How do you handle project management?", answer: "We use agile methodologies, providing you with weekly updates and direct access via Slack." }
    ]
  },
  {
    title: "SEO Experts",
    slug: "seo",
    description: "Boost your visibility, traffic, and search rankings.",
    longDescription: "Dominate search engine results and drive highly targeted organic traffic with our comprehensive SEO strategies. We go beyond basic keyword insertion; we employ advanced, data-driven techniques encompassing technical SEO, content strategy, and authoritative link building. Our goal is to improve your digital footprint sustainably, ensuring you rank higher for the terms that actually drive revenue for your business.",
    icon: "Search",
    targetAudience: "Businesses of all sizes looking to reduce reliance on paid advertising and build a sustainable stream of inbound leads.",
    hurdles: [
      "Low organic search traffic",
      "High customer acquisition costs via ads",
      "Technical errors blocking indexation",
      "Poor content structure",
      "Lack of authoritative backlinks"
    ],
    benefits: [
      { title: "Sustainable Growth", description: "Achieve a consistent increase in high-quality website traffic.", icon: "TrendingUp" },
      { title: "Industry Authority", description: "Higher rankings establish your brand as a trusted leader.", icon: "Globe" },
      { title: "Higher ROI", description: "SEO provides one of the highest returns on investment available.", icon: "LineChart" },
    ],
    features: [
      { 
        title: "Technical SEO", 
        description: "Fixing the underlying code so search engines can read your site.",
        details: ["Core Web Vitals optimization", "XML Sitemaps & robots.txt", "Schema markup implementation", "Crawl budget optimization"]
      },
      { 
        title: "On-Page SEO", 
        description: "Strategic optimization of content, headers, and meta tags.",
        details: ["Keyword clustering", "Title tag & meta description tuning", "Internal link architecture", "Search intent alignment"]
      },
      { 
        title: "Off-Page SEO", 
        description: "Acquiring high-authority backlinks and brand mentions.",
        details: ["Digital PR campaigns", "Guest posting outreach", "Broken link building", "Competitor backlink gap analysis"]
      },
      { 
        title: "Content Strategy", 
        description: "Creating pillar pages that answer your audience's questions.",
        details: ["Topic cluster modeling", "Content gap analysis", "Blog post creation", "Content refresh of old pages"]
      }
    ],
    process: [
      { step: "01", title: "Audit", description: "We analyze your site health, backlinks, and competitors." },
      { step: "02", title: "Strategy", description: "Developing a tailored roadmap for search dominance." },
      { step: "03", title: "Execution", description: "Implementing technical fixes and launching content." },
      { step: "04", title: "Monitoring", description: "Monthly reporting on rankings and traffic growth." }
    ],
    technologies: ["Ahrefs", "SEMrush", "Google Analytics 4", "Search Console", "Screaming Frog", "SurferSEO"],
    faqs: [
      { question: "How long does it take to see SEO results?", answer: "SEO is a long-term strategy. Noticeable improvements typically occur between 3 to 6 months." },
      { question: "Do you guarantee first-page rankings?", answer: "No reputable SEO provider guarantees specific rankings due to Google's algorithm. We guarantee best-in-class implementation." },
      { question: "Do I need to rewrite my entire website?", answer: "Not always. We usually optimize existing content first, and add new pages strategically." }
    ]
  },
  {
    title: "SaaS Development Experts",
    slug: "saas",
    description: "Build scalable, high-performance SaaS platforms.",
    longDescription: "Turn your software vision into a reality with our expert SaaS development. Building a SaaS product requires a unique approach compared to standard web apps. We engineer multi-tenant architectures designed for massive concurrency, rock-solid security, and seamless subscription management. From MVP launch to scaling an enterprise-grade platform, we are your technical partners.",
    icon: "Cloud",
    targetAudience: "Founders launching new software products, and established companies transitioning to subscription models.",
    hurdles: [
      "Complex multi-tenant data architecture",
      "Subscription billing edge cases",
      "Scaling to handle concurrent users",
      "Data privacy and compliance (SOC2)",
      "Lengthy time-to-market for new features"
    ],
    benefits: [
      { title: "Multi-Tenant Architecture", description: "Efficient sharing of infrastructure with strict data isolation.", icon: "Database" },
      { title: "Rapid Scaling", description: "Cloud-native designs leveraging microservices.", icon: "Rocket" },
      { title: "High Availability", description: "Redundant systems ensuring mission-critical uptime.", icon: "Clock" },
    ],
    features: [
      { 
        title: "Subscription & Billing", 
        description: "Complex integration for tiered pricing and metered billing.",
        details: ["Stripe / Paddle integration", "Proration logic handling", "Automated invoicing", "Dunning management"]
      },
      { 
        title: "Advanced Authentication", 
        description: "Secure login systems including SSO and granular access control.",
        details: ["SAML / OAuth2 / SSO", "Multi-Factor Authentication (MFA)", "Role-Based Access Control (RBAC)", "Session management"]
      },
      { 
        title: "Admin Dashboards", 
        description: "Intuitive interfaces for users and super-admins.",
        details: ["User activity tracking", "Revenue analytics", "Feature flagging", "Tenant management"]
      },
      { 
        title: "API Integrations", 
        description: "Building robust webhooks to connect with third-party tools.",
        details: ["Public API creation", "Webhook dispatching", "Zapier integration", "Rate limiting"]
      }
    ],
    security: [
      { title: "Tenant Isolation", description: "Row-level security or separate schemas to prevent cross-tenant data leaks." },
      { title: "Compliance Ready", description: "Architecture designed to pass SOC2, HIPAA, or GDPR audits easily." },
      { title: "Continuous Monitoring", description: "Real-time anomaly detection and intrusion prevention systems." }
    ],
    process: [
      { step: "01", title: "Strategy", description: "Defining the MVP feature set and mapping the user journey." },
      { step: "02", title: "Prototyping", description: "Creating clickable prototypes to test with potential users." },
      { step: "03", title: "Engineering", description: "Building the underlying architecture and billing systems." },
      { step: "04", title: "Beta Launch", description: "Releasing to a closed group, monitoring, and fixing bugs." }
    ],
    technologies: ["Next.js", "Node.js", "Docker", "Kubernetes", "PostgreSQL", "Stripe", "AWS"],
    faqs: [
      { question: "Can you help me build an MVP?", answer: "Yes, we specialize in building Minimum Viable Products (MVPs) that serve as the foundation for future scaling." },
      { question: "How do you handle data security for SaaS?", answer: "We implement end-to-end encryption, strict tenant data isolation, and regular security audits." },
      { question: "Will my SaaS handle thousands of users?", answer: "Absolutely. We design cloud-native architectures utilizing load balancing and sharding." }
    ]
  },
  {
    title: "UI/UX Designers",
    slug: "ui-ux",
    description: "Digital experiences that delight and convert users.",
    longDescription: "Create memorable digital experiences that users love. A great product is useless if users can't figure out how to use it. Our UI/UX design process focuses on deep empathy for the end-user, blending stunning visual aesthetics with intuitive, frictionless usability. We design interfaces that not only look beautiful but are strategically crafted to guide users toward conversion.",
    icon: "PenTool",
    targetAudience: "Companies looking to redesign their digital products, and startups needing a world-class design system.",
    hurdles: [
      "High user churn and drop-off rates",
      "Confusing navigation flows",
      "Outdated, unprofessional aesthetics",
      "Inconsistent branding across platforms",
      "Accessibility compliance issues"
    ],
    benefits: [
      { title: "Enhanced Usability", description: "Intuitive navigation that reduces user frustration.", icon: "Users" },
      { title: "Brand Consistency", description: "A cohesive visual identity across all touchpoints.", icon: "Sparkles" },
      { title: "Higher Retention", description: "Engaging experiences that keep users coming back.", icon: "Target" },
    ],
    features: [
      { 
        title: "User Research & Personas", 
        description: "Conducting user interviews to understand pain points.",
        details: ["Stakeholder interviews", "Competitor benchmarking", "User persona creation", "Empathy mapping"]
      },
      { 
        title: "Wireframing & Flows", 
        description: "Creating structural blueprints of your application.",
        details: ["Information architecture", "Low-fidelity wireframes", "User journey mapping", "Card sorting"]
      },
      { 
        title: "High-Fidelity UI Design", 
        description: "Crafting pixel-perfect, modern interfaces.",
        details: ["Custom iconography", "Typography systems", "Color palette generation", "Dark mode design"]
      },
      { 
        title: "Interactive Prototyping", 
        description: "Building clickable models in Figma to test user flows.",
        details: ["Micro-interactions", "Transition animations", "Usability testing", "Developer handoff specs"]
      }
    ],
    process: [
      { step: "01", title: "Empathize", description: "Understanding the business goals and users' needs." },
      { step: "02", title: "Define", description: "Establishing personas and brainstorming solutions." },
      { step: "03", title: "Design", description: "Creating wireframes and high-fidelity prototypes." },
      { step: "04", title: "Test", description: "Usability testing, refining, and preparing for developers." }
    ],
    technologies: ["Figma", "Framer", "Illustrator", "Webflow", "Storybook", "Lottie"],
    faqs: [
      { question: "Do you only do design, or also development?", answer: "We offer both. Our design team works closely with our in-house developers for seamless implementation." },
      { question: "Can you redesign our existing app?", answer: "Yes. We frequently perform UI/UX audits and redesigns for existing platforms." },
      { question: "Do you create design systems?", answer: "Yes, we build comprehensive design systems in Figma, ensuring consistency as your product scales." }
    ]
  },
  {
    title: "Shopify Development",
    slug: "shopify",
    description: "We build fast, scalable, and custom Shopify stores.",
    longDescription: "Maximize your retail potential with our specialized Shopify development services. From completely custom theme designs to complex private app integrations and headless commerce setups, we build Shopify stores that are visually striking, lightning-fast, and optimized to convert browsers into buyers.",
    icon: "ShoppingBag",
    targetAudience: "Growing e-commerce brands, high-volume merchants upgrading to Shopify Plus, and retailers migrating platforms.",
    hurdles: [
      "Generic themes that don't match brand identity",
      "Slow loading due to excessive app usage",
      "Complex B2B wholesale requirements",
      "Painful migrations from WooCommerce/Magento",
      "Need for custom cart/checkout logic"
    ],
    benefits: [
      { title: "Tailored Experience", description: "Custom themes that break the mold of generic templates.", icon: "PenTool" },
      { title: "Optimized Performance", description: "Fast-loading stores that reduce bounce rates.", icon: "Zap" },
      { title: "Seamless Operations", description: "Automated workflows and custom integrations.", icon: "Wrench" },
    ],
    features: [
      { 
        title: "Custom Theme Development", 
        description: "Building responsive Shopify themes using Liquid and modern CSS.",
        details: ["Pixel-perfect implementation", "Section anywhere support", "Web performance optimization", "Custom animations"]
      },
      { 
        title: "Private App Development", 
        description: "Creating custom apps to add missing functionality.",
        details: ["Custom pricing tiers", "Subscription logic", "ERP/CRM syncing", "Custom fulfillment rules"]
      },
      { 
        title: "Platform Migration", 
        description: "Secure migration of data from WooCommerce, Magento, etc.",
        details: ["Product & variant mapping", "Customer history import", "SEO 301 redirects", "Order history transfer"]
      },
      { 
        title: "Headless Shopify", 
        description: "Decoupling the frontend for ultimate performance.",
        details: ["Hydrogen / Next.js frontend", "Storefront API integration", "Sanity CMS integration", "Edge caching"]
      }
    ],
    security: [
      { title: "Shopify Plus Security", description: "Leveraging Shopify's built-in Level 1 PCI DSS compliance." },
      { title: "Secure Private Apps", description: "Ensuring all custom middleware is hosted on secure AWS infrastructure." },
      { title: "Backup Automation", description: "Setting up third-party automated daily backups of your entire store data." }
    ],
    process: [
      { step: "01", title: "Consultation", description: "Analyzing catalog size and required integrations." },
      { step: "02", title: "Configuration", description: "Setting up store settings, taxes, and shipping." },
      { step: "03", title: "Development", description: "Coding the theme, building apps, and migrating data." },
      { step: "04", title: "Launch", description: "Final testing, go-live support, and team training." }
    ],
    technologies: ["Shopify Plus", "Liquid", "Hydrogen", "Next.js", "React", "GraphQL"],
    faqs: [
      { question: "Are you Shopify Partners?", answer: "Yes, we are certified Shopify Partners with experience in both standard Shopify and Shopify Plus." },
      { question: "Can you speed up my existing Shopify store?", answer: "Absolutely. We offer audits where we optimize images, remove bloat, and refactor code." },
      { question: "Do you handle Shopify migrations?", answer: "Yes, we handle complex migrations, ensuring zero data loss and implementing 301 redirects." }
    ]
  },
  {
    title: "E-commerce Optimization",
    slug: "ecommerce-optimization",
    description: "We improve speed, performance, and conversion rates.",
    longDescription: "Stop leaving money on the table. A successful store requires constant iteration. Our comprehensive e-commerce optimization services fine-tune every aspect of your digital storefront to maximize conversions, drastically improve load speeds, and ultimately increase revenue. We rely on hard data, heatmaps, and A/B testing rather than guesswork.",
    icon: "TrendingUp",
    targetAudience: "Existing e-commerce stores experiencing stagnant growth, high cart abandonment rates, or poor mobile performance.",
    hurdles: [
      "High cart abandonment rates",
      "Low add-to-cart ratios",
      "Slow mobile rendering",
      "High bounce rates on landing pages",
      "Checkout friction"
    ],
    benefits: [
      { title: "Boosted Revenue", description: "Turning a higher percentage of existing traffic into buyers.", icon: "LineChart" },
      { title: "Reduced Abandonment", description: "Frictionless checkout experiences that build trust.", icon: "ShoppingCart" },
      { title: "Lightning Fast Speed", description: "Sub-second load times to keep users engaged.", icon: "Zap" },
    ],
    features: [
      { 
        title: "Conversion Rate Optimization (CRO)", 
        description: "Data-backed changes to layout and copywriting.",
        details: ["Heuristic analysis", "Persuasive copywriting", "Trust badge placement", "Frictionless forms"]
      },
      { 
        title: "Scientific A/B Testing", 
        description: "Controlled split tests on variations to prove revenue generation.",
        details: ["Multivariate testing", "Statistical significance tracking", "Split URL testing", "Personalization tests"]
      },
      { 
        title: "Performance Tuning", 
        description: "Deep technical optimization for speed.",
        details: ["JavaScript minification", "Image format modernization (WebP/AVIF)", "Lazy loading implementation", "Database query optimization"]
      },
      { 
        title: "User Journey Analysis", 
        description: "Using session recordings to identify drop-off points.",
        details: ["Heatmaps (click, scroll, move)", "Session replay analysis", "Funnel drop-off tracking", "Exit intent surveys"]
      }
    ],
    process: [
      { step: "01", title: "Data Collection", description: "Installing tracking tools and analyzing Google Analytics." },
      { step: "02", title: "Hypotheses", description: "Identifying areas of friction and proposing solutions." },
      { step: "03", title: "Testing", description: "Running controlled A/B tests and speed optimizations." },
      { step: "04", title: "Iteration", description: "Deploying winning variations and moving to the next bottleneck." }
    ],
    technologies: ["Google Optimize", "Hotjar", "VWO", "Google Analytics 4", "Lighthouse", "Optimizely"],
    faqs: [
      { question: "How much of a conversion increase can I expect?", answer: "It's common for our clients to see a 15% to 30% uplift in conversion rates within months." },
      { question: "Do you guarantee a specific page speed score?", answer: "We guarantee a significant, measurable improvement in load times and Core Web Vitals." },
      { question: "Does CRO require changing my brand design?", answer: "Not necessarily. Optimization often involves structural changes and removing friction within your existing brand guidelines." }
    ]
  },
  {
    title: "Web Development",
    slug: "web-development",
    description: "Custom web applications and high-performance websites.",
    longDescription: "Your website is the digital face of your business. We build modern, fast, and highly responsive websites that act as powerful digital assets. Whether it's a corporate marketing site, an interactive portfolio, or a robust content management system, we deliver excellence. We combine cutting-edge frontend technologies with reliable backend systems.",
    icon: "Code",
    targetAudience: "Corporations, agencies, and businesses needing a professional, high-performance web presence.",
    hurdles: [
      "Outdated, slow WordPress sites",
      "Difficulty managing content internally",
      "Poor mobile responsiveness",
      "Lack of API integrations with CRMs",
      "Security vulnerabilities"
    ],
    benefits: [
      { title: "Responsive & Accessible", description: "Flawless display on all devices, adhering to standards.", icon: "MonitorSmartphone" },
      { title: "Robust Security", description: "Protection against modern web vulnerabilities.", icon: "Shield" },
      { title: "SEO-Friendly Foundation", description: "Built with search engine best practices and fast rendering.", icon: "Search" },
    ],
    features: [
      { 
        title: "Corporate Websites", 
        description: "Professional sites that establish industry authority.",
        details: ["Bespoke UI/UX design", "Fast static generation", "Multi-language support", "Lead generation forms"]
      },
      { 
        title: "Modern Headless CMS", 
        description: "Integration with Sanity or Strapi for ultimate content control.",
        details: ["Custom content schemas", "Live preview environments", "Real-time collaboration", "Decoupled architecture"]
      },
      { 
        title: "Web Animations", 
        description: "Strategic use of micro-interactions and scroll animations.",
        details: ["GSAP scroll triggers", "Framer Motion transitions", "Lottie file integration", "Performance-friendly CSS animations"]
      },
      { 
        title: "Custom Integrations", 
        description: "Connecting your website directly to your CRM or marketing tools.",
        details: ["HubSpot / Salesforce integration", "Mailchimp / Klaviyo sync", "Custom webhook handlers", "Analytics integration"]
      }
    ],
    security: [
      { title: "Static Site Security", description: "Headless setups eliminate database vulnerabilities from the public-facing site." },
      { title: "DDoS Protection", description: "Hosting on Vercel/Cloudflare networks with built-in global DDoS mitigation." },
      { title: "Secure Form Handling", description: "Server-side validation and sanitization for all user inputs." }
    ],
    process: [
      { step: "01", title: "Planning", description: "Requirements gathering and defining the technical architecture." },
      { step: "02", title: "Design", description: "Creation of visual concepts and interactive prototypes." },
      { step: "03", title: "Development", description: "Coding the frontend, setting up CMS, and integrating APIs." },
      { step: "04", title: "Launch", description: "Extensive testing, performance checks, and live deployment." }
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Sanity CMS", "Vercel", "GSAP"],
    faqs: [
      { question: "Will I be able to update the website myself?", answer: "Yes. We integrate modern CMS like Sanity, making it incredibly easy for non-technical users to edit content." },
      { question: "Do you offer website maintenance?", answer: "Yes, we offer ongoing support and maintenance packages to ensure your website remains secure." },
      { question: "Are your websites optimized for mobile?", answer: "Absolutely. We follow a mobile-first design philosophy, ensuring perfect display on all screen sizes." }
    ]
  },
  {
    title: "Website Maintenance & Support",
    slug: "maintenance-support",
    description: "Keep your website secure, fast, and up-to-date.",
    longDescription: "A website is never truly 'finished'. To maintain peak performance, security, and relevance, continuous maintenance is crucial. We offer comprehensive support packages tailored to your needs, handling everything from routine updates and security patches to content changes and feature enhancements, so you can focus on running your business.",
    icon: "Settings",
    targetAudience: "Businesses of all sizes that want peace of mind knowing their digital assets are actively monitored and maintained.",
    hurdles: [
      "Security vulnerabilities from outdated plugins",
      "Slow performance over time",
      "Broken links and layout issues",
      "Lack of technical support for urgent fixes",
      "Content becoming stale or outdated"
    ],
    benefits: [
      { title: "Peace of Mind", description: "Knowing experts are proactively monitoring your site.", icon: "ShieldCheck" },
      { title: "Optimized Performance", description: "Regular tuning to keep load times fast.", icon: "Zap" },
      { title: "Reduced Downtime", description: "Immediate action on critical issues to keep your site online.", icon: "Activity" }
    ],
    features: [
      {
        title: "Security Monitoring",
        description: "24/7 scanning for vulnerabilities and malware.",
        details: ["Automated backups", "Malware removal", "Firewall management", "Uptime monitoring"]
      },
      {
        title: "Regular Updates",
        description: "Keeping CMS, themes, and plugins up-to-date.",
        details: ["Core software updates", "Plugin compatibility checks", "PHP version upgrades", "Bug fixes"]
      },
      {
        title: "Performance Optimization",
        description: "Continuous tweaks for better speed and UX.",
        details: ["Database optimization", "Image compression", "Cache management", "Broken link fixing"]
      },
      {
        title: "Dedicated Support",
        description: "Direct access to our developer team for tasks.",
        details: ["Priority ticketing system", "Content updates", "Minor design tweaks", "Monthly reporting"]
      }
    ],
    security: [
      { title: "Proactive Patching", description: "Applying critical security updates as soon as they are released." },
      { title: "Automated Backups", description: "Daily off-site backups with easy restoration options." },
      { title: "Malware Scanning", description: "Continuous scanning to detect and remove malicious code." }
    ],
    process: [
      { step: "01", title: "Audit", description: "Initial assessment of your current website health and security." },
      { step: "02", title: "Onboarding", description: "Setting up monitoring tools, backups, and staging environments." },
      { step: "03", title: "Maintenance", description: "Performing scheduled updates and continuous monitoring." },
      { step: "04", title: "Reporting", description: "Delivering detailed monthly reports on site performance and tasks completed." }
    ],
    technologies: ["UptimeRobot", "ManageWP", "Cloudflare", "New Relic", "Sentry", "AWS Backup"],
    faqs: [
      { question: "What happens if my site goes down?", answer: "Our uptime monitors notify us immediately, and our team begins troubleshooting right away." },
      { question: "Can I request new features under a maintenance plan?", answer: "Yes! Most of our plans include dedicated monthly development hours that can be used for new features." },
      { question: "Do you support platforms other than WordPress?", answer: "Absolutely, we support custom web apps, Next.js sites, Shopify, and various other platforms." }
    ]
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "High-performance iOS and Android applications.",
    longDescription: "Reach your users wherever they are with a custom-built mobile application. We design and develop native and cross-platform apps that provide seamless, engaging experiences on iOS and Android devices. From initial concept to App Store launch, we handle the entire lifecycle, ensuring your app is fast, intuitive, and scalable.",
    icon: "Smartphone",
    targetAudience: "Startups launching mobile-first products and enterprises looking to enhance customer engagement through dedicated apps.",
    hurdles: [
      "Fragmented user experiences across platforms",
      "High development costs for separate codebases",
      "Poor app performance and battery drain",
      "Complex App Store approval processes",
      "Difficulty retaining users post-download"
    ],
    benefits: [
      { title: "Wider Reach", description: "Connect with customers directly on their most-used devices.", icon: "Users" },
      { title: "Enhanced Engagement", description: "Utilize push notifications and device features to keep users active.", icon: "Bell" },
      { title: "Brand Loyalty", description: "A dedicated app presence reinforces brand value and trust.", icon: "Heart" }
    ],
    features: [
      {
        title: "Cross-Platform Development",
        description: "Building once, deploying everywhere with modern frameworks.",
        details: ["React Native / Flutter", "Shared business logic", "Native-like performance", "Faster time-to-market"]
      },
      {
        title: "Native App Development",
        description: "Platform-specific apps for maximum performance.",
        details: ["Swift for iOS", "Kotlin for Android", "Deep hardware integration", "Optimized UI/UX"]
      },
      {
        title: "UI/UX Design for Mobile",
        description: "Interfaces tailored for touch and smaller screens.",
        details: ["Human Interface Guidelines", "Material Design", "Gesture-based navigation", "Accessibility optimization"]
      },
      {
        title: "API & Backend Integration",
        description: "Connecting your app to robust cloud services.",
        details: ["REST/GraphQL APIs", "Real-time data sync", "Offline mode support", "Push notification systems"]
      }
    ],
    security: [
      { title: "Secure Storage", description: "Encrypted local storage for sensitive user data (Keychain/Keystore)." },
      { title: "API Security", description: "Robust authentication and encrypted communication with backend services." },
      { title: "App Hardening", description: "Techniques to prevent reverse engineering and tampering." }
    ],
    process: [
      { step: "01", title: "Discovery", description: "Defining the app's core features, target audience, and platform strategy." },
      { step: "02", title: "Design", description: "Creating mobile-specific wireframes and interactive prototypes." },
      { step: "03", title: "Development", description: "Agile sprints to build frontend interfaces and connect backend APIs." },
      { step: "04", title: "Launch", description: "Thorough device testing and managing the App Store / Google Play submission process." }
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "App Store Connect"],
    faqs: [
      { question: "Should I build a native or cross-platform app?", answer: "It depends on your needs. Cross-platform is faster and more cost-effective, while native is best for highly complex, graphics-intensive apps." },
      { question: "Do you help with App Store submissions?", answer: "Yes, we handle the entire submission and approval process for both Apple and Google stores." },
      { question: "Can the app work offline?", answer: "Yes, we can implement local databases and sync strategies so the app functions even without an internet connection." }
    ]
  },
  {
    title: "Custom Software Development",
    slug: "custom-software-development",
    description: "Tailor-made software solutions to solve complex business problems.",
    longDescription: "Off-the-shelf software doesn't always fit. When your business processes are unique, you need technology built specifically for you. We engineer bespoke software solutions designed to automate workflows, integrate disparate systems, and scale alongside your enterprise. Our custom development focuses on efficiency, security, and long-term value.",
    icon: "Terminal",
    targetAudience: "Mid-to-large enterprises with unique operational challenges that cannot be solved by standard SaaS products.",
    hurdles: [
      "Inefficient, manual workflows",
      "Data silos across multiple disjointed systems",
      "High licensing costs for enterprise software",
      "Lack of competitive advantage with generic tools",
      "Inability to scale operations smoothly"
    ],
    benefits: [
      { title: "Perfect Fit", description: "Software built exactly to your specifications and workflows.", icon: "CheckCircle" },
      { title: "Increased Efficiency", description: "Automating manual tasks to save time and reduce errors.", icon: "TrendingUp" },
      { title: "IP Ownership", description: "You own the code and the intellectual property completely.", icon: "Lock" }
    ],
    features: [
      {
        title: "Enterprise Web Apps",
        description: "Complex, data-heavy applications for internal use.",
        details: ["Custom CRMs", "ERP integrations", "Inventory management systems", "HR portals"]
      },
      {
        title: "System Integration",
        description: "Connecting legacy systems with modern tools.",
        details: ["API development", "Middleware creation", "Data synchronization", "Legacy modernization"]
      },
      {
        title: "Workflow Automation",
        description: "Streamlining business processes with custom logic.",
        details: ["Business Process Management", "Task scheduling", "Automated reporting", "Approval workflows"]
      },
      {
        title: "Cloud Architecture",
        description: "Designing robust, scalable infrastructure.",
        details: ["AWS/Azure/GCP setup", "Microservices", "Containerization (Docker)", "Serverless computing"]
      }
    ],
    security: [
      { title: "Role-Based Access Control", description: "Granular permissions to ensure users only see what they need to." },
      { title: "Data Encryption", description: "Protecting sensitive corporate data both in transit and at rest." },
      { title: "Audit Logging", description: "Comprehensive tracking of all system changes and user actions." }
    ],
    process: [
      { step: "01", title: "Analysis", description: "Deep dive into your business processes and technical requirements." },
      { step: "02", title: "Architecture", description: "Designing the system topology, database schema, and technology stack." },
      { step: "03", title: "Development", description: "Iterative building with regular demonstrations and feedback loops." },
      { step: "04", title: "Deployment", description: "Phased rollout, user training, and ongoing technical support." }
    ],
    technologies: ["Node.js", "Python", "Java", "PostgreSQL", "Docker", "AWS", "Kubernetes"],
    faqs: [
      { question: "How much does custom software cost?", answer: "Cost varies widely based on complexity. We provide detailed estimates after the initial discovery phase." },
      { question: "Will we own the source code?", answer: "Absolutely. Once the project is fully paid for, all intellectual property rights are transferred to you." },
      { question: "How do you ensure the software will grow with us?", answer: "We use scalable, cloud-native architectures and write modular, well-documented code designed for future expansion." }
    ]
  }
];
