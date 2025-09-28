import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { insertCustomPackageRequestSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CustomPackageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CustomPackageModal({ open, onOpenChange }: CustomPackageModalProps) {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(insertCustomPackageRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      destination: "",
      adults: 1,
      children: 0,
      startDate: "",
      budget: "",
      additionalDetails: "",
    },
  });

  const customPackageMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/custom-package", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request submitted successfully!",
        description: "We will contact you soon with a customized package.",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    customPackageMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl" data-testid="text-custom-package-title">
            Plan Your Custom Trip
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} data-testid="input-full-name" />
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
                    <FormLabel>Email Address</FormLabel>
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Phone Number" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Destination(s)</FormLabel>
                    <FormControl>
                      <Input placeholder="Desired Destination(s)" {...field} data-testid="input-destination" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Adults</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))} 
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-adults">
                          <SelectValue placeholder="Number of Adults" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Children</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))} 
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-children">
                          <SelectValue placeholder="Number of Children" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tentative Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} data-testid="input-start-date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Estimate</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-budget">
                          <SelectValue placeholder="Budget Estimate" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="10000-25000">₹10,000 - ₹25,000</SelectItem>
                        <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                        <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                        <SelectItem value="100000+">₹1,00,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="additionalDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details or Special Requests</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional Details or Special Requests" 
                      rows={4} 
                      {...field} 
                      data-testid="textarea-additional-details"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={customPackageMutation.isPending}
              data-testid="button-submit-request"
            >
              {customPackageMutation.isPending ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
