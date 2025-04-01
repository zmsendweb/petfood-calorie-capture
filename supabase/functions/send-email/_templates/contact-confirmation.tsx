
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ContactConfirmationEmailProps {
  name: string;
  email: string;
}

export const ContactConfirmationEmail = ({
  name,
  email,
}: ContactConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for contacting us!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank You For Your Message</Heading>
        <Text style={text}>
          Hello {name},
        </Text>
        <Text style={text}>
          We have received your message and will get back to you as soon as possible.
        </Text>
        <Text style={text}>
          If you have any additional questions or need immediate assistance, 
          please don't hesitate to reply to this email.
        </Text>
        <Text style={footer}>
          <Link
            href="https://mypetcal.com"
            target="_blank"
            style={{ ...link, color: '#898989' }}
          >
            My Pet Calorie Calculator
          </Link>
          , your companion in pet nutrition.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ContactConfirmationEmail

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}
