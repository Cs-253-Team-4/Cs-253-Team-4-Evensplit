const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: {type: Boolean, required: true},
		wrongAttempts: {type: Number, required: true}
	},
	{collection: 'user-data', timestamps: true}
)

const model = mongoose.model('UserData', User)

module.exports = model
