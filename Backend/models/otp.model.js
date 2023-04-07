const mongoose = require('mongoose')

const OTP = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		OTP: { type: String, required: true }
	},
	{collection: 'otp-data', timestamps: true}
)

const model = mongoose.model('OtpData', OTP)

module.exports = model
