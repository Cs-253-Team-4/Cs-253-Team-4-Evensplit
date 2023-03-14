const mongoose = require('mongoose')

const Calendar = new mongoose.Schema(
	{
		email : {type: String, required: true, unique: true},
		personal_events : {type: Array, "default":[]},
        selected_tags : {type: Array, "default":[]},
        },
	{ collection: 'calendar-data' }
)

const model = mongoose.model('CalendarData', Calendar)

module.exports = model