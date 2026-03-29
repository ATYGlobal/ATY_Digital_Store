// app/contact/page.tsx
import { Metadata } from "next";
import ContactClient from "@/components/sections/ContactClient";

export const metadata: Metadata = {
  title: "Contact & Partnerships",
  description:
    "Get in touch with the ATY Digital team. Writer applications, partnership inquiries, and general support.",
};

export default function ContactPage() {
  return <ContactClient />;
}
