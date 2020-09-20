import Game from './game';
export default class StartModal {
    constructor() {
        this.selectSpeed = this.selectSpeed.bind(this);
        this.startGame = this.startGame.bind(this);
    }
    
    selectSpeed() {
        const speedButtons = document.getElementsByClassName('speed');
        const startButton = document.querySelector('.start-button');
        //not great space complexity, O(n), and time complexity, O(n^2) , but more DRY for now
        for(let i = 0; i < speedButtons.length; i++) {
            speedButtons[i].addEventListener('click', (e) => {
                const allSpeedButtons = document.querySelectorAll('[data-wpm]');
                for (let j = 0; j < allSpeedButtons.length; j++) {
              
                    allSpeedButtons[j].setAttribute('class', 'speed');
                }
                e.currentTarget.setAttribute('class', 'selected-speed');
                startButton.dataset.selectedwpm = e.currentTarget.dataset.wpm;
            })
        }
    }

    startGame() {
        const start = document.querySelector('.start-button');
        start.addEventListener('click', (e) => {
            e.preventDefault();
            const inputFieldValue = document.getElementById('input-field').value;
            const selectedWPM = parseInt(start.dataset.selectedwpm);
            if (!Number.isInteger(selectedWPM)) {
                document.querySelector('.speed-error').style.display = 'unset';
            }
            if (inputFieldValue.length <= 1) {
                document.querySelector('.field-error').style.display = 'unset';
            }
            if (Number.isInteger(selectedWPM) && inputFieldValue.length > 1) {    
                document.querySelector('.hidden-splash-bg').setAttribute('class', 'splash-bg');
                document.querySelector('.waiting-comic').style.display = 'unset';

                fetch(`../../.netlify/functions/loadText?topic=${inputFieldValue}&selectedWPM=${selectedWPM}`, {})
                    .then((res) => res.json())
                    .then((data) => {
                        const numOfArticles = data.articles.length;
                        const randomArticleNum = Math.floor(Math.random() * numOfArticles + 1);
                        const article = data.articles[randomArticleNum]; 

                        if (article) {
                          const articleURL = article.url;
                          const lexperAPIURL = `https://lexper.p.rapidapi.com/v1.1/extract?media=1&url=${articleURL}`;
                          console.log(lexperAPIURL);
                          return fetch(`../../.netlify/functions/extractArticle?url=${encodeURIComponent(lexperAPIURL)}`, {})
                        } else {
                            if (document.querySelector('.splash-bg')) { document.querySelector('.splash-bg').setAttribute('class', 'hidden-splash-bg'); };
                            return {
                                statusCode: 500,
                                body: "API Request Failed"
                            }
                        }
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
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
                // loadText(inputFieldValue, selectedWPM);
            }
        });
    }
}
