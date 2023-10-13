import { Toaster } from "@/components/ui/toaster";
import Provider from "../../context/Provider";
import "./globals.css";

export const metadata = {
  title: "Dribble",
  description: "Created a Dribbble clone using nextjs 13.",
};

export default function RootLayout({ children, auth, main }) {
  return (
    <html lang="en">
      <Provider>
      <body>
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
