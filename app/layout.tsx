import PaymentDialog from "@/components/PaymentDialog";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ftn",
  description:
    "Fine tune Mistral 7B and Llama 2 without any code. Just upload your dataset and train.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="{inter.className}">{children}</body>
    </html>
  );
}
