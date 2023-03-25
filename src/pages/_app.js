import '@/styles/globals.css'
import '@/styles/style.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
	<>
	
      <Head>
        <title>Namibia Free Tax Calculator</title>
		<meta name="description" content="Calculate your taxes in Namibia with this free tax calculator. Estimate your annual, bi-annual, and quarterly tax payable." />
		
		<meta property="og:title" content="Namibia Free Tax Calculator" />
		<meta property="og:description" content="Calculate your taxes in Namibia with this free tax calculator. Estimate your annual, bi-annual, and quarterly tax payable." />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://yourdomain.com/" />
		<meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
		
		<link rel="canonical" href="https://yourdomain.com/" />
		
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "http://schema.org",
				"@type": "WebApplication",
				"name": "Namibia Free Tax Calculator",
				"description": "Calculate your taxes in Namibia with this free tax calculator. Estimate your annual, bi-annual, and quarterly tax payable.",
				"url": "https://yourdomain.com/",
				"image": "https://yourdomain.com/og-image.jpg",
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