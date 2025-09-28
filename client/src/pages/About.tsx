import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ABOUT_GALLERY } from "@/lib/constants";
import ImageLightbox from "@/components/ImageLightbox";

export default function About() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <div className="pt-16">
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          {/* Our Story Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-bold mb-8 font-serif" data-testid="text-story-title">
              Our 10+ Year Journey in Creating Memories
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              <p data-testid="text-story-paragraph-1">
                For over a decade, Kv Tours & Travels has been passionate about creating extraordinary travel experiences 
                that go beyond ordinary tourism. We believe that travel is not just about visiting places—it's about 
                connecting with cultures, creating lasting memories, and discovering new perspectives.
              </p>
              <p data-testid="text-story-paragraph-2">
                Our mission is to provide excellent service while crafting unforgettable experiences that inspire and 
                transform our travelers. With 10+ years of expertise in the travel industry, we have built lasting 
                relationships with local communities, ensuring authentic and responsible tourism practices.
              </p>
              <p data-testid="text-story-paragraph-3">
                From the serene backwaters of Kerala to the spiritual ghats of Varanasi, we curate journeys that 
                capture the essence of India's incredible diversity. Every trip is designed with meticulous attention 
                to detail, ensuring comfort, safety, and meaningful cultural exchanges.
              </p>
            </div>
          </div>
          
          {/* Photo Gallery Section */}
          <div className="mb-16">
            <h3 className="text-4xl font-bold text-center mb-12 font-serif" data-testid="text-gallery-title">
              Memories from Our Trips
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ABOUT_GALLERY.map((item, index) => (
                <div 
                  key={index}
                  className="gallery-img cursor-pointer"
                  onClick={() => setLightboxImage(item.image)}
                  data-testid={`img-gallery-${index}`}
                >
                  <img 
                    src={item.image} 
                    alt={item.alt} 
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {lightboxImage && (
        <ImageLightbox 
          image={lightboxImage} 
          onClose={() => setLightboxImage(null)} 
        />
      )}
    </div>
  );
}
