const mongoose = require('mongoose')

const Global = new mongoose.Schema(
	{       
		eventID: {type: String, required: true} , 
        },
	{ collection: 'global-data' }
)

const model = mongoose.model('GlobalData', Global)

module.exports = model