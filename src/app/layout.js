import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Ushnik Technologies Pvt. Ltd. | Strategic Technology Partner",
  description: "Strategic Technology & Infrastructure Partner for the Evolving Digital Economy",
  icons: {
    icon: "/logo-2.png",
    shortcut: "/logo-2.png",
    apple: "/logo-2.png",
  },
  openGraph: {
    images: [
      {
        url: "/logo-2.png",
        width: 1200,
        height: 630,
        alt: "Ushnik Technologies Logo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-brand-white text-brand-black">
        {children}
      </body>
    </html>
  );
}
