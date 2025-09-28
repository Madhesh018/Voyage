import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold font-serif mb-4">Kv Tours & Travels</h3>
            <p className="text-gray-300 mb-4">
              Creating unforgettable travel experiences for over 10 years. 
              Your journey to discover India starts with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="link-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/packages" className="text-gray-300 hover:text-white transition-colors">Packages</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Popular Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Destinations</h4>
            <ul className="space-y-2">
              <li><Link href="/packages/tamilnadu" className="text-gray-300 hover:text-white transition-colors">Tamil Nadu</Link></li>
              <li><Link href="/packages/kerala" className="text-gray-300 hover:text-white transition-colors">Kerala</Link></li>
              <li><Link href="/packages/karnataka" className="text-gray-300 hover:text-white transition-colors">Karnataka</Link></li>
              <li><Link href="/packages/varanasi" className="text-gray-300 hover:text-white transition-colors">Varanasi</Link></li>
              <li><Link href="/packages/mumbai" className="text-gray-300 hover:text-white transition-colors">Mumbai</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-secondary" />
                <span className="text-gray-300 text-sm">{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-secondary" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-secondary" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">© 2025 Kv Tours & Travels. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
