import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "@/store/AuthContext";
import { Toaster } from "@/components/ui/toaster";


const FontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "Task Management",
  description: "Task Management application using next.js and typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${FontSans.className} bg-colors-dark-300 min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
          {children}
          <Toaster />
          </AuthProvider>
          <ToastContainer
            theme="dark"
            transition={Flip}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
