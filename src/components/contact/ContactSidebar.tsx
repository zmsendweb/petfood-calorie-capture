
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ContactSidebar() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-muted-foreground">support@mypetcal.com</p>
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
  );
}
