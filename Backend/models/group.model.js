const mongoose = require('mongoose')

const Group = new mongoose.Schema(
	{   
        title : {type: String, required: true},
		members : {type: Array, required: true},
		expenses: {type: Array, "default":[]},  // {email of payer, amount}
	},
    { collection: 'group-data' },
)

const model = mongoose.model('GroupData', Group)

module.exports = model
