import { Toaster } from "@/components/ui/toaster";
import Provider from "../../context/Provider";
import "./globals.css";
import { Inter } from 'next/font/google'

export const metadata = {
  title: "Dribble",
  description: "Created a Dribbble clone using nextjs 13.",
};

const inter = Inter({
  subsets: ['latin'],
})

export default function RootLayout({ children, auth, main }) {
  return (
    <html lang="en">
      <Provider>
      <body className={inter.className}>
            {main}
        {auth}
          <main>
            {children}
            </main>
          <Toaster />
      </body>
      </Provider>
    </html>
  );
}
