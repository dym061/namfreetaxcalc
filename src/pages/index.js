import { useState, useEffect } from 'react';
import Image from 'next/image';


export default function Home() {
	
	const [amount, setAmount] = useState(0);
	const [yearly, setYearly] = useState(0);
	const [response, setResponse] = useState(0);
	const [biannual, setBiannual] = useState(0);
	const [quarterly, setQuarterly] = useState(0);


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
			
				break;

			case yearly > 50001 && yearly < 100000:
				const yearlyTax1 = (yearly - 50000) * (18 / 100);
				const biannual1 = (yearlyTax1 / 2).toFixed(0);
				const quarterly1 = (yearlyTax1 / 4).toFixed(0);
				setResponse(`N$ ${yearlyTax1}`);
				setBiannual(`N$ ${biannual1}`);
				setQuarterly(`N$ ${quarterly1}`);
				break;

			case yearly >= 100001 && yearly <= 300000:
				const yearlyTax2 = (yearly - 100000) * (25 / 100) + 9000;
				const biannual2 = (yearlyTax2 / 2).toFixed(0);
				const quarterly2 = (yearlyTax2 / 4).toFixed(0);
				setResponse(`N$ ${yearlyTax2}`);
				setBiannual(`N$ ${biannual2}`);
				setQuarterly(`N$ ${quarterly2}`);				
				break;

			case yearly >= 300001 && yearly <= 500000:
				const yearlyTax3 = (yearly - 300000) * (28 / 100) + 59000;
				const biannual3 = (yearlyTax3 / 2).toFixed(0);	
				const quarterly3 = (yearlyTax3 / 4).toFixed(0);
				setResponse(`N$ ${yearlyTax3}`);
				setBiannual(`N$ ${biannual3}`);
				setQuarterly(`N$ ${quarterly3}`);				
				break;

			case yearly >= 500001 && yearly <= 800000:
				const yearlyTax4 = (yearly - 500000) * (30 / 100) + 115000;
				const biannual4 = (yearlyTax4 / 2).toFixed(0);
				const quarterly4 = (yearlyTax4 / 4).toFixed(0);
				setResponse(`N$ ${yearlyTax4}`);
				setBiannual(`N$ ${biannual4}`);
				setQuarterly(`N$ ${quarterly4}`);				
				break;

			case yearly >= 800001 && yearly <= 1500000:
				const yearlyTax5 = (yearly - 800000) * (32 / 100) + 205000;
				const biannual5 = (yearlyTax5 / 2).toFixed(0);
				const quarterly5 = (yearlyTax5 / 4).toFixed(0);
				setResponse(`N$ ${yearlyTax5}`);
				setBiannual(`N$ ${biannual5}`);
				setQuarterly(`N$ ${quarterly5}`);				
				break;

			case yearly >= 1500000:
				const yearlyTax6 = (yearly - 1500000) * (37 / 100) + 429000;
				const biannual6 = (yearlyTax6 / 2).toFixed(0);	
				const quarterly6 = (yearlyTax6 / 4).toFixed(0);
				setResponse(`N$ ${yearlyTax6}`);
				setBiannual(`N$ ${biannual6}`);
				setQuarterly(`N$ ${quarterly6}`);				
				break;

			default:
				setResponse('No idea');
				setBiannual('No idea');
				setQuarterly('No idea');
				break;
		}
		
	}, [yearly]);
	
	return (
		<section className="dflex mt3">
			<div className="con dflex p3 shadow1">
				<div className="mxauto">
					<div className="dflex">
					<Image width={100} height={65} src="/flag.png" alt="Namibian Flag" className="mxauto shadow1" />
					</div>
					<h1 className="txtbold h4 txtfont2 txtcenter">Namibia Free Tax Calculator</h1>
					<p className="h5 txtfont1 txtcenter">Type your Monthly Salary / Estimate:</p>
					<div className="dflex mb3">
						<input
							type="number"
							step="500"
							name="amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="border border1 bordercol1 mr1 p2 mxauto txtcenter txtfont2"
						/>
					</div>
					<div className="result-container txtfont2">
						<p className="txtcenter">Annual Salary: N$ {yearly}</p>
						<p className="txtbold txtcenter">Annual Tax Payable: {response}</p>
						<p className="txtcenter">Bi-Annual Tax Payable: {biannual}</p>
						<p className="txtcenter">Quarterly Tax Payable: {quarterly}</p>
					</div>
				</div>
			</div>
		</section>
	);
	
}