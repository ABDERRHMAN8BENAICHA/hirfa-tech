import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"
import Provider from "@/components/theme/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Post Jop",
  description: "Great! It looks like you're defining metadata for your project titled \"Post Jop.\" If you need any further assistance with your project or anything else, feel free to ask!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "")}>
        <Provider >
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
