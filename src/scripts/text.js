import { FAMOUS_TEXTS } from './utils';

class Text {
    constructor() {
        this.currentDiv = document.getElementById('current');
        //use JSTOR api later
        // debugger;
        this.id = null;
        this.text = FAMOUS_TEXTS[0];
        this.chars = this.text.split("");
        this._currentDiv = this._currentDiv.bind(this);
        this.displayDiv = this.displayDiv.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.moveDiv = this.moveDiv.bind(this);
        this.listenForLose = this.listenForLose.bind(this);
        // this.onRefresh = this.onRefresh.bind(this);
        this.stopDiv = this.stopDiv.bind(this);
        // this.onRefresh();
    }

    randomTextGenerator() {

    }

    _currentDiv() {
        this.charsSpans = this.chars.map(char => {
            const span = document.createElement('span');
            span.setAttribute('class', 'incorrect');
            span.innerText = char;
            this.currentDiv.appendChild(span);
            return span;
        });
    }

    checkWord() {
        let currentIndex = 0;
        document.addEventListener('keydown', e => {
            e.preventDefault();
            let currentCharacterSpan = this.charsSpans[currentIndex];
            let currentCharacter = currentCharacterSpan.innerText;
            if (e.key === currentCharacter) {
                // currentCharacterSpan.remove();
                const incorrectSpans = document.getElementsByClassName('incorrect');
                const correctSpans = document.getElementsByClassName('correct');
                debugger;
                if (correctSpans.length > 0) correctSpans[correctSpans.length-1].style.borderRight = "unset";
                debugger;
                incorrectSpans[1].style.borderRight = "1px solid black";
                currentCharacterSpan.setAttribute('class', 'correct');
                // currentCharacterSpan.style.visibility = "hidden";
                currentIndex++;
            }
        })
    }

    displayDiv() {
        this._currentDiv();
        this.checkWord();
    }

    moveDiv(speed) {
        let pos = -2020;
        const id = setInterval(frame, 45);
        this.id = id;
        const that = this;
        function frame() {
            if (pos === 300) {
                clearInterval(id);
            } else {
                pos++;
                this.currentDiv.style.bottom = pos + "px";
                that.listenForLose();
            }
        }
    }

    stopDiv() {
        clearInterval(this.id);
    }

    listenForLose() {
        const body = document.querySelector('body');
        const firstIncorrectSpan = document.getElementsByClassName('incorrect')[0];

        const bodyRect = body.getBoundingClientRect();
        const firstIncorrectSpanRect = firstIncorrectSpan.getBoundingClientRect();

        if (bodyRect.top >= firstIncorrectSpanRect.top + 15) {
            this.stopDiv();
            const end = document.querySelector('.end-modal')
            end.style.display = "flex";
        }
    }

    // calcWPM(allWords, time) {
        // Words Per Minute(WPM) is the number of characters(including spaces and punctuation) typed in 1 minute, divided by 5.

        // const grossWPM = allWords / time;
        // const errorRate = 
        // const netWPM = grossWPM - 
    // }
}

export default Text;
