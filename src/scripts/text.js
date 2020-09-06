import { FAMOUS_TEXTS, content } from './utils';

class Text {
    constructor() {
        this.currentDiv = document.getElementById('current');
        //
        // debugger;
        this.id = null;
        debugger;
        this.text = document.getElementById('current').textContent;
        debugger;
        this.chars = this.text.split("");
        this._currentDiv = this._currentDiv.bind(this);
        this.displayDiv = this.displayDiv.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.moveDiv = this.moveDiv.bind(this);
        // this.listenForLose = this.listenForLose.bind(this);
        // this.onRefresh = this.onRefresh.bind(this);
        this.stopDiv = this.stopDiv.bind(this);
        // this.onRefresh();
    }

    randomTextGenerator() {

    }

    _currentDiv() {
        this.charsSpans = this.chars.map(char => {
            const span = document.createElement('span');
            span.setAttribute('class', 'untyped');
            span.innerText = char;
            this.currentDiv.appendChild(span);
            return span;
        });
    }

    checkWord() {
        let currentIndex = 0;
        let errorCount = 0;
        document.addEventListener('keydown', e => {

            e.preventDefault();
            let currentCharacterSpan = this.charsSpans[currentIndex];
            let currentCharacter = currentCharacterSpan.innerText;
            const untypedSpans = document.getElementsByClassName('untyped');
            const correctSpans = document.getElementsByClassName('correct');
            const incorrectSpans = document.getElementsByClassName('incorrect');
            const lastCorrectElement = correctSpans.length - 1;
            const lastIncorrectElement = incorrectSpans.length - 1;

            //currentCharacter = checkCharacter(currentCharacter);
                //checkCharacter will be a case switch
                // check for emdash, accent signs on e, a, i, o u, 

            if (e.key === currentCharacter || (e.key === "-" && currentCharacter === "—")) {
                // currentCharacterSpan.remove();
                debugger;
                if (currentIndex > 0) {
                    let previousCharacterSpan = this.charsSpans[currentIndex - 1];
                    if (previousCharacterSpan.className === "correct") correctSpans[lastCorrectElement].style.borderRight = "unset";
                    if (previousCharacterSpan.className === "incorrect") incorrectSpans[lastIncorrectElement].style.borderRight = "unset";
                }
                    debugger;
                    // currentCharacterSpan.style.visibility = "hidden";
                untypedSpans[1].style.borderRight = "1px solid black";
                currentCharacterSpan.setAttribute('class', 'correct');
                currentIndex++;
            } else if (e.keyCode === 8) {
                debugger;
                if (currentIndex > 0) {
                    currentCharacterSpan = this.charsSpans[currentIndex - 1];
                    currentCharacterSpan.style.borderRight = "unset";
                    if (currentIndex > 1) {
                        let previousCharacterSpan = this.charsSpans[currentIndex - 2];
                        previousCharacterSpan.style.borderRight = "1px solid black";
                    }
                    currentCharacterSpan.setAttribute('class', 'untyped');
                    currentIndex--;
                }
                debugger;
            } else if (e.shiftKey){
                return null;
            } else if (e.key !== currentCharacter) {
                debugger;
                if (currentIndex > 0) {
                    let previousCharacterSpan = this.charsSpans[currentIndex - 1];
                    if (previousCharacterSpan.className === "correct") correctSpans[lastCorrectElement].style.borderRight = "unset";
                    if (previousCharacterSpan.className === "incorrect") incorrectSpans[lastIncorrectElement].style.borderRight = "unset";
                }
                untypedSpans[1].style.borderRight = "1px solid black";
                currentCharacterSpan.setAttribute('class', 'incorrect');
                currentIndex++;
                errorCount++;
                debugger;
            }
        })
    }

    displayDiv() {
        this._currentDiv();
        this.checkWord();
    }

    moveDiv(speed) {
        let pos = -7700;
        debugger;
        const id = setInterval(frame, 40 - speed);
        this.id = id;
        const that = this;
        function frame() {
            // if (pos === 300) {
            //     clearInterval(id);
            // } else {
                pos++;
                this.currentDiv.style.bottom = pos + "px";
                // that.listenForLose();
            // }
        }
    }

    stopDiv() {
        clearInterval(this.id);
    }

    // listenForLose() {
    //     const body = document.querySelector('body');
    //     const firstIncorrectSpan = document.getElementsByClassName('incorrect')[1];

    //     const bodyRect = body.getBoundingClientRect();
    //     const firstIncorrectSpanRect = firstIncorrectSpan.getBoundingClientRect();
        
    //     window.firstIncorrectSpanRect = firstIncorrectSpanRect;
    //     window.bodyRect = bodyRect;
    
    //     debugger;
    //     if (bodyRect.top >= firstIncorrectSpanRect.top + 15) {
    //         this.stopDiv();
    //         const end = document.querySelector('.end-modal')
    //         end.style.display = "flex";
    //     }
    // }

    // calcWPM(allWords, time) {
        // Words Per Minute(WPM) is the number of characters(including spaces and punctuation) typed in 1 minute, divided by 5.

        // const grossWPM = allWords / time;
        // const errorRate = 
        // const netWPM = grossWPM - 
    // }
}

export default Text;
