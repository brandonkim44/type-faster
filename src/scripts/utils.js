import { newsAPI_key, articleExtractorAPI_key } from '../../config';
import Text from './text';
import Timer from './timer';

//async
export function loadText(topic, modalDiv, selectedWPM) {

    document.querySelector('.hidden-splash-bg').setAttribute('class', 'splash-bg');

    let url = 'http://newsapi.org/v2/top-headlines?' +
    `qInTitle=${topic}&` +
    `country=us&` +
    `from=2020-08-10&` +
    'language=en&' +
    'sortBy=relevancy&' +
    `apiKey=${newsAPI_key}`;
    
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            
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

                    //create a new menu modal and pass in text AND timer
                    // OR pass into Game class, the text and timer and menu modal... 
                    const text = new Text(contentRes);
                    modalDiv.style.display = 'none';
                    text.displayDiv();
                    text.moveDiv(selectedWPM);
                    // timer();
                    const timer = new Timer();
                    timer.startTimer();
                } else if (this.status !== 200) {
                    alert('API Request failed. Please try again!');
                }
                if (document.querySelector('.splash-bg')) { document.querySelector('.splash-bg').setAttribute('class', 'hidden-splash-bg'); };
            } 
            xhttpContentReq.send();
        } else if (this.status !== 200) {
            alert('API Request failed. Please try again!');
            document.querySelector('.splash-bg').setAttribute('class', 'hidden-splash-bg');
        }
    }
    xhttp.send();
};

//     //If we want news articles from today

//     // const today = new Date();
//     // const dd = today.getDate();
//     // const mm = today.getMonth()+1;
//     // const year = today.getFullYear().toString();
//     // let day = "";
//     // let month = "";
//     // if (dd < 10) { day = '0' + dd.toString();} else { day = dd.toString();};
//     // if (mm < 10) { month = '0' + mm.toString();} else { month = mm.toString();};
//     // let todaysDate = "";
//     // todaysDate = year+'-'+month+'-'+day;
