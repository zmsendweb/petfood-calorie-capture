
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  captchaAnswer: z.string().refine((val) => parseInt(val) === window.captchaSum, {
    message: "Incorrect answer to the math problem",
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  captchaNum1: number;
  captchaNum2: number;
}

export function ContactForm({ captchaNum1, captchaNum2 }: ContactFormProps) {
  // Make captchaSum accessible to the form schema
  window.captchaSum = captchaNum1 + captchaNum2;
  
  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      captchaAnswer: "",
      acceptTerms: false,
    },
  });
  
  // Handle contact form submission
  function onContactSubmit(data: ContactFormValues) {
    console.log("Contact form submitted:", data);
    
    // Send data to Supabase edge function
    fetch(`https://dtaivjcchgvuhpdjqtba.supabase.co/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        console.log("Email sent successfully:", result);
        toast.success("Your message has been sent! We'll get back to you soon.");
      })
      .catch(error => {
        console.error("Error sending email:", error);
        toast.error("There was a problem sending your message. Please try again.");
      });
      
    contactForm.reset();
  }

  return (
    <Form {...contactForm}>
      <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
        <FormField
          control={contactForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={contactForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="How can we help you?" 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={contactForm.control}
          name="captchaAnswer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification (Please solve this math problem)</FormLabel>
              <div className="flex items-center gap-2">
                <span className="text-base font-medium">{captchaNum1} + {captchaNum2} = ?</span>
                <FormControl>
                  <Input 
                    placeholder="Answer" 
                    className="w-24"
                    type="number"
                    {...field} 
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={contactForm.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the terms and privacy policy
                </FormLabel>
                <FormDescription>
                  We'll never share your information with third parties.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </Form>
  );
}

// Add the captchaSum to the Window interface
declare global {
  interface Window {
    captchaSum: number;
  }
}
