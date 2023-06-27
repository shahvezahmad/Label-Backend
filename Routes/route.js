const express = require("express");

const controller = require("../Controllers/tweetController");
const createTweet = require("../Controllers/createController");

const router = express.Router();

router.post('/createtweet', createTweet.createTweet);
router.post('/labeltweet', controller.labeltweets);

module.exports = router;