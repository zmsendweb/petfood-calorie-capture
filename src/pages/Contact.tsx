
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNavigation } from "@/components/MainNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  captchaAnswer: z.string().refine((val) => parseInt(val) === captchaSum, {
    message: "Incorrect answer to the math problem",
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

// Feedback form schema
const feedbackFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  petType: z.string().min(1, "Please specify your pet type"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  featureRequest: z.string().optional(),
  captchaAnswer: z.string().refine((val) => parseInt(val) === captchaSum, {
    message: "Incorrect answer to the math problem",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

// Generate random numbers for captcha (1-10)
const captchaNum1 = Math.floor(Math.random() * 10) + 1;
const captchaNum2 = Math.floor(Math.random() * 10) + 1;
const captchaSum = captchaNum1 + captchaNum2;

export function Contact() {
  const [activeTab, setActiveTab] = useState("contact");
  
  // Contact form
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
  
  // Feedback form
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
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        </div>
        <MainNavigation />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="feedback">Feedback & Feature Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contact" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    Have a question about our pet nutrition platform? Send us a message and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Share Your Feedback</CardTitle>
                  <CardDescription>
                    We value your input! Let us know what you think about our platform and what features you'd like to see.
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">support@petnutrition.example.com</p>
              </div>
              
              <div>
                <h3 className="font-medium">Hours</h3>
                <p className="text-muted-foreground">Monday to Friday: 9am - 5pm</p>
                <p className="text-muted-foreground">Saturday: 10am - 2pm</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Twitter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Instagram</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Facebook</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">How quickly will you respond?</h3>
                <p className="text-muted-foreground">We typically respond to all inquiries within 24-48 business hours.</p>
              </div>
              <div>
                <h3 className="font-medium">Do you offer nutrition consulting?</h3>
                <p className="text-muted-foreground">Yes, we offer specialized pet nutrition consulting. Please mention this in your message.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
