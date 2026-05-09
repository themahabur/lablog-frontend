import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LabLog - a simple equipment booking system",
  description:
    "LabLog is a simple equipment booking system built with Next.js, Prisma, and PostgreSQL. It allows users to easily book and manage equipment reservations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <main>{children}</main>
        <Toaster richColors />
        </body>
    </html>
  );
}
