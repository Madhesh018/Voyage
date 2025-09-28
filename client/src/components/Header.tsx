import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`nav-link text-foreground hover:text-primary transition-colors font-medium ${
            isActive(link.href) ? "active" : ""
          }`}
          data-testid={`nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary font-serif" data-testid="logo">
            Kv Tours & Travels
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <NavLinks />
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-white" data-testid="button-enquiry">
            <a href={`tel:${CONTACT_INFO.phone}`}>
              <Phone className="h-4 w-4 mr-2" />
              Enquiry Now
            </a>
          </Button>
          <Button asChild data-testid="button-signup">
            <Link href="/signup">Signup</Link>
          </Button>
          <Button variant="outline" asChild data-testid="button-login">
            <Link href="/login">Login</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <NavLinks />
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button asChild className="bg-secondary hover:bg-secondary/90 text-white">
                  <a href={`tel:${CONTACT_INFO.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Enquiry Now
                  </a>
                </Button>
                <Button asChild>
                  <Link href="/signup">Signup</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
