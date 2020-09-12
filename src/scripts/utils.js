import { newsAPI_key, articleExtractorAPI_key } from '../../config';
import Game from './game';

//async
export function loadText(topic, selectedWPM) {

    document.querySelector('.hidden-splash-bg').setAttribute('class', 'splash-bg');

    let lastWeeksDate = getLastWeeksDate();

    let url = 'http://newsapi.org/v2/everything?' +
    `q=${topic}&` +
    `from=${lastWeeksDate}&` +
    'language=en&' +
    'sortBy=popularity&' +
    `apiKey=${newsAPI_key}`;
    
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(lastWeeksDate);
            const res = JSON.parse(xhttp.response);
            const numOfArticles = res.articles.length - 1;
            const randomArticleNum = Math.floor((Math.random() * numOfArticles) + 1);
            const article = res.articles[randomArticleNum];
            const contentURL = article.url;
            const author = article.author;
            const title = article.title;
            document.querySelector('.author').innerText = author;
            document.querySelector('.title').innerText = title;

            const reqURL = `https://extractorapi.com/api/v1/extractor/?apikey=${articleExtractorAPI_key}&url=${contentURL}`

            const xhttpContentReq = new XMLHttpRequest();

            xhttpContentReq.open('GET', reqURL, true);
            debugger;
            xhttpContentReq.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    debugger;
                    const contentRes = JSON.parse(xhttpContentReq.response).text;
                    document.querySelector('.start-modal').style.display = 'none';
                    const game = new Game(contentRes, selectedWPM);
                    
                } else if (this.status !== 200) {
                    alert('API Request failed. Please try again!');
                }
                if (document.querySelector('.splash-bg')) { document.querySelector('.splash-bg').setAttribute('class', 'hidden-splash-bg'); };
            } 
            xhttpContentReq.send();
        } else if (this.status !== 200) {
            alert('API Request failed. Please try again!');
            if (document.querySelector('.splash-bg')) { document.querySelector('.splash-bg').setAttribute('class', 'hidden-splash-bg'); };        }
    }
    xhttp.send();
};

//hoisting

function getLastWeeksDate () {
    const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

    const dd = lastWeek.getDate();
    const mm = lastWeek.getMonth()+1;
    const year = lastWeek.getFullYear().toString();
    let day = "";
    let month = "";
    if (dd < 10) { day = '0' + dd.toString();} else { day = dd.toString();};
    if (mm < 10) { month = '0' + mm.toString();} else { month = mm.toString();};
    let lastWeeksDate = "";
    lastWeeksDate = year+'-'+month+'-'+day;
    return lastWeeksDate;
}

