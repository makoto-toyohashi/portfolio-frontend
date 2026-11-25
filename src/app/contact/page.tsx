import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "お問い合わせ・案件相談・フォーム実装デモ",
};

export default function Page() {
  return <ContactPage />;
}