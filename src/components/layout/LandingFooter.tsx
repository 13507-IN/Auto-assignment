"use client";

import Link from "next/link";
import { FiTwitter, FiLinkedin, FiYoutube, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

export function LandingFooter() {
  return (
    <footer className="bg-card pt-16 pb-10 border-t border-border">
      <div className="section-shell">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 mb-14">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Study AI</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
              AI-powered student management for modern educators. Stop managing
              spreadsheets and start acting on real classroom insights.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FiTwitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FiYoutube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/60 p-6 flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">Product updates</p>
            <h4 className="text-2xl font-bold text-foreground">Get release notes monthly</h4>
            <p className="text-sm text-muted-foreground">
              Major features, quality improvements, and integration updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="h-10 rounded-md border border-border bg-card px-3 text-sm"
              />
              <Button className="gap-2">
                Subscribe <FiArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-foreground transition-colors">How it works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-muted-foreground">Copyright 2026 Study AI Automation. All rights reserved.</p>
          <div className="text-xs text-muted-foreground">Built for educators and student teams.</div>
        </div>
      </div>
    </footer>
  );
}
