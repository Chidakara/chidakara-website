import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
  icon: "/favicon.ico",
},
  title: "Chidakara — AI Infrastructure Systems",

  description:
    "Premium AI automation systems, analytics infrastructures, intelligent workflow platforms, and enterprise operational systems engineered for modern businesses.",

  keywords: [
    "AI Infrastructure",
    "AI Automation",
    "AI Systems",
    "Enterprise AI",
    "Workflow Automation",
    "Analytics Dashboard",
    "Operational Intelligence",
  ],

  authors: [
    {
      name: "Chidakara",
    },
  ],

  creator: "Chidakara",

  metadataBase: new URL("https://chidakara.com"),

  openGraph: {
    title: "Chidakara — AI Infrastructure Systems",

    description:
      "Premium AI systems, workflow automation infrastructures, and enterprise intelligence platforms.",

    url: "https://chidakara.com",

    siteName: "Chidakara",

    locale: "en_US",

    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}