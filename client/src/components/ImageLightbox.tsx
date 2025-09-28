import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageLightboxProps {
  image: string;
  onClose: () => void;
}

export default function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <div className="relative max-w-4xl max-h-[90vh]">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 z-10"
          onClick={onClose}
          data-testid="button-close-lightbox"
        >
          <X className="h-6 w-6" />
        </Button>
        <img 
          src={image} 
          alt="Gallery image" 
          className="max-w-full max-h-[90vh] rounded-lg"
          onClick={(e) => e.stopPropagation()}
          data-testid="img-lightbox"
        />
      </div>
    </div>
  );
}
