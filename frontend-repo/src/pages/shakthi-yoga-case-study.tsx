import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  LayoutDashboard,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { GradientButton } from "@/components/shared/GradientButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSEO } from "@/hooks/useDocumentTitle";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";

const PROJECT_PATH = "/portfolio/shakthi-yoga";
const SOCIAL_IMAGE = "/portfolio/shakthi-yoga/og.jpg";
const SCREENSHOT_PATH = "/portfolio/shakthi-yoga/screenshots";
const PROJECT_IMAGE = `${SCREENSHOT_PATH}/home-full.jpg`;
const SITE_SCREENSHOT = `${SCREENSHOT_PATH}/home-thumb.jpg`;
// Bump when screenshots are re-exported, to bust the browser image cache.
const ASSET_V = "?v=3";

type GalleryImage = {
  src: string;
  thumbnail: string;
  title: string;
  alt: string;
  width: number;
  height: number;
};

const gallery: GalleryImage[] = [
  {
    src: `${SCREENSHOT_PATH}/home-full.jpg`,
    thumbnail: `${SCREENSHOT_PATH}/home-thumb.jpg`,
    title: "Home (Landing)",
    alt: "Full-page screenshot of the Shakthi Yoga marketing homepage",
    width: 1400,
    height: 3810,
  },
  {
    src: `${SCREENSHOT_PATH}/about-full.jpg`,
    thumbnail: `${SCREENSHOT_PATH}/about-thumb.jpg`,
    title: "About the Studio",
    alt: "Full-page screenshot of the Shakthi Yoga about page with the founder story and team",
    width: 1400,
    height: 4058,
  },
  {
    src: `${SCREENSHOT_PATH}/classes-full.jpg`,
    thumbnail: `${SCREENSHOT_PATH}/classes-thumb.jpg`,
    title: "All Classes & Filters",
    alt: "Screenshot of the Shakthi Yoga classes listing with category and type filters",
    width: 1350,
    height: 1883,
  },
  {
    src: `${SCREENSHOT_PATH}/passes-full.jpg`,
    thumbnail: `${SCREENSHOT_PATH}/passes-thumb.jpg`,
    title: "Class Passes & Pricing",
    alt: "Screenshot of the Shakthi Yoga class pass pricing page",
    width: 1350,
    height: 1854,
  },
  {
    src: `${SCREENSHOT_PATH}/contact-full.jpg`,
    thumbnail: `${SCREENSHOT_PATH}/contact-thumb.jpg`,
    title: "Contact & Enquiry",
    alt: "Screenshot of the Shakthi Yoga contact page with map and message form",
    width: 1277,
    height: 2000,
  },
  {
    src: `${SCREENSHOT_PATH}/register-full.jpg`,
    thumbnail: `${SCREENSHOT_PATH}/register-thumb.jpg`,
    title: "Multi-Step Registration",
    alt: "Screenshot of the Shakthi Yoga multi-step account registration flow",
    width: 1350,
    height: 1413,
  },
  {
    src: `${SCREENSHOT_PATH}/signin-full.jpg`,
    thumbnail: `${SCREENSHOT_PATH}/signin-thumb.jpg`,
    title: "Secure Sign In",
    alt: "Screenshot of the Shakthi Yoga sign in page",
    width: 1350,
    height: 1413,
  },
  {
    src: `${SCREENSHOT_PATH}/student-dashboard-full.jpg`,
    thumbnail: `${SCREENSHOT_PATH}/student-dashboard-thumb.jpg`,
    title: "Student Dashboard",
    alt: "Screenshot of the Shakthi Yoga student dashboard showing registered and upcoming classes",
    width: 1350,
    height: 1345,
  },
  {
    src: `${SCREENSHOT_PATH}/admin-dashboard-full.jpg`,
    thumbnail: `${SCREENSHOT_PATH}/admin-dashboard-thumb.jpg`,
    title: "Admin Dashboard",
    alt: "Screenshot of the Shakthi Yoga admin dashboard with revenue, students and enrollment metrics",
    width: 1350,
    height: 961,
  },
];

const capabilities = [
  {
    icon: LayoutDashboard,
    title: "Serene marketing site",
    copy: "A calm, on-brand public experience — home, about, classes, class passes, and contact — designed to turn visitors into registered students.",
  },
  {
    icon: Users,
    title: "Student portal",
    copy: "Each student gets a dashboard for upcoming classes, booking history, attendance, payments, passes, profile, and leaving reviews.",
  },
  {
    icon: UserCog,
    title: "Admin control panel",
    copy: "A live operations hub for users, classes, instructors, bookings, payments, attendance, messages, content, and testimonials.",
  },
  {
    icon: CalendarCheck,
    title: "Booking & enrollment",
    copy: "End-to-end class booking with capacity tracking, spots-left indicators, approvals, and join links for online sessions.",
  },
  {
    icon: CreditCard,
    title: "Passes & payments",
    copy: "Flexible 3, 5, and 9 class passes with manual verification, revenue tracking, and a clean payment history per student.",
  },
  {
    icon: ShieldCheck,
    title: "Auth & roles",
    copy: "Secure multi-step registration with password rules, plus role-based access separating the admin and student experiences.",
  },
];

const stack = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "Role-Based Auth",
  "Responsive UX",
];

export default function ShakthiYogaCaseStudyPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useSEO({
    title: "Shakthi Yoga Studio Platform Case Study | We Raise Tech",
    description:
      "How We Raise Tech built Shakthi Yoga: a full-stack yoga studio platform with student portal, class booking, passes, payments, and an admin panel.",
    path: PROJECT_PATH,
    image: SOCIAL_IMAGE,
    imageWidth: 1200,
    imageHeight: 630,
    imageType: "image/jpeg",
    brandTitle: false,
    keywords: [
      "Shakthi Yoga case study",
      "yoga studio management platform",
      "full-stack web application",
      "class booking system",
      "admin and student dashboard",
    ],
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Shakthi Yoga", path: PROJECT_PATH },
      ]),
      caseStudyJsonLd({
        name: "Shakthi Yoga Studio Management Platform",
        description:
          "Full-stack yoga studio platform with a marketing site, student portal for booking and passes, and an admin panel for classes, payments, attendance, and content.",
        path: PROJECT_PATH,
        image: PROJECT_IMAGE,
        clientName: "Shakthi Yoga",
        dateCreated: "2026",
      }),
    ],
  });

  return (
    <div className="w-full overflow-hidden">
      <section className="relative pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,hsl(var(--primary)/0.16),transparent)]" />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/portfolio" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Portfolio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Shakthi Yoga</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <AnimateOnScroll>
              <div className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Full-stack platform · 2026
              </div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Shakthi Yoga{" "}
                <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  one platform to run the whole studio.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                A full-stack yoga studio platform: a calm marketing site, a student portal for booking
                classes and managing passes, and an admin panel that tracks revenue, enrollments,
                attendance, and testimonials in real time.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#gallery"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  View all screens <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/contact#contact-form"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 font-semibold transition hover:border-primary/40 hover:text-primary"
                >
                  Build something similar <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-semibold text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card p-2 shadow-2xl shadow-primary/10">
                <img
                  src={`${SITE_SCREENSHOT}${ASSET_V}`}
                  alt="Screenshot of the live Shakthi Yoga homepage"
                  width={1400}
                  height={3810}
                  fetchPriority="high"
                  className="aspect-[3/4] w-full rounded-[1.55rem] object-cover object-top"
                />
              </div>
            </AnimateOnScroll>
          </div>

          <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Client", "Shakthi Yoga"],
              ["Industry", "Yoga & wellness studio"],
              ["Delivery", "Full-stack web platform"],
              ["Portals", "Admin + Student"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-border/50 bg-card/50 p-5">
                <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</dt>
                <dd className="mt-2 font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-y border-border/40 bg-card/25 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <AnimateOnScroll>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">The challenge</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Run a growing studio without spreadsheets and manual chasing.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Registrations, class passes, payments, and attendance were handled by hand across
                messages and spreadsheets. It was slow to manage, easy to get wrong, and hard to scale
                as more students joined both online and in-person classes.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">The solution</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                One connected platform for students and the studio team.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                We built a serene public site, a secure multi-step signup with role-based access,
                student dashboards for classes and passes, and a live admin panel that tracks revenue,
                enrollments, attendance, messages, and testimonials — all in one place.
              </p>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <AnimateOnScroll className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">What we delivered</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              A complete studio management system, front to back.
            </h2>
          </AnimateOnScroll>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, copy }) => (
              <AnimateOnScroll key={title}>
                <article className="h-full rounded-2xl border border-border/50 bg-card/45 p-6 transition hover:border-primary/30 hover:bg-card/70">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section id="gallery" className="scroll-mt-24 border-y border-border/40 bg-card/20 py-20 sm:py-24">
        <Container>
          <AnimateOnScroll className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Project gallery</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">The platform, screen by screen.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Browse the public marketing pages, the registration and sign-in flow, the student
              dashboard, and the admin control panel. Tap any screen to view the full capture.
            </p>
          </AnimateOnScroll>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <AnimateOnScroll key={image.src}>
                <button
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group block w-full overflow-hidden rounded-2xl border border-border/50 bg-card text-left transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`Open ${image.title}`}
                >
                  <span className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-white/95">
                    <img
                      src={`${image.thumbnail}${ASSET_V}`}
                      alt={image.alt}
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                      width={760}
                      height={570}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.025]"
                    />
                    <span className="absolute right-3 top-3 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-900 shadow-sm backdrop-blur">
                      View screen
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="text-sm font-semibold">{image.title}</span>
                    <span className="text-xs text-muted-foreground">{image.width} × {image.height}</span>
                  </span>
                </button>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Need a platform that runs your business end-to-end?</h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                From public site to secure dashboards and admin tooling, we plan, design, build, and
                launch the complete full-stack product — bookings, payments, roles, and reporting included.
              </p>
              <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
                {["Marketing site & student portal", "Admin dashboard & reporting", "Booking, passes & payments", "Role-based auth & secure APIs"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <GradientButton href="/contact#contact-form" className="w-full justify-center px-8 py-4 lg:w-auto">
              Start your project <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </GradientButton>
          </div>
        </Container>
      </section>

      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        {selectedImage && (
          <DialogContent className="block max-h-[90vh] max-w-6xl overflow-y-auto overscroll-contain border-white bg-white p-2 text-slate-900 shadow-2xl [&>button]:z-10 [&>button]:rounded-full [&>button]:bg-white [&>button]:p-2 [&>button]:opacity-100">
            <DialogTitle className="sr-only">{selectedImage.title} screenshot</DialogTitle>
            <figure>
              <img
                src={`${selectedImage.src}${ASSET_V}`}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                decoding="async"
                style={{ maxWidth: `${selectedImage.width}px` }}
                className="mx-auto h-auto w-full rounded-xl"
              />
              <figcaption className="sticky bottom-0 mx-2 flex items-center justify-between gap-4 rounded-xl bg-white/95 px-4 py-3 text-sm text-slate-900 shadow-sm backdrop-blur">
                <span className="font-semibold">{selectedImage.title}</span>
                <span className="text-xs text-slate-500">Full capture · {selectedImage.width} × {selectedImage.height}</span>
              </figcaption>
            </figure>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
