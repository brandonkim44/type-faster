import Game from '../src/scripts/game';

exports.handler = async (event, context) => {

    document.querySelector('.hidden-splash-bg').setAttribute('class', 'splash-bg');
    document.querySelector('.waiting-comic').style.display = 'unset';
    let topic = event.queryStringParameters.topic;
    let selectedWPM = event.queryStringParameters.selectedWPM;
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

      fetch(url)
        .then(handleErrors)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const numOfArticles = data.articles.length;
            const randomArticleNum = Math.floor(Math.random() * numOfArticles + 1);
            const article = data.articles[randomArticleNum];
                if (article) {
                    const articleURL = article.url;
                    const lexperAPIURL = `https://lexper.p.rapidapi.com/v1.1/extract?media=1&url=${articleURL}`;
                
                    fetch(lexperAPIURL, {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "lexper.p.rapidapi.com",
                        "x-rapidapi-key": `${process.env.LEXPERAPI_KEY}`,
                    }})
                        .then(handleErrors)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            const author = data.article.author;
                            const title = data.article.title;
                            const text = data.article.text;
                            document.querySelector(".author").innerText = author;
                            document.querySelector(".title").innerText = title;
                            document.querySelector(".start-modal").style.display = "none";
                            document.querySelector(".author-header").style.display = "flex";
                            document.querySelector(".title-header").style.display = "flex";
                            document.querySelector(".author").style.display = "flex";
                            document.querySelector(".title").style.display = "flex";
                            document.querySelector(".timer").style.display = "flex";
                            document.querySelector(".menu").style.display = "flex";
                            const game = new Game(text, selectedWPM);
                            if (document.querySelector(".splash-bg")) { document.querySelector(".splash-bg").setAttribute("class", "hidden-splash-bg");}
                        })
                } else {
                    alert('Could not find an article with that word. Please try again!');
                    if (document.querySelector('.splash-bg')) { document.querySelector('.splash-bg').setAttribute('class', 'hidden-splash-bg'); }; 
                }
        });
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({ message: `Hello ${subject}` }),
    //   // // more keys you can return:
    //   // headers: { "headerName": "headerValue", ... },
    //   // isBase64Encoded: true,
    // }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}

function getLastWeeksDate() {
    const today = new Date();
        let lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        lastWeek = lastWeek.toISOString();
    return lastWeek;
};

function handleErrors(response) {
    if (!response.ok) {
        if (document.querySelector('.splash-bg')) { document.querySelector('.splash-bg').setAttribute('class', 'hidden-splash-bg'); };
        let statusMessage = response.statusText;
        alert('API Request Failed. Please try again!');
        throw Error(statusMessage);
    }
    return response;
};