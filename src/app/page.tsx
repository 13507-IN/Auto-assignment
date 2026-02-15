"use client";

import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiPlay,
  FiCheck,
  FiCalendar,
  FiClock,
  FiSearch,
  FiTrendingUp,
  FiActivity,
  FiUsers,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const challengeCards = [
  {
    icon: <div className="text-2xl font-bold text-primary px-3">H</div>,
    title: "Scattered Data",
    desc:
      "Student information across Google Classroom, spreadsheets, and email. No single source of truth.",
  },
  {
    icon: <FiClock className="w-7 h-7 text-primary" />,
    title: "Manual Tracking",
    desc:
      "Hours spent copying grades, attendance, and assignment data. Repetitive work that could be automated.",
  },
  {
    icon: <FiSearch className="w-7 h-7 text-primary" />,
    title: "Reactive Teaching",
    desc:
      "By the time you notice a struggling student, it is too late. No early warning system.",
  },
];

const featureCards = [
  {
    eyebrow: "One-Click Sync",
    title: "Your Google Classroom data, automatically organized",
    body:
      "Connect once and never manually import data again. Students, courses, assignments, and grades sync in real time. No spreadsheets, no data entry, no hassle.",
    bullets: [
      "Automatic daily sync",
      "Real-time grade tracking",
      "Bi-directional calendar sync",
      "Student roster always up-to-date",
    ],
    visual: (
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-border flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center gap-8">
          <div className="w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <FcGoogle className="w-12 h-12" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ x: [0, 40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="w-2 h-2 rounded-full bg-primary"
              />
            ))}
          </div>
          <div className="w-24 h-24 bg-primary text-primary-foreground rounded-xl shadow-lg flex items-center justify-center font-bold text-2xl">
            S
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Intelligent Analytics",
    title: "Spot struggling students before they fall behind",
    body:
      "Our AI analyzes patterns across grades, attendance, and submissions to identify at-risk students early. Get actionable recommendations, not just raw data.",
    bullets: [
      "Predictive grade forecasting",
      "Automatic at-risk alerts",
      "Personalized recommendations",
      "Attendance detection",
    ],
    visual: (
      <div className="aspect-[4/3] bg-card rounded-2xl shadow-xl border border-border p-6 relative">
        <div className="absolute top-6 left-6 right-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold">Student Risk Analysis</h4>
            <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold">
              Live
            </span>
          </div>
          <div className="h-40 flex items-end gap-2 mb-6">
            {[30, 45, 35, 25, 20].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-t ${i === 4 ? "bg-red-500" : "bg-gray-200"}`}
              />
            ))}
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex gap-3">
            <FiActivity className="mt-1 text-primary shrink-0" />
            <div>
              <p className="text-sm font-bold text-foreground">Action Needed</p>
              <p className="text-xs text-muted-foreground">
                3 students showing decline in Math 101 participation.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Smart Scheduling",
    title: "Every deadline, exam, and event in one calendar",
    body:
      "Automatically pull all assignments and due dates from Google Classroom. Set custom reminders. Never miss an important date again.",
    bullets: [
      "Auto-import assignments",
      "Color-coded by course",
      "Smart notifications",
      "Export to external calendars",
    ],
    visual: (
      <div className="aspect-[4/3] bg-card rounded-2xl shadow-xl border border-border p-6 overflow-hidden">
        <div className="grid grid-cols-7 gap-2 h-full">
          {[...Array(35)].map((_, i) => (
            <div key={i} className="relative border border-border/50 rounded p-1">
              <span className="text-xs text-muted-foreground">{i + 1}</span>
              {i % 5 === 0 && <div className="mt-1 h-1.5 w-full bg-blue-400 rounded-full" />}
              {i % 8 === 0 && <div className="mt-1 h-1.5 w-full bg-red-400 rounded-full" />}
              {i === 15 && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-popover text-popover-foreground text-xs p-2 rounded shadow-lg border border-border z-10"
                >
                  <p className="font-bold">Math Final</p>
                  <p className="opacity-70">10:00 AM</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const steps = [
  {
    num: "01",
    icon: <FcGoogle className="w-7 h-7" />,
    title: "Connect",
    desc: "One-click OAuth sync.",
    time: "30s",
  },
  {
    num: "02",
    icon: <div className="w-7 h-7 text-primary font-bold">AI</div>,
    title: "Analyze",
    desc: "System organizes data and surfaces insights.",
    time: "1m",
  },
  {
    num: "03",
    icon: <FiTrendingUp className="w-7 h-7 text-primary" />,
    title: "Manage",
    desc: "View actionable trends and next steps.",
    time: "Done",
  },
];

const testimonials = [
  {
    quote:
      "Study AI cut my grading admin time from 8 hours to 2 hours per week. The AI insights helped me identify 3 struggling students I would have missed.",
    name: "Sarah Chen",
    role: "AP Biology Teacher",
    school: "Lincoln High",
    featured: true,
  },
  {
    quote:
      "The Google Classroom integration is seamless. Set it and forget it. My entire class roster just syncs automatically.",
    name: "Michael Rodriguez",
    role: "Math Teacher",
    school: "Riverside Academy",
  },
  {
    quote:
      "Finally, a student management system that actually understands teachers' workflow. The calendar feature alone is worth it.",
    name: "Jennifer Park",
    role: "Dept Head",
    school: "Westview",
  },
  {
    quote: "I cannot imagine going back to spreadsheets. This tool pays for itself in time saved.",
    name: "David Kim",
    role: "History Teacher",
    school: "Oak Ridge",
  },
  {
    quote:
      "The predictive analytics are scary accurate. It told me a student was at risk two weeks before they failed an exam.",
    name: "Amanda Low",
    role: "Physics",
    school: "Tech High",
  },
  {
    quote: "Clean, simple, and fast. Exactly what we needed.",
    name: "Tom Wilson",
    role: "Principal",
    school: "Charter Oak",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <LandingNavbar />

      {/* HERO */}
      <section className="relative pt-28 pb-24 overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:bg-gradient-to-b after:from-transparent after:to-background/70">
        <div className="absolute inset-0 z-0 bg-background">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="section-shell relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="text-center lg:text-left"
          >
            <motion.span
              variants={fadeInUp}
              className="text-primary font-semibold tracking-wide uppercase text-sm mb-4 block"
            >
              AI-Powered Student Management
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight max-w-3xl mx-auto lg:mx-0"
            >
              Stop managing spreadsheets. Start understanding students.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8"
            >
              Intelligent automation meets Google Classroom. Get real-time insights, predictive
              analytics, and effortless organization in one beautiful platform.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full max-w-md mx-auto lg:mx-0"
            >
              <Button size="lg" className="w-full sm:w-auto sm:min-w-[220px] gap-2">
                <FcGoogle className="w-6 h-6 bg-white rounded-full p-0.5" />
                Connect Google Classroom
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto sm:min-w-[180px] gap-2 group"
              >
                <FiPlay className="w-5 h-5 fill-current" />
                Watch Demo
              </Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div className="rounded-xl border border-border/60 bg-card/70 p-4">
                <p className="text-2xl font-bold text-foreground">2,000+</p>
                <p className="text-sm text-muted-foreground">Educators onboarded</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/70 p-4">
                <p className="text-2xl font-bold text-foreground">50,000+</p>
                <p className="text-sm text-muted-foreground">Students managed</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/70 p-4">
                <p className="text-2xl font-bold text-foreground">10+ hrs</p>
                <p className="text-sm text-muted-foreground">Saved weekly</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:pl-4"
          >
            <div className="grid gap-4">
              <Card className="shadow-xl border border-border/60 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg">Live Class Pulse</CardTitle>
                  <CardDescription>Realtime engagement by class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 h-28">
                    {[40, 60, 55, 70, 90, 65, 80].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="flex-1 bg-gradient-to-t from-primary/40 to-primary/80 rounded-t"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border border-border/60 bg-card/80">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <FiActivity />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Risk Alert</p>
                        <p className="text-xs text-muted-foreground">
                          Student performance drop detected
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border border-border/60 bg-card/80">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FiCalendar />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Upcoming</p>
                        <p className="text-xs text-muted-foreground">2 assignments due this week</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-border/60 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-lg">Activity Feed</CardTitle>
                  <CardDescription>Recent classroom signals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Math 101 quiz submissions</span>
                      <span className="text-foreground font-medium">+24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Physics lab report overdue</span>
                      <span className="text-foreground font-medium">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Attendance improvement</span>
                      <span className="text-foreground font-medium">+8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        <div className="section-shell mt-14">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border border-border/60 bg-card/80">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Teachers report</p>
                <p className="text-2xl font-bold text-foreground">73% burnout</p>
                <p className="text-sm text-muted-foreground">from admin work</p>
              </CardContent>
            </Card>
            <Card className="border border-border/60 bg-card/80">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">At-risk students</p>
                <p className="text-2xl font-bold text-foreground">4 weeks</p>
                <p className="text-sm text-muted-foreground">identified too late</p>
              </CardContent>
            </Card>
            <Card className="border border-border/60 bg-card/80">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Time spent</p>
                <p className="text-2xl font-bold text-foreground">15 hours</p>
                <p className="text-sm text-muted-foreground">on data entry weekly</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section id="challenge" className="py-24 bg-muted/30 scroll-mt-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_55%)] pointer-events-none" />
        <div className="section-shell max-w-6xl grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start relative z-10">
          <div>
            <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
              The Challenge
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-6">
              Educators waste 10+ hours weekly on administrative tasks
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Data lives in too many places. The workflow is reactive. The insight arrives too
              late. We designed a structure that fixes the bottleneck.
            </p>
            <Button variant="outline" className="gap-2">
              See the workflow <FiArrowRight />
            </Button>
          </div>

          <div className="space-y-4">
            {challengeCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                    <p className="text-muted-foreground">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 scroll-mt-24">
        <div className="section-shell max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                Platform
              </span>
              <h2 className="text-4xl font-bold mt-3">Built for modern classrooms</h2>
            </div>
            <Button variant="link" className="p-0 h-auto text-primary font-bold text-lg">
              Explore all features <FiArrowRight className="ml-2" />
            </Button>
          </div>

          <div className="space-y-10">
            {featureCards.map((feature, index) => (
              <Card key={feature.title} className="p-8 bg-gradient-to-b from-card to-card/85 border-border/70">
                <div
                  className={`grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center ${
                    index % 2 === 1 ? "md:grid-flow-col-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                    <span className="text-primary font-bold tracking-wide text-sm uppercase">
                      {feature.eyebrow}
                    </span>
                    <h3 className="text-3xl font-bold mt-2 mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {feature.body}
                    </p>
                    <ul className="space-y-3">
                      {feature.bullets.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
                            <FiCheck className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-foreground/80 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                    {feature.visual}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-secondary/30 relative overflow-hidden scroll-mt-24">
        <div className="section-shell max-w-6xl grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Get started in under 2 minutes</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Automation should feel effortless. Here is the new flow.
            </p>
            <Button size="lg" className="w-full sm:w-auto sm:min-w-[220px] shadow-lg shadow-primary/20">
              Connect Google Classroom Now
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Or explore with demo data
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-primary/20" />
            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border border-primary/30 flex items-center justify-center text-primary font-bold">
                    {step.num}
                  </div>
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      {step.icon}
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-3">{step.desc}</p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                      <FiClock className="mr-1.5 w-3 h-3" /> {step.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-background to-secondary/20 scroll-mt-24">
        <div className="section-shell max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Loved by educators worldwide</h2>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <Card className="p-8 border border-primary/50 shadow-primary/5">
              <div className="mb-4 text-primary font-bold text-xs uppercase tracking-wider">
                Featured Story
              </div>
              <p className="text-lg italic text-muted-foreground mb-6">
                &quot;{testimonials[0].quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                  {testimonials[0].name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{testimonials[0].name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonials[0].role}, {testimonials[0].school}
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-2 gap-6">
              {testimonials.slice(1).map((t, i) => (
                <Card key={i} className="p-6">
                  <p className="text-sm italic text-muted-foreground mb-4">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.role}, {t.school}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center space-y-2">
            <div className="flex justify-center text-yellow-500 gap-1 text-lg">
              <span>*</span>
              <span>*</span>
              <span>*</span>
              <span>*</span>
              <span>*</span>
            </div>
            <p className="font-bold">4.9/5 from 200+ reviews</p>
            <p className="text-muted-foreground text-sm">2,000+ active educators | 50,000+ students managed</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-24 bg-primary relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary" />
        <div className="section-shell relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Start automating in 60 seconds
            </h2>
            <p className="text-primary-foreground/80 text-xl max-w-2xl mb-10">
              No credit card required. Free 14-day trial. Connect Google Classroom and see the magic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto sm:min-w-[220px] font-bold shadow-xl">
                Connect Google Classroom
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto sm:min-w-[200px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
          <Card className="bg-primary-foreground/10 border border-primary-foreground/20">
            <CardHeader>
              <CardTitle className="text-primary-foreground">Trusted by schools</CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Compliance and security are built in from day one.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-primary-foreground/80">
              <div className="flex items-center gap-3">
                <FiUsers className="w-5 h-5" />
                <span>Google Workspace Partner</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheck className="w-5 h-5" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheck className="w-5 h-5" />
                <span>GDPR Compliant</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
