import '@/styles/globals.css'
import '@/styles/style.css'
import Head from 'next/head';

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
        <title>Namibia Free Tax Calculator</title> 
        <meta name="description" content="Easily and quickly calculate your income taxes in Namibia with this free tax calculator. Estimate your annual, bi-annual, quarterly, and monthly income tax payable." />
        <meta name="keywords" content="Namibia, Namibia Free Tax Calculator, Monthly Salary, Estimate, Annual Salary, Tax Payable, Bi-Annual Tax Payable, Quarterly Tax Payable, User-friendly calculator, Finances, Easy-to-read results, Bi-annual, Quarterly, Monthly tax payable amounts, Slider, Adjust, Tool, Estimate taxes, Namibian tax rates" />
        <meta name="author" content="Ciesto Media & Design" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />		
        <meta property="og:title" content="Namibia Free Tax Calculator" />
        <meta property="og:description" content="Easily and quickly calculate your income taxes in Namibia with this free tax calculator. Estimate your annual, bi-annual, quarterly, and monthly income tax payable." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://namfreetaxcalc.vercel.app/" />
        <meta property="og:image" content="https://namfreetaxcalc.vercel.app/_next/image?url=%2Fflag.png&w=128&q=75" />
        <meta property="og:image:alt" content="Namibia Free Tax Calculator logo" />
        <meta property="og:site_name" content="Namibia Free Tax Calculator" />
		<meta name="google-site-verification" content="pbmvfp3qV_qMi9Ig-f-uBZjgnkpnjZVHjG6jUDUovUI" />
        <link rel="canonical" href="https://namfreetaxcalc.vercel.app" />
		<link rel="alternate" hrefLang="en-us" href="https://namfreetaxcalc.vercel.app" />
		<link rel="alternate" hrefLang="x-default" href="https://namfreetaxcalc.vercel.app"/>
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
