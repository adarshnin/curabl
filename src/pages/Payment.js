

import {
	Row,
	Col,
	Card,
	Statistic,
	Button,
	List,
	Descriptions,
	Avatar,
	Layout,
} from "antd";
import { Divider } from 'antd';


import React, { useState } from 'react'
import logo from '../assets/images/logo.svg'
import pay_logo from '../assets/images/payment_logos.png'
const { Header, Footer, Content } = Layout;

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function Payment() {
	const [name, setName] = useState('Mehul')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_0hZp9kVsVmGcXe' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Consultation fee',
			description: 'curabl',
			image: 'http://localhost:1337/logo.png',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name,
				contact: "+919834783982",
				email: 'dev.patel@gmail.com'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (

		<div className="Payment" style={{
			// display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginLeft: 'auto',
			marginRight: 'auto',
			width: '1560px',
			overflow: 'auto'
		}}>

			<Card bordered={true} style={{
				width: "100%", height: "100%"
			}}>

				<Header style={{ padding: '10px', display: 'flex', justifyContent: 'flex-start', fontWeight: 'bolder', fontSize: "18px" }}>
					Consultation
				</Header>
				{/* </Layout> */}
				<Row>
					<Col span={11} style={{ fontWeight: '600', textAlign: "left", display: 'grid', gridRowGap: '23px', padding: "74px" }}>
						Dr. Rahul Prakash
						<br />
						<br />
						Appointment Time - 11:15 AM
						<br />
						Date - 26/01/2022
						<br />
						<br />
						Kindly join at time to avoid any delays
						<br />
					</Col>
					<Col span={2}>
						<Divider type="vertical" style={{ height: "100%", borderColor: '#b0b2b5' }} />
					</Col>
					<Col span={11}>
						<Divider style={{ fontWeight: '600' }} orientation="left"> Payment Summary</Divider>

						<div className="Summary" style={{ display: 'grid', padding: '74px', justifyContent: 'space-evenly', fontWeight: '600', gridTemplateColumns: '75% 25%', gridRowGap: '23px' }} >
							<div>Amount</div> ₹ 99
							<div>Name</div> Mr. Dev Patel
							<div>Email-id: </div> dev.patel@gmail.com
							<div>Mobile: </div> +91 9834783982
							<div>Mode of Consultation:</div> Online
						</div>
						<div className="Paybutton">
							<img style={{ marginLeft: "11%" }} width="243" height="14" src={pay_logo} alt="Logo" />
							<Button
								type="primary"
								style={{ background: "rgb(74, 112, 246)", marginLeft: "26%" }}
								onClick={displayRazorpay}
								target="_blank"
								rel="noopener noreferrer">
								Pay Now
							</Button>
						</div>
					</Col>
				</Row>
				<Footer style={{ fontWeight: '600', textAlign: 'left' }}>
					<p>Contact Us</p>
				</Footer>
				<Footer style={{ fontWeight: '300', textAlign: 'left' }}>
					Phone: 9327432847
					<p>Email: admin@curabl.me</p>
				</Footer>
			</Card>


		</div >

	)
}

export default Payment;
