import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import StoreNavbar from "@/components/StoreNavbar";
import StoreFooter from "@/components/StoreFooter";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Miss Rose Official - Cosmetics Store",
  description: "Shop the best cosmetics, makeup, and beauty products from Miss Rose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white text-[#121212] min-h-screen flex flex-col`}>
        <Providers>
          <StoreNavbar />
          <main className="flex-grow">
            {children}
          </main>
          <StoreFooter />
        </Providers>
      </body>
    </html>
  );
}