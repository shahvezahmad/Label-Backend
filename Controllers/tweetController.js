const Tweet = require("../Models/tweetModel");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const config = new Configuration({
    apiKey: process.env.OPENAI_KEY,
})

const openai = new OpenAIApi(config);

const runPrompt = async (prompt) =>{

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 2048,
        temperature: 0.2,
        n: 1,
        stop: ["\n"]
    })

    return response;
}


async function calltoChatGPT(tweet,newLabels){
    //implementation
    const prompt = `label the tweet: \n ${tweet} \n from the \n ${newLabels} 
                    \n if no label is related with the tweet, generate a label for the tweet`;
  
    const response = await runPrompt(prompt);

    const output = response.choices[0].text.trim();
    
    return output;
}

const labelArray = [ 'ai', 'robotics','thoughts','research', 'promotions', 'imagination', 'artificial-intelligence',
                    'NLP', 'virtual-reality', 'books', 'LLM', 'falcon-40B', 'meetings', 'GPT-4', 'machine-learning',
                    'technology','openAI','GPT-3.5', 'podcast', 'random', 'LLaMa', 'open-source' ];


function filterLabels(labelArray){
    
    const removeLabels = ['virtual','promotions','imagination','podcast','random','books','thoughts'];
        const newArray = labelArray.filter( (label) =>{
            !removeLabels.includes(label);
    })
    
    return newArray;
}

                        
exports.labeltweets = async (req,res) => {
    try{
        const newTweets = await Tweet.find({processed: false});

        const newLabels = filterLabels(labelArray);

        for(let i=0; i<newTweets.length;i++){
            const tweet = newTweets[i];

            const newLabel = await calltoChatGPT(tweet.body, newLabels);

            await Tweet.updateOne(
                {_id: tweet._id},
                { $set: {label: newLabel, processed: true}}
            );
        }

        res.status(200).json(
            {message: 'tweet labelled sucessfully'}
        );

    } catch(error){
        console.log("an error occured while labelling tweet");
        res.status(400).json({error: 'error'});
    }
}