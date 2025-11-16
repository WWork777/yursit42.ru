import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout-components/footer/footer";
import Header from "@/components/layout-components/header/header";
import SocialButton from "@/components/common/social-button/socialButton";
import YandexMetrika from "@/components/common/YandexMetrika/YandexMEtrika";
import Script from "next/script";
import { ModalProvider } from "@/components/common/changeSite/ModalProvider";
import ChangeSite from "@/components/common/changeSite/changeSite";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  icons: {
    icon: [
      { rel: "icon", type: "image/svg+xml", url: "/favicon/favicon.svg" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon/favicon-96x96.png",
      },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="yandex-verification" content="53b108ef91e46109" />
      <body className={`${montserrat.variable}`}>
        <ModalProvider>
          <Header />
          {children}
          <SocialButton />
          <Footer />
          <YandexMetrika />
        </ModalProvider>
      </body>
    </html>
  );
}
