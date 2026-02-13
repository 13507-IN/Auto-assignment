"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiPlay, FiCheck, FiCalendar, FiClock, FiSearch, FiTrendingUp, FiActivity, FiUsers } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc"; 
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-hidden">
      <LandingNavbar />

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Mesh Gradient */}
        <div className="absolute inset-0 z-0 bg-background">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="text-center lg:text-left pt-10 lg:pt-0"
          >
            <motion.span variants={fadeInUp} className="text-primary font-semibold tracking-wide uppercase text-sm mb-4 block">
              AI-Powered Student Management
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              Stop managing <br />
              <span className="text-foreground">spreadsheets.</span> <br />
              Start understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">students.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              Intelligent automation meets Google Classroom. Get real-time insights, predictive analytics, and effortless organization in one beautiful platform.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto gap-2">
                <FcGoogle className="w-6 h-6 bg-white rounded-full p-0.5" />
                Connect Google Classroom
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto gap-2 group">
                <FiPlay className="w-5 h-5 fill-current" />
                Watch Demo
              </Button>
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-6 text-sm text-muted-foreground font-medium flex items-center justify-center lg:justify-start gap-2">
               <span className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-background" />
                 ))}
               </span>
               Trusted by 2,000+ educators • 50,000+ students managed
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[700px] flex items-center justify-center"
          >
            {/* Visual Mockup Container */}
            <div className="relative w-full max-w-lg lg:max-w-none aspect-square lg:aspect-auto h-full">
              {/* Floating Cards Animation */}
              <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-x-0 top-1/2 -translate-y-1/2 lg:inset-0 lg:translate-y-0"
              >
                  {/* Dashboard UI Mockup */}
                  <div className="w-full h-auto bg-card border border-border rounded-xl shadow-2xl overflow-hidden relative z-20">
                     {/* Fake Header */}
                     <div className="h-12 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                       <div className="flex gap-1.5">
                         <div className="w-3 h-3 rounded-full bg-red-400/80" />
                         <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                         <div className="w-3 h-3 rounded-full bg-green-400/80" />
                       </div>
                     </div>
                     {/* Fake Content */}
                     <div className="p-6 grid gap-6">
                        <div className="grid grid-cols-3 gap-4">
                           <div className="h-24 bg-primary/5 rounded-lg border border-primary/10 p-4">
                             <div className="w-8 h-8 rounded bg-primary/20 mb-3" />
                             <div className="h-4 w-12 bg-primary/20 rounded mb-1" />
                             <div className="h-8 w-16 bg-primary/10 rounded" />
                           </div>
                           <div className="h-24 bg-muted rounded-lg border border-border p-4">
                             <div className="w-8 h-8 rounded bg-muted-foreground/20 mb-3" />
                             <div className="h-4 w-12 bg-muted-foreground/20 rounded mb-1" />
                             <div className="h-8 w-16 bg-muted-foreground/10 rounded" />
                           </div>
                           <div className="h-24 bg-muted rounded-lg border border-border p-4">
                             <div className="w-8 h-8 rounded bg-muted-foreground/20 mb-3" />
                             <div className="h-4 w-12 bg-muted-foreground/20 rounded mb-1" />
                             <div className="h-8 w-16 bg-muted-foreground/10 rounded" />
                           </div>
                        </div>
                        <div className="h-48 bg-muted/30 rounded-lg border border-border p-4 relative overflow-hidden">
                           {/* Chart Lines */}
                           <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end px-4 gap-2 pb-4">
                              {[40, 60, 45, 70, 85, 65, 80, 95].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-primary/40 to-primary/80 rounded-t" />
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Floating Notification Card */}
                  <motion.div 
                    animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -right-8 top-1/4 w-64 bg-card border border-border shadow-xl rounded-lg p-4 z-30 hidden lg:block"
                  >
                     <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                           <FiActivity />
                        </div>
                        <div>
                           <p className="text-sm font-semibold">Risk Alert</p>
                           <p className="text-xs text-muted-foreground">Student performance drop detected</p>
                        </div>
                     </div>
                  </motion.div>
                  
                  {/* Floating Calendar Card */}
                   <motion.div 
                    animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -left-12 bottom-1/4 w-56 bg-card border border-border shadow-xl rounded-lg p-4 z-30 hidden lg:block"
                  >
                     <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                           <FiCalendar />
                        </div>
                        <p className="text-sm font-semibold">Upcoming</p>
                     </div>
                     <div className="space-y-2">
                        <div className="h-2 bg-muted rounded-full w-full" />
                        <div className="h-2 bg-muted rounded-full w-2/3" />
                     </div>
                  </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
           <motion.div
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1"
           >
              <div className="w-1 h-2 bg-muted-foreground rounded-full" />
           </motion.div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM STATEMENT */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase">The Challenge</span>
            <h2 className="text-4xl font-bold mt-4 mb-6">Educators waste 10+ hours weekly on <br/> administrative tasks</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <div className="text-2xl font-bold text-primary px-3">H</div>, // Using text for spreadsheet look
                title: "Scattered Data", 
                desc: "Student information across Google Classroom, spreadsheets, and email. No single source of truth." 
              },
              { 
                icon: <FiClock className="w-8 h-8 text-primary" />,
                title: "Manual Tracking", 
                desc: "Hours spent copying grades, attendance, and assignment data. Repetitive work that could be automated." 
              },
              { 
                icon: <FiSearch className="w-8 h-8 text-primary" />,
                title: "Reactive Teaching", 
                desc: "By the time you notice a struggling student, it's too late. No early warning system." 
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4 text-center">
             {[
               "73% of teachers report burnout from admin work",
               "Students at risk identified 4 weeks too late",
               "15 hours/week spent on data entry"
             ].map((stat, i) => (
               <div key={i} className="px-6 py-2 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground">
                 {stat}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURES (ZigZag) */}
      <section className="py-32 container mx-auto px-6 max-w-6xl space-y-32">
        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
             <span className="text-primary font-bold tracking-wide text-sm uppercase">One-Click Sync</span>
             <h2 className="text-4xl font-bold mt-2 mb-6">Your Google Classroom data, <br/> automatically organized</h2>
             <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
               Connect once and never manually import data again. Students, courses, assignments, and grades sync in real-time. No spreadsheets, no data entry, no hassle.
             </p>
             <ul className="space-y-4 mb-8">
               {["Automatic daily sync", "Real-time grade tracking", "Bi-directional calendar sync", "Student roster always up-to-date"].map((item, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
                     <FiCheck className="w-3 h-3 text-green-600 dark:text-green-400" />
                   </div>
                   <span className="text-foreground/80 font-medium">{item}</span>
                 </li>
               ))}
             </ul>
             <Button variant="link" className="p-0 h-auto text-primary font-bold text-lg">
               See how it works <FiArrowRight className="ml-2" />
             </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-1 md:order-2"
          >
             <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-border flex items-center justify-center relative overflow-hidden">
                {/* Visual showing data sync */}
                <div className="absolute inset-0 flex items-center justify-center gap-8">
                   <div className="w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center">
                      <FcGoogle className="w-12 h-12" />
                   </div>
                   <div className="flex gap-2">
                      {[1,2,3].map(i => (
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
          </motion.div>
        </div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
          >
             {/* Visual showing Analytics */}
             <div className="aspect-[4/3] bg-card rounded-2xl shadow-xl border border-border p-6 relative">
                 <div className="absolute top-6 left-6 right-6">
                    <div className="flex justify-between items-center mb-6">
                       <h4 className="font-bold">Student Risk Analysis</h4>
                       <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold">Live</span>
                    </div>
                    {/* Fake Chart */}
                    <div className="h-40 flex items-end gap-2 mb-6">
                       {[30, 45, 35, 25, 20].map((h, i) => (
                         <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-t ${i === 4 ? 'bg-red-500' : 'bg-gray-200'}`} />
                       ))}
                    </div>
                    {/* Insight Card */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex gap-3">
                       <FiActivity className="mt-1 text-primary shrink-0" />
                       <div>
                          <p className="text-sm font-bold text-foreground">Action Needed</p>
                          <p className="text-xs text-muted-foreground">3 students showing decline in Math 101 participation.</p>
                       </div>
                    </div>
                 </div>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="pl-4 md:pl-10"
          >
             <span className="text-primary font-bold tracking-wide text-sm uppercase">Intelligent Analytics</span>
             <h2 className="text-4xl font-bold mt-2 mb-6">Spot struggling students <br/> before they fall behind</h2>
             <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
               Our AI analyzes patterns across grades, attendance, and submissions to identify at-risk students early. Get actionable recommendations, not just raw data.
             </p>
             <ul className="space-y-4">
               {["Predictive grade forecasting", "Automatic at-risk alerts", "Personalized recommendations", "Attendance detection"].map((item, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
                     <FiCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                   </div>
                   <span className="text-foreground/80 font-medium">{item}</span>
                 </li>
               ))}
             </ul>
          </motion.div>
        </div>

        {/* Feature 3 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
             <span className="text-primary font-bold tracking-wide text-sm uppercase">Smart Scheduling</span>
             <h2 className="text-4xl font-bold mt-2 mb-6">Every deadline, exam, and <br/> event in one calendar</h2>
             <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
               Automatically pull all assignments and due dates from Google Classroom. Set custom reminders. Never miss an important date again.
             </p>
             <ul className="space-y-4">
               {["Auto-import assignments", "Color-coded by course", "Smart notifications", "Export to external calendars"].map((item, i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center shrink-0">
                     <FiCheck className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                   </div>
                   <span className="text-foreground/80 font-medium">{item}</span>
                 </li>
               ))}
             </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative"
          >
             {/* Calendar Mockup */}
             <div className="aspect-[4/3] bg-card rounded-2xl shadow-xl border border-border p-6 overflow-hidden">
                <div className="grid grid-cols-7 gap-2 h-full">
                   {[...Array(35)].map((_, i) => (
                      <div key={i} className="relative border border-border/50 rounded p-1">
                         <span className="text-xs text-muted-foreground">{i + 1}</span>
                         {/* Random Events */}
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
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Get started in under 2 minutes</h2>
            <p className="text-muted-foreground text-lg">Automation shouldn't be complicated.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-primary/30 z-0" />

            {[
              { num: "01", icon: <FcGoogle className="w-8 h-8"/>, title: "Connect", desc: "One-click OAuth sync.", time: "30s" },
              { num: "02", icon: <div className="w-8 h-8 text-primary font-bold">AI</div>, title: "Analyze", desc: "Systems organizes data.", time: "1m" },
              { num: "03", icon: <FiTrendingUp className="w-8 h-8 text-primary"/>, title: "Manage", desc: "View actionable insights.", time: "Done" }
            ].map((step, i) => (
              <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2 }}
                 className="relative z-10 bg-card rounded-2xl p-8 border border-border shadow-sm hover:translate-y-[-4px] transition-transform duration-300"
              >
                 <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center text-2xl font-bold text-primary mb-6 shadow-sm mx-auto md:mx-0">
                    {step.num}
                 </div>
                 <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                   {step.icon} {step.title}
                 </h3>
                 <p className="text-muted-foreground mb-4 h-12">{step.desc}</p>
                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                    <FiClock className="mr-1.5 w-3 h-3" /> {step.time}
                 </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <Button size="lg" className="px-8 shadow-lg shadow-primary/20">
               Connect Google Classroom Now
             </Button>
             <p className="mt-4 text-sm text-muted-foreground">
               <span className="underline cursor-pointer hover:text-foreground">Or explore with demo data</span>
             </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS */}
      <section id="testimonials" className="py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-16">Loved by educators worldwide</h2>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
             {[
               { quote: "Study AI cut my grading admin time from 8 hours to 2 hours per week. The AI insights helped me identify 3 struggling students I would have missed.", name: "Sarah Chen", role: "AP Biology Teacher", school: "Lincoln High", featured: true },
               { quote: "The Google Classroom integration is seamless. Set it and forget it. My entire class roster just syncs automatically.", name: "Michael Rodriguez", role: "Math Teacher", school: "Riverside Academy" },
               { quote: "Finally, a student management system that actually understands teachers' workflow. The calendar feature alone is worth it.", name: "Jennifer Park", role: "Dept Head", school: "Westview" },
               { quote: "I can't imagine going back to spreadsheets. This tool pays for itself in time saved.", name: "David Kim", role: "History Teacher", school: "Oak Ridge" },
               { quote: "The predictive analytics are scary accurate. It told me a student was at risk two weeks before they failed an exam.", name: "Amanda Low", role: "Physics", school: "Tech High" },
               { quote: "Clean, simple, and fast. Exactly what we needed.", name: "Tom Wilson", role: "Principal", school: "Charter Oak" }
             ].map((t, i) => (
                <div key={i} className={`break-inside-avoid bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow ${t.featured ? 'border-primary/50 shadow-primary/5' : ''}`}>
                   {t.featured && <div className="mb-4 text-primary font-bold text-xs uppercase tracking-wider">Featured Story</div>}
                   <p className="text-lg italic text-muted-foreground mb-6">"{t.quote}"</p>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                         <p className="font-bold text-sm text-foreground">{t.name}</p>
                         <p className="text-xs text-muted-foreground">{t.role}, {t.school}</p>
                      </div>
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-16 text-center space-y-2">
             <div className="flex justify-center text-yellow-500 gap-1 text-xl">
               {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
             </div>
             <p className="font-bold">4.9/5 from 200+ reviews</p>
             <p className="text-muted-foreground text-sm">2,000+ active educators • 50,000+ students managed</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="py-32 bg-primary relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary" />
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Start automating in 60 seconds</h2>
            <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">
               No credit card required. Free 14-day trial. Connect Google Classroom and see the magic.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold shadow-xl">
                 Connect Google Classroom
               </Button>
               <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                 Schedule a Demo
               </Button>
            </div>
            <div className="mt-12 flex justify-center gap-8 text-primary-foreground/60 text-sm font-medium">
               <span>✓ Google Workspace Partner</span>
               <span>✓ SOC 2 Certified</span>
               <span>✓ GDPR Compliant</span>
            </div>
         </div>
      </section>

      <LandingFooter />
    </div>
  );
}
