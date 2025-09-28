import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Tag, Bed, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { PACKAGES, CONTACT_INFO } from "@/lib/constants";
import NotFound from "./not-found";

export default function PackageDetail() {
  const { packageId } = useParams();
  const pkg = packageId ? PACKAGES[packageId as keyof typeof PACKAGES] : null;

  if (!pkg) {
    return <NotFound />;
  }

  return (
    <div className="pt-16">
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Package Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 font-serif" data-testid="text-package-title">
              {pkg.title}
            </h1>
            <img 
              src={pkg.image} 
              alt={pkg.title} 
              className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg"
              data-testid="img-package-hero"
            />
          </div>
          
          {/* Package Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6">
              <CalendarDays className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Duration</h4>
              <p data-testid="text-package-duration">{pkg.duration}</p>
            </Card>
            <Card className="text-center p-6">
              <Tag className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Starting Price</h4>
              <p className="text-xl font-bold text-secondary" data-testid="text-package-price">{pkg.price}</p>
            </Card>
            <Card className="text-center p-6">
              <Bed className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Accommodation</h4>
              <p className="text-sm" data-testid="text-package-accommodation">{pkg.accommodation}</p>
            </Card>
          </div>
          
          {/* Package Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4" data-testid="text-highlights-title">Package Highlights</h3>
              <ul className="space-y-2">
                {pkg.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center" data-testid={`text-highlight-${index}`}>
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4" data-testid="text-includes-title">What's Included</h3>
              <ul className="space-y-2">
                {pkg.includes.map((item, index) => (
                  <li key={index} className="flex items-center" data-testid={`text-include-${index}`}>
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Detailed Itinerary */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6" data-testid="text-itinerary-title">Detailed Itinerary</h3>
            <div className="space-y-4">
              {pkg.itinerary.map((day, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="p-0">
                    <p data-testid={`text-itinerary-day-${index}`}>
                      <strong>Day {index + 1}:</strong> {day.split(': ')[1] || day.split(' - ')[1]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1"
              data-testid="button-book-now"
            >
              Book Now
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white flex-1"
              data-testid="button-whatsapp-inquiry"
            >
              <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=I'm interested in the ${pkg.title} package`}>
                <SiWhatsapp className="h-4 w-4 mr-2" />
                WhatsApp Inquiry
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
