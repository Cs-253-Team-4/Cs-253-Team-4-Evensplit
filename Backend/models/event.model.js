const mongoose = require('mongoose')

const Event = new mongoose.Schema(
	{
		name: {type: String, "default": "Event"},
        start_time: {type: Date, required: true},
        end_time: {type: Date},
        description: {type: String},
        relevant_tags: {type: Array, "default": []},
	},
	{ collection: 'event-data' }
)

const model = mongoose.model('EventData', Event)

module.exports = model