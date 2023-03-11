const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    memberEmails:{
        type: Array,
        required: true
    },
    requests:{
        type: Array
    }
}, {timestamps: true});

const Group = mongoose.model('Group',groupSchema);

module.exports = Group;

