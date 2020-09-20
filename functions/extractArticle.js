const fetch = require("node-fetch");

exports.handler = async (event, context, callback) => {
  const pass = (body) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  };

  const lexperAPIURL = event.queryStringParameters.url;

  try {
    let response = await fetch(lexperAPIURL, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "lexper.p.rapidapi.com",
            "x-rapidapi-key": `${process.env.LEXPERAPI_KEY}`,
        }
    });
    let data = await response.json();
    await pass(data);
  } catch (err) {
    let error = {
      statusCode: err.statusCode || 500,
      body: err.toString(),
    };
    await pass(error);
  }
};