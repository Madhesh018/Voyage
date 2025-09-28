import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_INFO } from "@/lib/constants";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We will get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="pt-16">
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 font-serif" data-testid="text-contact-title">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to start your next adventure? Contact us today and let's plan your perfect getaway together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Contact Form and Direct Contact */}
            <div className="space-y-8">
              {/* Contact Form */}
              <Card className="p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6" data-testid="text-form-title">Send us a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Email Address" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Phone Number" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Subject" {...field} data-testid="input-subject" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your Message" 
                              rows={5} 
                              {...field} 
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={contactMutation.isPending}
                      data-testid="button-send-message"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </Card>
              
              {/* Direct Contact Details */}
              <Card className="p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6" data-testid="text-direct-contact-title">Direct Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary text-white w-12 h-12 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <a 
                        href={`tel:${CONTACT_INFO.phone}`} 
                        className="text-primary hover:underline"
                        data-testid="link-phone"
                      >
                        {CONTACT_INFO.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                      <SiWhatsapp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp Us</p>
                      <Button 
                        asChild 
                        className="bg-green-500 hover:bg-green-600 text-white mt-1"
                        data-testid="button-whatsapp"
                      >
                        <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`}>
                          Start Chat
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-secondary text-white w-12 h-12 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <a 
                        href={`mailto:${CONTACT_INFO.email}`} 
                        className="text-primary hover:underline"
                        data-testid="link-email"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Right Column: Office Location */}
            <Card className="p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6" data-testid="text-office-title">Visit Our Office</h3>
              
              {/* Google Maps Placeholder */}
              <div className="bg-muted rounded-lg h-64 mb-6 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-medium">Interactive Google Maps</p>
                  <p className="text-sm">Location: {CONTACT_INFO.address}</p>
                </div>
              </div>
              
              {/* Office Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Office Address</h4>
                  <p className="text-muted-foreground" data-testid="text-office-address">
                    {CONTACT_INFO.address}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-2">Working Hours</h4>
                  <div className="text-muted-foreground space-y-1">
                    <p data-testid="text-working-hours-weekday">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p data-testid="text-working-hours-sunday">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    asChild 
                    className="w-full bg-secondary hover:bg-secondary/90 text-white"
                    data-testid="button-call-directions"
                  >
                    <a href={`tel:${CONTACT_INFO.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call for Directions
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
