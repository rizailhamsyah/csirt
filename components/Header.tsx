"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, FileText } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [rfcOpen, setRfcOpen] = useState(false)

  const isActive = (path: string) => pathname === path
  const isRfcActive = pathname?.startsWith("/rfc")

  const navItems = [
    { href: "/", label: "Beranda" },
    { href: "/tentang-kami", label: "Tentang Kami" },
    { href: "/faq", label: "FAQ" },
    { href: "/hubungi-kami", label: "Hubungi Kami" },
  ]

  const rfcItems = [
    { href: "/rfc/rfc-2350", label: "RFC - 2350", description: "Dokumen RFC 2350" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 group transition-opacity hover:opacity-80"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <span className="text-lg font-bold text-primary">C</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight">PKC - CSIRT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {/* Beranda */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={cn(
                      "group relative inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200",
                      "hover:text-foreground focus:text-foreground focus:outline-none",
                      isActive("/")
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-accent/50"
                    )}
                  >
                    Beranda
                    {isActive("/") && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Tentang Kami */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/tentang-kami"
                    className={cn(
                      "group relative inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200",
                      "hover:text-foreground focus:text-foreground focus:outline-none",
                      isActive("/tentang-kami")
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-accent/50"
                    )}
                  >
                    Tentang Kami
                    {isActive("/tentang-kami") && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* RFC Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "h-10 px-4 text-sm font-medium transition-all bg-transparent duration-200",
                    isRfcActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  RFC
                  {isRfcActive && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[300px] p-2">
                    <ul className="grid gap-1">
                      {rfcItems.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink className="flex items-start" asChild>
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => {
                                setMobileMenuOpen(false)
                                setRfcOpen(false)
                              }}
                              className={cn(
                                "group flex flex-col gap-1.5 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                isActive(item.href)
                                  ? "bg-accent text-accent-foreground"
                                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <div className={cn(
                                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors",
                                  isActive(item.href)
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary"
                                )}>
                                  <FileText className="h-3.5 w-3.5" />
                                </div>
                                <div className="font-medium leading-none">{item.label}</div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* FAQ */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/faq"
                    className={cn(
                      "group relative inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200",
                      "hover:text-foreground focus:text-foreground focus:outline-none",
                      isActive("/faq")
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-accent/50"
                    )}
                  >
                    FAQ
                    {isActive("/faq") && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Hubungi Kami */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/hubungi-kami"
                    className={cn(
                      "group relative inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-all duration-200",
                      "hover:text-foreground focus:text-foreground focus:outline-none",
                      isActive("/hubungi-kami")
                        ? "bg-linear-to-r from-primary via-blue-600 to-purple-600 text-white shadow-lg shadow-primary/30"
                        : "bg-linear-to-r from-primary/80 via-blue-600/80 to-purple-600/80 text-white hover:from-primary hover:via-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-primary/30"
                    )}
                  >
                    Hubungi Kami
                    {isActive("/hubungi-kami") && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-white/50" />
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="flex items-center ml-5">
                <AnimatedThemeToggler />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-75 sm:w-100 px-4">
            <SheetHeader>
              <div className="flex justify-between items-center">
                <SheetTitle className="text-left">Menu</SheetTitle>
                <AnimatedThemeToggler className="mr-2" />
              </div>
            </SheetHeader>
            <nav className="flex flex-col space-y-2">
              {/* Beranda */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  isActive("/")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                Beranda
              </Link>

              {/* Tentang Kami */}
              <Link
                href="/tentang-kami"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  isActive("/tentang-kami")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                Tentang Kami
              </Link>

              {/* RFC Collapsible */}
              <Collapsible open={rfcOpen} onOpenChange={setRfcOpen}>
                <CollapsibleTrigger
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    isRfcActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors",
                      isRfcActive
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <span>RFC</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      rfcOpen && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pl-4">
                  {rfcItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setRfcOpen(false)
                      }}
                      className={cn(
                        "group flex items-start gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                      )}
                    >
                      <div className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors",
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary"
                      )}>
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <div className="font-medium leading-none">{item.label}</div>
                        <p className="text-xs leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ */}
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  isActive("/faq")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                FAQ
              </Link>

              {/* Hubungi Kami */}
              <Link
                href="/hubungi-kami"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-all duration-300 shadow-lg",
                  isActive("/hubungi-kami")
                    ? "bg-linear-to-r from-primary via-blue-600 to-purple-600 text-white shadow-primary/30"
                    : "bg-linear-to-r from-primary/80 via-blue-600/80 to-purple-600/80 text-white hover:from-primary hover:via-blue-600 hover:to-purple-600 hover:shadow-xl hover:shadow-primary/40"
                )}
              >
                Hubungi Kami
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

