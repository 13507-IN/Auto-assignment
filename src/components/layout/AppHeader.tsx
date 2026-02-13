"use client";

import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiSearch, FiBell } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

export function AppHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/80 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full max-w-md my-auto">
             <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                <FiSearch className="h-4 w-4" />
             </div>
             <input
              id="search-field"
              className="block h-10 w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              placeholder="Search students, courses, assignments... (⌘K)"
              type="search"
              name="search"
            />
          </div>
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <span className="sr-only">View notifications</span>
            <FiBell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary" />
          </Button>

          <div className="h-6 w-px bg-border" aria-hidden="true" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground"
          >
            <span className="sr-only">Toggle theme</span>
            <FiSun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <FiMoon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          
          <div className="flex items-center gap-x-4 lg:gap-x-6 pl-4">
             {/* Profile dropdown placeholder */}
             <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 overflow-hidden ring-2 ring-primary/20">
               {/* User Avatar */}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
