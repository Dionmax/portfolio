"use server";

import { createElement } from "react";
import { getErrorMessage, validateFormString } from "@/lib/utils";
import { Resend } from "resend";
import ContactFromEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const email = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateFormString(email, 50)) {
    throw new Error("Invalid email");
  }

  if (!validateFormString(message, 500)) {
    throw new Error("Invalid message");
  }

  try {
    await resend.emails.send({
      from: "Contact Form <" + email + ">",
      to: "dionmaxfn+resend@gmail.com",
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
};
