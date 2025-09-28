import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { PACKAGES, CONTACT_INFO } from "@/lib/constants";
import CustomPackageModal from "@/components/CustomPackageModal";

export default function Packages() {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  return (
    <div className="pt-16">
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 font-serif" data-testid="text-packages-title">
              Our Travel Packages
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover India's most enchanting destinations with our carefully curated travel packages, 
              designed to create unforgettable memories and authentic cultural experiences.
            </p>
          </div>
          
          {/* Main Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {Object.values(PACKAGES).map((pkg) => (
              <Card key={pkg.id} className="package-card overflow-hidden shadow-lg" data-testid={`card-package-${pkg.id}`}>
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-48 object-cover"
                  data-testid={`img-package-${pkg.id}`}
                />
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-primary" data-testid={`text-package-title-${pkg.id}`}>
                    {pkg.title}
                  </h3>
                  <p className="text-muted-foreground mb-4" data-testid={`text-package-description-${pkg.id}`}>
                    {pkg.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-secondary" data-testid={`text-package-price-${pkg.id}`}>
                      Starting from {pkg.price}
                    </span>
                    <Button asChild data-testid={`button-view-details-${pkg.id}`}>
                      <Link href={`/packages/${pkg.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Custom Package Section */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif" data-testid="text-custom-package-title">
              Want a Different Destination?
            </h3>
            <p className="text-xl mb-8 opacity-90">Create Your Own Package!</p>
            <Button 
              onClick={() => setIsCustomModalOpen(true)}
              className="bg-white text-primary hover:bg-gray-100"
              size="lg"
              data-testid="button-plan-custom-trip"
            >
              Plan My Custom Trip
            </Button>
          </div>
          
          {/* Direct Contact Section */}
          <div className="bg-muted rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4" data-testid="text-contact-assistance">
              Need Immediate Assistance?
            </h3>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-white" data-testid="button-call-now">
                <a href={`tel:${CONTACT_INFO.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call: {CONTACT_INFO.phone}
                </a>
              </Button>
              <Button asChild className="bg-green-500 hover:bg-green-600 text-white" data-testid="button-whatsapp-chat">
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`}>
                  <SiWhatsapp className="h-4 w-4 mr-2" />
                  Chat with us on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CustomPackageModal 
        open={isCustomModalOpen} 
        onOpenChange={setIsCustomModalOpen}
      />
    </div>
  );
}
