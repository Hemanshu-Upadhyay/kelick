import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import Head from "next/head";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kelick",
  description: "Employee Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Kelick</title>
        <meta name="description" content="Employee Management System" />
      </Head>
      <body className={quicksand.className}>
        <div className="flex min-h-screen">
          <Sidebar className="hidden md:block" />
          <div className="flex-1">
            <Header title="Employees" />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
