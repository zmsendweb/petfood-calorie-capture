
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

// Feedback form schema
const feedbackFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  petType: z.string().min(1, "Please specify your pet type"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  featureRequest: z.string().optional(),
  captchaAnswer: z.string().refine((val) => parseInt(val) === window.captchaSum, {
    message: "Incorrect answer to the math problem",
  }),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

interface FeedbackFormProps {
  captchaNum1: number;
  captchaNum2: number;
}

export function FeedbackForm({ captchaNum1, captchaNum2 }: FeedbackFormProps) {
  // Make captchaSum accessible to the form schema
  window.captchaSum = captchaNum1 + captchaNum2;
  
  const feedbackForm = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: "",
      email: "",
      petType: "",
      feedback: "",
      featureRequest: "",
      captchaAnswer: "",
    },
  });
  
  // Handle feedback form submission
  function onFeedbackSubmit(data: FeedbackFormValues) {
    console.log("Feedback form submitted:", data);
    
    // Send data to Supabase edge function
    fetch(`https://dtaivjcchgvuhpdjqtba.supabase.co/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: `Pet Type: ${data.petType}\n\nFeedback: ${data.feedback}\n\nFeature Request: ${data.featureRequest || 'None'}`
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
        toast.success("Thank you for your feedback! We value your input.");
      })
      .catch(error => {
        console.error("Error sending email:", error);
        toast.error("There was a problem sending your feedback. Please try again.");
      });
    
    feedbackForm.reset();
  }

  return (
    <Form {...feedbackForm}>
      <form onSubmit={feedbackForm.handleSubmit(onFeedbackSubmit)} className="space-y-6">
        <FormField
          control={feedbackForm.control}
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
          control={feedbackForm.control}
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
          control={feedbackForm.control}
          name="petType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What type of pet do you have?</FormLabel>
              <FormControl>
                <Input placeholder="Dog, Cat, Bird, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={feedbackForm.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Feedback</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us what you think about our platform" 
                  className="min-h-24"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={feedbackForm.control}
          name="featureRequest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feature Request (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What features would you like to see added to our platform?" 
                  className="min-h-24"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Your suggestions help us improve our platform for all pet owners.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={feedbackForm.control}
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
        
        <Button type="submit" className="w-full">Submit Feedback</Button>
      </form>
    </Form>
  );
}

declare global {
  interface Window {
    captchaSum: number;
  }
}
