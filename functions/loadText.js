const fetch = require('node-fetch');

exports.handler = async (event, context, callback) => {
    const pass = (body) => {callback(null, {
        statusCode: 200,
        body: JSON.stringify(body)
    })}
    let topic = event.queryStringParameters.topic;
    let lastWeeksDate = getLastWeeksDate();
    let url =
      "https://gnews.io/api/v4/search?" +
      `q=${topic}&` +
      `from=${lastWeeksDate}` +
      `lang=en&` +
      `country=us&` +
      "sortby=relevance&" +
      `token=${process.env.GNEWSAPI_KEY}`;
  try {

      let response = await fetch(url);
      let data = await response.json()
      await pass(data);
  } catch (err) {
        let error = { 
          statusCode: err.statusCode || 500, 
          body: err.toString() 
        }
        await pass(error);
  }
}

function getLastWeeksDate() {
    const today = new Date();
        let lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        lastWeek = lastWeek.toISOString();
    return lastWeek;
};