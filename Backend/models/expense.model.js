const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		personal : {type : Array, "default":[]},
        friends : {type : Array, "default":[]},
        groups : {type : Array, "default":[]},
	},
	{ collection: 'expense-data' }
)

const model = mongoose.model('ExpenseData', Expense)

module.exports = model