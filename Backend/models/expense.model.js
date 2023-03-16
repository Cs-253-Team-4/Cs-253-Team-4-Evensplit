const mongoose = require('mongoose')

const Expense = new mongoose.Schema(
	{
		email : {type: String, required: true, unique: true},
		personal : {type: Array, "default":[]},
		friends : {type: Array, "default":[]},
		requests : {type: Array, "default":[]},
		groups : {type: Array, "default":[]},	//array stores group ids
	},
	{ collection: 'expense-data' }
)

const model = mongoose.model('ExpenseData', Expense)

module.exports = model
