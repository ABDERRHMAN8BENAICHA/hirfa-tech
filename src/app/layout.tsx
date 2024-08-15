import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"
import Provider from "@/components/theme/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hirfa Tech",
  description: "Hirfa Tech is an educational platform focused on developing vocational and industrial skills through a variety of courses.",
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
