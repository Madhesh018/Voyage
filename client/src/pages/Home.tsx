import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { GALLERY_QUOTES } from "@/lib/constants";

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="h-full bg-cover bg-center bg-no-repeat" 
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"}}
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold font-serif mb-6 leading-tight" data-testid="text-hero-quote">
              "To Travel is to Live"
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-8">
              Discover extraordinary destinations and create unforgettable memories with our expertly crafted travel experiences.
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white" data-testid="button-explore-packages">
              <Link href="/packages">Explore Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery & Quotes Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 font-serif" data-testid="text-gallery-title">
            Inspiration for Your Journey
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_QUOTES.map((item, index) => (
              <Card key={index} className="overflow-hidden shadow-lg">
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="gallery-img w-full h-64 object-cover"
                  data-testid={`img-gallery-${index}`}
                />
                <CardContent className="p-6">
                  <p className="text-lg font-medium text-center text-muted-foreground italic" data-testid={`text-quote-${index}`}>
                    "{item.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
