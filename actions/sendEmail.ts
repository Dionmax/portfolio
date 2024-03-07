"use server";

import { createElement } from "react";
import { getErrorMessage, validateFormString } from "@/lib/utils";
import { Resend } from "resend";
import ContactFromEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  let data;

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
      from: "Contact Form <" + email + ">",
      to: "dionmax+portfolio@dionmax.dev",
      subject: "Portfolio Contact Form",
      reply_to: email,
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
