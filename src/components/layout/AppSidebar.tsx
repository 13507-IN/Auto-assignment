"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUsers, FiCalendar, FiBarChart2, FiSettings, FiBook } from "react-icons/fi";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: FiHome },
  { name: "Students", href: "/dashboard/students", icon: FiUsers },
  { name: "Calendar", href: "/dashboard/calendar", icon: FiCalendar },
  { name: "Performance", href: "/dashboard/performance", icon: FiBarChart2 },
  { name: "Study Plans", href: "/dashboard/study-plans", icon: FiBook },
  { name: "Settings", href: "/dashboard/settings", icon: FiSettings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-card px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center justify-center border-b border-border mb-4">
           {/* Logo placeholder - text for now */}
           <h1 className="text-xl font-bold tracking-tight text-primary">StudyFlow AI</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary border-l-4 border-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 shrink-0 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
