import { FAMOUS_TEXTS, content } from './utils';

class Text {
    constructor(responseText) {
        this.id = null;
        debugger;
        this.text = responseText;
        debugger;
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
        const currentDiv = document.getElementById('current');
        this.charsSpans = this.chars.map(char => {
            const span = document.createElement('span');
            span.setAttribute('class', 'untyped');
            span.innerText = char;
            currentDiv.appendChild(span);
            return span;
        });
    }

    checkWord() {
        let currentIndex = 0, correctCount = 0, uncorrectedErrorCount = 0, totalTypedCount = 0, accuracy = 0, netWPM = 0;
        
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
                if (currentCharacterSpan.dataset.incorrect) { currentCharacterSpan.removeAttribute('data-incorrect'); };
                totalTypedCount++;
                correctCount++;
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
                currentCharacterSpan.setAttribute('data-incorrect', 'true');
                totalTypedCount++;
                currentIndex++;
                debugger;
            }
            //calculate accuracy
            if (totalTypedCount !== 0) { accuracy = ((correctCount / totalTypedCount) * 100).toFixed(2);};

            //calculateWPM
            let uncorrectedChars = document.querySelectorAll('[data-incorrect]');
            if (uncorrectedChars) { uncorrectedErrorCount = document.querySelectorAll('[data-incorrect]').length; };
            let time = document.getElementById('timer').dataset.time;
            debugger;
            netWPM = Math.round(((totalTypedCount / 5) - uncorrectedErrorCount) / parseFloat(time));
            if (netWPM < 0) { netWPM = 0; };
            debugger;
            document.getElementById('wpm').innerText = netWPM.toString();
        })
    }

    displayDiv() {
        this._currentDiv();
        this.checkWord();
    }

    moveDiv(selectedWPM) {
        let pos = 0;
        debugger;
        const id = setInterval(frame, selectedWPM);
        this.id = id;
        let that = this;
        function frame() {
            // if (pos === 300) {
            //     clearInterval(id);
            // } else {
                pos = pos + 0.10;
                const currentDiv = document.getElementById('current');
                currentDiv.style.bottom = pos + "%";
                that.listenForLose();
            // }
        }
    }

    stopDiv() {
        clearInterval(this.id);
    }

    listenForLose() {
        const incorrectSpans = document.getElementsByClassName('incorrect');
        const firstUntypedSpan = document.getElementsByClassName('untyped')[1];
        let firstIncorrectSpanRect = null;

        if (incorrectSpans.length > 0) {
            let firstIncorrectSpan = incorrectSpans[0];
            firstIncorrectSpanRect = firstIncorrectSpan.getBoundingClientRect().top + 10;
        }
        const firstUntypedSpanRect = firstUntypedSpan.getBoundingClientRect().top + 10;

        if (firstIncorrectSpanRect < 0 || firstUntypedSpanRect <= 0) {
            this.stopDiv();
            const end = document.querySelector('.end-modal')
            end.style.display = "flex";
        }
    }
    // calcWPM(allWords, time) {
        // Words Per Minute(WPM) is the number of characters(including spaces and punctuation) typed in 1 minute, divided by 5.

        // const grossWPM = allWords / time;
        // const errorRate = 
        // const netWPM = [(allTypedEntries/5) - uncorrectedErrors]/time(min)
    // }
}

export default Text;
