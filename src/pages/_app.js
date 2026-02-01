import '@/styles/globals.css'
import '@/styles/style.css'
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

      <Script strategy="lazyOnload">
        {`
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
			page_path: window.location.pathname,
			});
		`}
      </Script>

      <Head>
        <title>Namibia Tax Calculator 2025 | NamFreeTaxCalc</title>
        <meta
          name="description"
          content="Namibia Tax Calculator 2025/26: estimate PAYE, SSC, fringe benefits, and corporate tax with updated Namibian tax brackets."
        />
        <meta
          name="keywords"
          content="Namibia Tax Calculator 2025, PAYE Calculator Namibia, NamRA Tax Return Tool, Namibia Salary Calculator, Income Tax Rates Namibia, Namibian tax calculator"
        />
        <meta name="author" content="Ciesto Media & Design" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Namibia Tax Calculator 2025/26" />
        <meta
          property="og:description"
          content="Estimate Namibian PAYE, SSC, fringe benefits, and business tax with the 2025/26 thresholds."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://namfreetaxcalc.vercel.app/" />
        <meta property="og:image" content="https://namfreetaxcalc.vercel.app/_next/image?url=%2Fflag.png&w=128&q=75" />
        <meta property="og:image:alt" content="Namibia Tax Calculator 2025 logo" />
        <meta property="og:site_name" content="Namibia Tax Calculator 2025" />
        <meta name="google-site-verification" content="pbmvfp3qV_qMi9Ig-f-uBZjgnkpnjZVHjG6jUDUovUI" />
        <link rel="canonical" href="https://namfreetaxcalc.vercel.app" />
        <link rel="alternate" hrefLang="en-us" href="https://namfreetaxcalc.vercel.app" />
        <link rel="alternate" hrefLang="x-default" href="https://namfreetaxcalc.vercel.app" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
