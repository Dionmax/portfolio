import React from "react";
import {
  Html,
  Body,
  Heading,
  Hr,
  Container,
  Text,
  Section,
} from "@react-email/components";

type ContactFromEmailProps = {
  message: string;
  senderEmail: string;
};

export default function ContactFromEmail({
  message,
  senderEmail,
}: ContactFromEmailProps) {
  return (
    <div>
      <Html lang="en">
        <Body>
          <Container>
            <Heading>Portfolio Contact Form</Heading>
            <Hr />
            <Section>
              <Text>
                <strong>From:</strong> {senderEmail}
              </Text>
              <Text>{message}</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </div>
  );
}
