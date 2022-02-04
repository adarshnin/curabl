import {
	Row,
	Col,
	Card,
	Statistic,
	Button,
	List,
	Descriptions,
	Avatar,
	Result,
	Layout,
	Input
} from "antd";
import { Divider } from 'antd';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import React, { useState } from 'react'
import logo from '../assets/images/logo.svg'
import pay_logo from '../assets/images/payment_logos.png'
import { authenticationService } from '../services/authservice';


const { Countdown } = Statistic;
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
	const [pay_status, changePaymentStatus] = useState("");

	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("+91");

	const location = useLocation()
	const { from, data_slot } = location.state;
	console.log("@@@@@@@@", from, data_slot);
	const userid = authenticationService.currentUserValue?.id;

	// @@@@@@@@@@@@ fetch amount from db
	const amount = data_slot.fees;
	console.log("amount --- ", amount);
	const payment_data = [
		{
			title: "Amount",
			value: "₹ " + amount,
		},
		{
			title: "Name",
			value: authenticationService.currentUserValue?.username + " " + authenticationService.currentUserValue?.middleName + " " + authenticationService.currentUserValue?.lastName,
		},
		{
			title: "Mode of Consultation",
			value: "Online",
		},
		{
			title: "Mode of Payment",
			value: "RazorPay",
		},
		{
			title: "Payment ID",
			value: pay_status,
		},
	];
	const data = [
		{
			title: "Amount",
			value: "₹ " + amount,
		},
		{
			title: "Name",
			value: authenticationService.currentUserValue?.username + " " + authenticationService.currentUserValue?.middleName + " " + authenticationService.currentUserValue?.lastName,
		},
		{
			title: "Email-id",
			value: <Input value={email} placeholder='Enter your email'
				onChange={(value) => {
					console.log("email = ", value["nativeEvent"]["data"], email)
					if (value["nativeEvent"]["data"] == null) {
						var temp = email;
						temp = temp.slice(0, -1);
						setEmail(temp);
					}
					else
						setEmail(email + value["nativeEvent"]["data"]);
				}} />,
		},
		{
			title: "Mobile",
			value: <Input value={phone} placeholder='Enter your mobile'
				onChange={(value) => {
					console.log("phone = ", value["nativeEvent"]["data"], phone)
					if (value["nativeEvent"]["data"] == null) {
						var temp = phone;
						temp = temp.slice(0, -1);
						setPhone(temp);
					}
					else
						setPhone(phone + value["nativeEvent"]["data"]);
				}}
			/>,
		},
		{
			title: "Mode of Consultation",
			value: "Online",
		},
	];
	const data_appointment = [
		{
			title: "Doctor",
			value: data_slot.doctorName,
		},
		{
			title: "Appointment Time",
			value: data_slot.timeslot,
		},
		{
			title: "Date",
			value: data_slot.date,
		},
	];
	const payNowContent = (<Card
		bordered={false}
		className="header-solid h-full ant-invoice-card"
		title={[<h6 className="font-semibold m-0">Pay</h6>]}
		extra={[
			<Countdown title="Timer"
				value={Date.now() + 10 * 30000}
				onFinish={() => alert("Payment timeout")}
			/>
		]}
	>
		<List
			itemLayout="horizontal"
			className="invoice-list"
			dataSource={data}
			renderItem={(item) => (
				<List.Item>
					<List.Item.Meta style={{ marginLeft: '10%' }}
						title={item.title}
					/>
					<div className="amount" style={{ marginRight: '13%' }}>{item.value}</div>
				</List.Item>
			)}
		/>
		<p></p>

		<List
			itemLayout="horizontal"
			className="invoice-list"
		>

			<List.Item>
				<List.Item.Meta
					title={<img style={{}} width="350" height="20" src={pay_logo} alt="Logo" />
					}
				/>
				<div className="amount">
					{
						<Button
							type="primary"
							style={{ background: "rgb(74, 112, 246)", }}
							onClick={displayRazorpay}
							target="_blank"
							rel="noopener noreferrer">
							Pay Now
						</Button>
					}
				</div>
			</List.Item>

		</List>


		<Footer style={{ fontWeight: '600', textAlign: 'left' }}>
			<p></p>
			Contact Us
		</Footer>
		<Footer style={{ fontWeight: '300', textAlign: 'left' }}>
			Phone: 9327432847
			<p>Email: admin@curabl.me</p>
		</Footer>
	</Card>
	);
	const paySuccessContent = (<Card
		bordered={false}
		className="header-solid h-full ant-invoice-card"
		title={[<h6 className="font-semibold m-0">Payment Summary</h6>]}
	>
		<List
			itemLayout="horizontal"
			className="invoice-list"
			dataSource={payment_data}
			renderItem={(item) => (
				<List.Item>
					<List.Item.Meta style={{ marginLeft: '10%' }}
						title={item.title}
					/>
					<div className="amount" style={{ marginRight: '13%' }}>{item.value}</div>
				</List.Item>
			)}
		/>
		<Result
			status="success"
			title="Payment Successful"
		// subTitle=""
		// extra={[
		// ]}
		/>

	</Card>
	);
	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:9000/payment/razorpay', {
			method: 'POST', headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}, body: JSON.stringify({ amount: amount })
		}).then((t) =>
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
			image: 'http://localhost:9000/payment/logo.png',
			handler: async function (response) {
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)
				changePaymentStatus(response.razorpay_payment_id);

				// Send payment details to backend
				var res = "", res1 = "";
				try {
					res = await axios.post(`http://localhost:9000/bookSlot`, {
						date: data_slot.date,
						doctorId: data_slot.doctorID,
						patientId: data_slot.patientID,
						userid: userid,
						timeslot: data_slot.timeslot,
						paymentID: response.razorpay_payment_id,
						orderID: response.razorpay_order_id,
						signature: response.razorpay_signature,
					});
				} catch (err) {
					console.error(err);
				}
				if (res?.data) {
					console.log(res.data);
					try {
						res1 = await axios.post(`http://localhost:9000/myappointments/newAppointment`, {
							date: data_slot.date,
							slottime: data_slot.timeslot,
							doctorId: data_slot.doctorID,
							patientId: data_slot.patientID,
							patientName: authenticationService.currentUserValue?.username + " " + authenticationService.currentUserValue?.middleName + " " + authenticationService.currentUserValue?.lastName,
							doctorName: data_slot.doctorName,

						});
					} catch (err) {
						console.error(err);
					}
					if (res1?.data) {
						console.log(res1.data);
					}
				}

				// Save payments
				var res2 = ""
				try {
					res2 = await axios.post(`http://localhost:9000/payment/savePayment`, {
						date: data_slot.date,
						doctorId: data_slot.doctorID,
						patientId: data_slot.patientID,
						paymentID: response.razorpay_payment_id,
						orderID: response.razorpay_order_id,
						signature: response.razorpay_signature,
						patientName: authenticationService.currentUserValue?.username + " " + authenticationService.currentUserValue?.middleName + " " + authenticationService.currentUserValue?.lastName,
						doctorName: data_slot.doctorName,
						amount: amount
					});
				} catch (err) {
					console.error(err);
				}
				if (res2?.data)
					console.log(res2.data);
			},
			prefill: {
				name: authenticationService.currentUserValue?.username + " " + authenticationService.currentUserValue?.middleName + " " + authenticationService.currentUserValue?.lastName,
				contact: phone,
				email: email
			},
			theme: {
				"color": "#086cfc"
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	let payment_content;

	if (pay_status == "") {
		payment_content = payNowContent;
	}
	else {
		payment_content = paySuccessContent;
	}

	return (
		<div className="Payment">
			<Row gutter={[24, 0]}>
				<Col span={24} md={8} className="mb-24">
					<Card
						bordered={false}
						className="header-solid h-full ant-invoice-card"
						title={[<h6 className="font-semibold m-0">Appointment</h6>]}

					>
						<List
							itemLayout="horizontal"
							className="invoice-list"
							dataSource={data_appointment}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta style={{ marginLeft: '10%' }}
										title={item.title}
									/>
									<div className="amount" style={{ marginRight: '13%' }}>{item.value}</div>
								</List.Item>
							)}
						/>
						<p></p>
						{/* <Footer style={{ fontWeight: '400', textAlign: 'left', marginTop: "48%"}}> */}
						<Footer style={{ fontWeight: '400', textAlign: 'left', position: 'absolute', bottom: 0 }}>
							* Kindly join at time to avoid any delays
						</Footer>


					</Card>
				</Col>
				<Col span={24} md={8} className="mb-24">

					{payment_content}

				</Col>
			</Row>
		</div>


	)
}

export default Payment;
