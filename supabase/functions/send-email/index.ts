
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { ContactConfirmationEmail } from "./_templates/contact-confirmation.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const SUPPORT_EMAIL = "support@mypetcal.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();
    console.log(`Received contact request from ${name} (${email})`);

    // Send confirmation email to the user
    const emailHtml = await renderAsync(
      React.createElement(ContactConfirmationEmail, {
        name,
        email
      })
    );

    const userEmailResponse = await resend.emails.send({
      from: `My Pet Calorie Calculator <${SUPPORT_EMAIL}>`,
      to: [email],
      subject: "We received your message!",
      html: emailHtml
    });
    
    console.log("Confirmation email sent:", userEmailResponse);

    // Send notification to site admin
    const adminEmailResponse = await resend.emails.send({
      from: `My Pet Calorie Calculator <${SUPPORT_EMAIL}>`,
      to: [SUPPORT_EMAIL],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    console.log("Admin notification sent:", adminEmailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
