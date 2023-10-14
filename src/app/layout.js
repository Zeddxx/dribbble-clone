import { Toaster } from "@/components/ui/toaster";
import Provider from "../../context/Provider";
import "./globals.css";
import { Poppins } from 'next/font/google'

export const metadata = {
  title: "Dribble",
  description: "Created a Dribbble clone using nextjs 13.",
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({ children, auth, main }) {
  return (
    <html lang="en">
      <Provider>
      <body className={poppins.className}>
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
