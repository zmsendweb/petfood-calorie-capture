
import { useState } from "react";
import { Toaster } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our components
import { ContactForm } from "@/components/contact/ContactForm";
import { FeedbackForm } from "@/components/contact/FeedbackForm";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { PageHeader } from "@/components/PageHeader";

export function Contact() {
  const [activeTab, setActiveTab] = useState("contact");
  
  // Generate random numbers for captcha (1-10)
  const captchaNum1 = Math.floor(Math.random() * 10) + 1;
  const captchaNum2 = Math.floor(Math.random() * 10) + 1;

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <PageHeader 
        title="Contact Us" 
        description="Get in touch with our support team"
      />

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
                  <ContactForm captchaNum1={captchaNum1} captchaNum2={captchaNum2} />
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
                  <FeedbackForm captchaNum1={captchaNum1} captchaNum2={captchaNum2} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <ContactSidebar />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
