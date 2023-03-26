import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';

export default function Home() {
	
	const [amount, setAmount] = useState(0);
	const [yearly, setYearly] = useState(0);
	const [response, setResponse] = useState(0);
	const [biannual, setBiannual] = useState(0);
	const [quarterly, setQuarterly] = useState(0);
	const [monthly, setMonthly] = useState(0);


	useEffect(() => {
		const amountNum = parseFloat(amount);

		if (amountNum > 0 && amountNum !== '') {
			setYearly(amountNum * 12)
		}
		else
			setYearly(0)
	}, [amount]);

	useEffect(() => {
		switch (true) {
			case yearly <= 50000:
				setResponse('Not taxable');
				setBiannual('Not taxable');
				setQuarterly('Not taxable');
				setMonthly('Not taxable');
			
				break;

			case yearly > 50001 && yearly < 100000:
				const yearlyTax1 = (yearly - 50000) * (18 / 100);
				const biannual1 = (yearlyTax1 / 2).toFixed(0);
				const quarterly1 = (yearlyTax1 / 4).toFixed(0);
				const monthtly1 = (yearlyTax1 / 12).toFixed(0);
				setResponse(`N$ ${yearlyTax1}`);
				setBiannual(`N$ ${biannual1}`);
				setQuarterly(`N$ ${quarterly1}`);
				setMonthly(`N$ ${monthtly1}`);
				break;

			case yearly >= 100001 && yearly <= 300000:
				const yearlyTax2 = (yearly - 100000) * (25 / 100) + 9000;
				const biannual2 = (yearlyTax2 / 2).toFixed(0);
				const quarterly2 = (yearlyTax2 / 4).toFixed(0);
				const monthtly2 = (yearlyTax2 / 12).toFixed(0);
				setResponse(`N$ ${yearlyTax2}`);
				setBiannual(`N$ ${biannual2}`);
				setQuarterly(`N$ ${quarterly2}`);
				setMonthly(`N$ ${monthtly2}`);
				break;

			case yearly >= 300001 && yearly <= 500000:
				const yearlyTax3 = (yearly - 300000) * (28 / 100) + 59000;
				const biannual3 = (yearlyTax3 / 2).toFixed(0);	
				const quarterly3 = (yearlyTax3 / 4).toFixed(0);
				const monthtly3 = (yearlyTax3 / 12).toFixed(0);
				setResponse(`N$ ${yearlyTax3}`);
				setBiannual(`N$ ${biannual3}`);
				setQuarterly(`N$ ${quarterly3}`);	
				setMonthly(`N$ ${monthtly3}`);				
				break;

			case yearly >= 500001 && yearly <= 800000:
				const yearlyTax4 = (yearly - 500000) * (30 / 100) + 115000;
				const biannual4 = (yearlyTax4 / 2).toFixed(0);
				const quarterly4 = (yearlyTax4 / 4).toFixed(0);
				const monthtly4 = (yearlyTax4 / 12).toFixed(0);
				setResponse(`N$ ${yearlyTax4}`);
				setBiannual(`N$ ${biannual4}`);
				setQuarterly(`N$ ${quarterly4}`);
				setMonthly(`N$ ${monthtly4}`);				
				break;

			case yearly >= 800001 && yearly <= 1500000:
				const yearlyTax5 = (yearly - 800000) * (32 / 100) + 205000;
				const biannual5 = (yearlyTax5 / 2).toFixed(0);
				const quarterly5 = (yearlyTax5 / 4).toFixed(0);
				const monthtly5 = (yearlyTax5 / 12).toFixed(0);
				setResponse(`N$ ${yearlyTax5}`);
				setBiannual(`N$ ${biannual5}`);
				setQuarterly(`N$ ${quarterly5}`);		
				setMonthly(`N$ ${monthtly5}`);				
				break;

			case yearly >= 1500000:
				const yearlyTax6 = (yearly - 1500000) * (37 / 100) + 429000;
				const biannual6 = (yearlyTax6 / 2).toFixed(0);	
				const quarterly6 = (yearlyTax6 / 4).toFixed(0);
				const monthtly6 = (yearlyTax6 / 12).toFixed(0);
				setResponse(`N$ ${yearlyTax6}`);
				setBiannual(`N$ ${biannual6}`);
				setQuarterly(`N$ ${quarterly6}`);	
				setMonthly(`N$ ${monthtly6}`);
				break;

			default:
				setResponse('No idea');
				setBiannual('No idea');
				setQuarterly('No idea');
				setMonthly('No idea');
				break;
		}
		
	}, [yearly]);
	
    const handleSliderChange = (event) => {
      setAmount(event.target.value);
    };	
	
	const handleReset = () => {
		setAmount(0);
		setYearly(0);
		setResponse('Not taxable');
		setBiannual('Not taxable');
		setQuarterly('Not taxable');
		setMonthly('Not taxable');
	};		
	
	const handleSliderWheel = (event) => {
		
	  const currentValue = parseInt(amount);
	  const newValue = currentValue + (event.deltaY > 0 ? -1000 : 1000);

	  if (newValue >= 0 && newValue <= 250000) {
		setAmount(newValue.toString());
	  }
	};

	useEffect(() => {
	  const handleWheel = (event) => {
		if (event.target.type === 'range') {
		  event.preventDefault();
		}
	  };

	  document.body.addEventListener('wheel', handleWheel, { passive: false });

	  return () => {
		document.body.removeEventListener('wheel', handleWheel);
	  };
	}, []);	
		
	const shareUrl = "https://namfreetaxcalc.vercel.app"
	
	const today = new Date()
	const year = today.getFullYear();	
	
	return (
		<>
			<section className="dflex">
				<div className="con dflex shadow1 ">
					<div className="mxauto mb3 p2">
						<div className="dflex p2">
							<Image width={100} height={65} src="/flag.png" alt="Namibian Flag" className="mxauto shadow1" />
						</div>
						<h1 className="txtbold h4 txtfont2 txtcenter">Namibia Free Tax Calculator</h1>
						<p className="h5 txtfont1 txtcenter">Type your Monthly Salary / Estimate:</p>
						<div className="dflex">
							<input
								type="number"
								step="500"
								name="amount"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								
								className="border border1 bordercol1 mr1 p2 mxauto txtcenter txtfont2"
							/>
						</div>
						<div className="dflex">
							<input
								type="range"
								min="0"
								max="250000"
								step="50"
								value={amount}
								onChange={handleSliderChange}
								onWheel={handleSliderWheel}
								className="border border1 bordercol1 mr1 p2 mxauto txtcenter txtfont2"
							/>
						</div>					
						<div className="result-container txtfont2">
							<p className="txtcenter">Annual Salary: N$ {yearly}</p>
							<p className="txtbold txtcenter">Annual Tax Payable: {response}</p>
							<p className="txtcenter">Bi-Annual Tax Payable: {biannual}</p>
							<p className="txtcenter">Quarterly Tax Payable: {quarterly}</p>
							<p className="txtcenter">Monthly: {monthly}</p>
						</div>
						<div className="dflex pb3">
							<Image 
								width={35} 
								height={35} 
								src="/rotate-right-solid.png" 
								alt="Reset Button" 
								className="mxauto mt3 fillblue" 
								onClick={handleReset}
							/>
						</div>
						<hr/>
						<div className="txtcenter txtfont2 p3">
							<p className="pb3 ">Introducing the Namibia Free Tax Calculator! Easily and instantly calculate your annual tax payable based on your monthly salary/estimate. This free-to-use user-friendly calculator is designed to help you estimate your taxes and make informed decisions about your finances. Simply input your monthly salary/estimate and let the calculator do the rest. Our easy-to-read results will show your annual salary and tax payable, as well as bi-annual, quarterly, and monthly tax payable amounts. Reset the calculator at any time to start over, and use the slider to adjust your monthly salary/estimate. This tool is perfect for anyone who wants to estimate their taxes quickly and accurately. Try it out today and take control of your finances!</p>
							<p className="txtbold pb3">The Namibia Free Tax Calculator uses the following information to provide its results:</p>
							<p>N$ 0 - 50 000 : Not taxable</p>
							<p>N$ 50 001 - 100 000 : 18% for each N$ above 50 000</p>
							<p>N$ 100 001 - 300 000 : N$ 9 000 + 25% for each N$ above N$ 100 000</p>
							<p>N$ 300 001 - 500 000 : N$ 59 000 + 28% for each N$ above N$ 300 000</p>
							<p>N$ 500 001 - 800 000 : N$ 115 000 + 30% for each N$ above N$ 500 000</p>
							<p>N$ 800 001 - 1 500 000 : N$ 205 000 + 32% for each N$ above N$ 800 000</p>
							<p>Above N$ 1 500 000 : N$ 429 000 + 37% for each N$ above N$ 1 500 000</p>
						</div>
						
					</div>
				</div>
			</section>
			<div className="con2">
				<footer className="con footer">
					<div className="dflex">
						<div className=" txtcenter mxauto">
						  <p className=" txtbold txtfont2">Share</p>
						  <FacebookShareButton
							url={shareUrl} >
							<FacebookIcon size={32} round />
						  </FacebookShareButton>
						  <PinterestShareButton
							url={shareUrl} >
							<PinterestIcon size={32} round />
						  </PinterestShareButton>
						  <RedditShareButton
							url={shareUrl} >
							<RedditIcon size={32} round />
						  </RedditShareButton>
						  <WhatsappShareButton
							url={shareUrl} >
							<WhatsappIcon size={32} round />
						  </WhatsappShareButton>
						  <LinkedinShareButton
							url={shareUrl} >
							<LinkedinIcon size={32} round />
						  </LinkedinShareButton>
						</div>
					</div>
					<div className="txtcenter txtfont2">
					<span className="txtfont1">&#169; {year} <a href="https://www.facebook.com/ciestomedia" target="_blank" >Ciesto Media &amp; Design</a>  </span>
					</div>
				</footer>
			</div>
		</>
	);
	
}

