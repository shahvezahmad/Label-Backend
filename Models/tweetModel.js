const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({

	handle: String,
    body: {
        type: String,
        required: true,
	},
    label: {
        type: String,
        default: ''
    },
    processed: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('Tweet', tweetSchema);