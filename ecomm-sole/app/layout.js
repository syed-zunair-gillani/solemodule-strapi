import { Inter } from "next/font/google";
import "./globals.css";
import "./../styles/styles.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StoreProvider from "@/redux/StoreProvider";
export const metadata = {
  title: "Sole Module",
  description:
    "Organize your space,simplify your life. Intelligent home/office storage solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fav.png" />
        <link
          href="https://kit-pro.fontawesome.com/releases/v5.13.0/css/pro.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link href="/assets/css/elegant-icon.css" rel="stylesheet" />
        <link href="/assets/css/slick.min.css" rel="stylesheet" />
        {/* Google Tag Manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16590253080"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-16590253080');
        `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body suppressHydrationWarning={true}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
