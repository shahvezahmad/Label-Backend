# Label-Backend
Tech Stack - Javascript, Node, Mongo, Express, Openai Api

The above created app is a tweet labeling tool using OpenAI's GPT language model. 

It provides an API route for labeling tweets based on predefined labels(you can use your own labels), if no tweet matches the predefined labels, we use OpenAi to generate a label for that tweet based on the context.

The app retrieves new, unprocessed tweets from a MongoDB database and uses the OpenAI API to generate labels for each tweet.

Create .env file:
Define PORT, DATABASE_URL, & OPENAI_KEY.

