const express = require("express");
const shortid = require('shortid')
const paymentmodeltemplate = require("../models/payment");

const path = require('path')

const router = express.Router();
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
	key_id: 'rzp_test_0hZp9kVsVmGcXe',
	key_secret: 'zHQZvxf6ZspYyglbsXc7l7MZ'
})

router.get('/logo.png', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/images/logo.png'))
})

router.post('/verification', (req, res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

router.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = 99
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

router.post("/savePayment", async (req, res) => {
	console.log("in savePayment slot")


	const slot = new paymentmodeltemplate({
		doctorId: req.body.doctorId,
		date: req.body.date,
		patientId: req.body.patientId,
		paymentID: req.body.paymentID,
		orderID: req.body.orderID,
		signature: req.body.signature,
		amount: req.body.amount,
		status: "paid"
	});
	// res.send("temp"); 
	console.log("donecheck");
	slot.save()
		.then(data => {
			res.json(data);
			console.log(data);
		})
		.catch(error => {
			res.json(error);
			console.log(error);
		})
	// res.sendStatus( 201);
	console.log("done");
});


router.post("/getPayments", async (req, res) => {
	try {
		if (req.body.isDoctor) {
			filter = { doctorId: req.body.doctorId }
		}
		else {
			filter = { patientId: req.body.patientId }
		}
		paymentmodeltemplate.find(filter).exec((err, data) => {
			if (err) {
				res.send("Errors");
				console.log(err);
			}
			else {
				console.log(data);
				res.send(data);
			}


		});
		// res.send("Date response got");

		// slotmodeltemplate("date")


	} catch (error) {
		// res.status(400).send(error);

		res.send(error);
	}

});

module.exports = router;