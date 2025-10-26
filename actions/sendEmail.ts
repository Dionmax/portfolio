"use server";

import { createElement } from "react";
import { getErrorMessage, validateFormString } from "@/lib/utils";
import { Resend } from "resend";
import ContactFromEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  let data;

  // reCAPTCHA v3 verification
  const token = formData.get("g-recaptcha-response")?.toString();
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    return "Server reCAPTCHA secret is not configured";
  }

  if (!token) {
    return "reCAPTCHA validation failed. Please try again.";
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
        // Avoid Next.js caching
        cache: "no-store",
      }
    );

    const verifyJson: any = await verifyRes.json();
    if (!verifyJson?.success || (typeof verifyJson.score === "number" && verifyJson.score < 0.5)) {
      return "Failed reCAPTCHA verification. Please try again.";
    }
  } catch (e) {
    return "Could not verify reCAPTCHA. Please try again later.";
  }

  const email = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateFormString(email, 100)) {
    throw new Error("Invalid email");
  }

  if (!validateFormString(message, 1000)) {
    throw new Error("Invalid message");
  }

  try {
    data = await resend.emails.send({
      from: "portfolio@dionmax.dev",
      to: "portfolio@dionmax.dev",
  subject: "Portfolio Contact Form from " + email + "",
  // @ts-expect-error: Resend SDK accepts `replyTo` in this version
  replyTo: email as string,
      react: createElement(ContactFromEmail, {
        message: message as string,
        senderEmail: email as string,
      }),
    });
  } catch (error: unknown) {
    return getErrorMessage(error);
  }

  return data;
};
