import '@/styles/globals.css'
import '@/styles/style.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
	<>
      <Head>
        <title>Namibia Free Tax Calculator</title>
        <meta name="description" content="Calculate your income taxes in Namibia with this free tax calculator. Estimate your annual, bi-annual, and quarterly tax payable." />
        <meta name="keywords" content="income tax, Namibia, tax calculator, Namibian tax calculator, monthly tax calculator, Namibia monthly tax calculator, Namibia monthly salary calculator, Namibia monthly wage calculator, Namibia monthly salary after tax calculator, online calculators, icalculator, calculator, calculatr, Namibia Tax Calculator, income tax information, free tax calculator, annual tax payable, bi-annual tax payable, quarterly tax payable, income tax rates, social security deductions, pension deductions, 2023 tax rates" />
        <meta name="author" content="Ciesto Media & Design" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />		
        <meta property="og:title" content="Namibia Free Tax Calculator" />
        <meta property="og:description" content="Calculate your taxes in Namibia with this free tax calculator. Estimate your annual, bi-annual, and quarterly tax payable." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://namfreetaxcalc.vercel.app/" />
        <meta property="og:image" content="https://namfreetaxcalc.vercel.app/_next/image?url=%2Fflag.png&w=128&q=75" />
        <meta property="og:image:alt" content="Namibia Free Tax Calculator logo" />
        <meta property="og:site_name" content="Namibia Free Tax Calculator" />
        <link rel="canonical" href="https://namfreetaxcalc.vercel.app/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebApplication",
            "name": "Namibia Free Tax Calculator",
            "description": "Calculate your income taxes in Namibia with this free tax calculator. Estimate your annual, bi-annual, and quarterly tax payable.",
            "url": "https://namfreetaxcalc.vercel.app/",
            "image": "https://namfreetaxcalc.vercel.app/_next/image?url=%2Fflag.png&w=128&q=75",
            "applicationCategory": "Finance",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "NAD"
            }
          })}
        </script>	
      </Head>

      <Component {...pageProps} />
	</>
	);
}
