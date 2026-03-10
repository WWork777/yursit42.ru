import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout-components/footer/footer";
import Header from "@/components/layout-components/header/header";
import SocialButton from "@/components/common/social-button/socialButton";
import YandexMetrika from "@/components/common/YandexMetrika/YandexMEtrika";
import Script from "next/script";
import { ModalProvider } from "@/components/common/changeSite/ModalProvider";
import ChangeSite from "@/components/common/changeSite/changeSite";
import { GeoProvider } from "@/components/layout-components/GeoProvider";

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
      <head>
        <meta name="yandex-verification" content="53b108ef91e46109" />

        {/* Скрипт Битрикс24 */}
        <Script id="bitrix24-init" strategy="beforeInteractive">
          {`
            (function(w,d,u){
              var s=d.createElement('script');s.defer=false;s.async=false;s.id='b242ya-script';s.src=u+'?'+(Date.now()/60000|0);
              var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
            })(window,document,'https://67p.b242ya.ru/static/js/b242ya.js');
          `}
        </Script>
      </head>
      <body className={`${montserrat.variable}`}>
        {/* <ModalProvider> */}
        {/* <GeoProvider> */}
          <Header />
          {children}
          <SocialButton />
          <Footer />
          <YandexMetrika />

          {/* Скрипт для инициализации B242YA после загрузки */}
          <Script id="bitrix24-init-after" strategy="afterInteractive">
            {`
                var b242yaScript = document.querySelector('#b242ya-script');
                if (b242yaScript) {
                  b242yaScript.addEventListener('load', function() {
                    if (typeof B242YAInit !== 'undefined') {
                      B242YAInit({
                        portal: 'https://kodeks42.bitrix24.ru/',
                        pid: '342ff99292620ae8e2d85163aaeafe48'
                      });
                    }
                  });
                }
              `}
          </Script>
        {/* </GeoProvider> */}
        {/* </ModalProvider> */}
      </body>
    </html>
  );
}
