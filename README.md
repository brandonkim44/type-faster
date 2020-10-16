# Type Faster

Type Faster is a simple JavaScript game that allows you to:
1. Test your typing speed
2. Practice writing like a journalist
3. Learn about a cool new topic of your choice

* **Stack/Technologies/API**: HTML5/CSS3, JavaScript, Webpack, Netlify Serverless Lambda Functions, Gnews API, Article Data Extractor API (lexper API)

## Table of Content

### [Article Fetching](#article-fetching)
### [Hiding API_Keys](#hiding-api-keys)

## 1. Article Fetching
After you enter a word (a "topic") you'd like to learn about and click submit, a splash modal is made visible and covers the entire page. The value of the input field is fed into the body of an asynchronous request to a Google News API. The GNews API will return a collection of various articles related to the word from the past couple weeks, and one of the articles is selected at random. Because free news APIs don't allow for free access to the full text of articles, I then fed the returned data of the promise (the randomly selected article) and fed the URL of the article as a parameter into the body of another asynchronous request to an Article Data Extractor API (lexper API), which then extracts the text body from the article. 

Once the second promise is resolved and successful, the splash modal is turned off and the game begins. There is a handleError function that checks to see if any promises resolve as errors, at which point, an alert is made that the API request failed and the you can retry.

## 2. Hiding API Keys
I attempted to hide the API keys with various environment variables and github secret keys for the APIs used in this project, however, they would reappear in the raw "index.js" file after webpack bundled up all of the files and dependencies

After some digging, I realized that API keys are impossible to hide on the client-side, and that they will appear in the chrome dev tools when you look at the requests made in the networks tab. Many articles suggested setting up a back-end server to make the fetch requests and then send the returned data to the front-end; however, I wanted to avoid setting up an entire back-end server for such a small project.

I finally discovered Netlify, where you can deploy static sites and allows you to invoke a **netlify function**, which is a function that is hosted on their cloud. This netlify function then makes the API requests and hides the API keys with their environment variables, and then returns the data from the cloud back to the client. This allows for a serverless static site and hidden API keys.

## Features I'd like to add or improve
* Removing head-liners or date/time information from the body of the text that a user must type out
* Escaping special characters that a user might come across in an article
