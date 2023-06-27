const Tweet = require("../Models/tweetModel");

exports.createTweet = async (req,res) =>{

    try{
        const { handle, body } = req.body;

        const newTweet = new Tweet({
            handle,
            body
        })

        await newTweet.save();

        res.json({
            tweet: newTweet,
        })

    } catch(error){
        res.json({
            error: 'error while creating a new tweet'
        });
    }
}