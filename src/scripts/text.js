class Text {
    constructor(responseText, timer) {
        this.timer = timer;
        this.moveDivInterval = null;
        this.pos = 0;
        this.text = responseText;
        this.chars = this.text.split("");
        this._currentDiv = this._currentDiv.bind(this);
        this.displayDiv = this.displayDiv.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.moveDiv = this.moveDiv.bind(this);
        this.listenForLose = this.listenForLose.bind(this);
        this.stopDiv = this.stopDiv.bind(this);
        this.isGameOver = this.isGameOver.bind(this);
        this.displayWin = this.displayWin.bind(this);
        this.calcAcc = this.calcAcc;
        this.calcWPM = this.calcWPM;
        this.checkEdgeCases = this.checkEdgeCases;
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
        let currentIndex = 0, correctCount = 0, uncorrectedErrorCount = 0, totalTypedCount = 0;
        
        
        const checkCharacter = (e) => {
            e.preventDefault();
            let currentCharacterSpan = this.charsSpans[currentIndex];
            let currentCharacter = currentCharacterSpan.innerText;
            const untypedSpans = document.getElementsByClassName('untyped');
            const correctSpans = document.getElementsByClassName('correct');
            const incorrectSpans = document.getElementsByClassName('incorrect');
            const lastCorrectElement = correctSpans.length - 1;
            const lastIncorrectElement = incorrectSpans.length - 1;
            
            if (e.key === currentCharacter || this.checkEdgeCases(e.key, currentCharacter)) {
                if (currentIndex > 0) {
                    let previousCharacterSpan = this.charsSpans[currentIndex - 1];
                    if (previousCharacterSpan.className === "correct") correctSpans[lastCorrectElement].style.borderRight = "unset";
                    if (previousCharacterSpan.className === "incorrect") incorrectSpans[lastIncorrectElement].style.borderRight = "unset";
                }
                untypedSpans[1].style.borderRight = "1px solid black";
                currentCharacterSpan.setAttribute('class', 'correct');
                if (currentCharacterSpan.dataset.incorrect) { currentCharacterSpan.removeAttribute('data-incorrect'); };
                totalTypedCount++;
                correctCount++;
                currentIndex++;
            } else if (e.keyCode === 8) {
                
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
                
            } else if (e.shiftKey) {
                return null;
            } else if (e.key !== currentCharacter) {
                
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
            }
            this.calcAcc(totalTypedCount, correctCount);
            this.calcWPM(totalTypedCount, uncorrectedErrorCount);
            
            if (this.isGameOver()) {
                this.stopDiv();
                this.displayWin();
            }
        }
        this.checkCharacter = checkCharacter;
        document.addEventListener('keydown', checkCharacter);
    }

    displayDiv() {
        this._currentDiv();
        this.checkWord();
    }

    moveDiv(selectedWPM, pos = this.pos) {
        
        this.moveDivInterval = setInterval(frame, selectedWPM);
        let that = this;
        function frame() {
            pos = pos + 0.10;
            that.pos = pos;
            const currentDiv = document.getElementById('current');
            currentDiv.style.bottom = pos + "%";
            that.listenForLose();
        }
    }

    stopDiv() {
        clearInterval(this.moveDivInterval);
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
            document.removeEventListener('keydown', this.checkCharacter);
            document.querySelector('.end-modal').style.display = 'flex';
            this.stopDiv();
            this.timer.stopTimer();
            const playAgainButton = document.querySelector('.play-again');
            playAgainButton.addEventListener('click', () => {
                window.location.reload();
            });
        }
    }

    calcWPM(totalTypedCount, uncorrectedErrorCount) {
        debugger;
        let netWPM = 0;
        let uncorrectedChars = document.querySelectorAll('[data-incorrect]');
        if (uncorrectedChars) { uncorrectedErrorCount = document.querySelectorAll('[data-incorrect]').length; };
        let time = document.getElementById('timer').dataset.time;

        netWPM = Math.round(((totalTypedCount / 5) - uncorrectedErrorCount) / parseFloat(time));
        if (netWPM < 0) { netWPM = 0; };
    
        document.getElementById('wpm').innerText = 'WPM: ' + netWPM.toString();
        document.getElementById('final-wpm').innerText = 'Final WPM: ' + netWPM.toString();
    }

    calcAcc(totalTypedCount, correctCount) {
        let accuracy = 0;
        if (totalTypedCount !== 0) { accuracy = ((correctCount / totalTypedCount) * 100).toFixed(2); };
        const accSpan = document.querySelector('.accuracy');
        accSpan.innerHTML = 'Accuracy: ' + accuracy.toString() + '%';
    }

    isGameOver() {
        const untypedSpansLeft = document.getElementsByClassName('untyped');
        return untypedSpansLeft.length <= 1;
    }

    displayWin() {
        document.removeEventListener('keydown', this.checkCharacter);
        const winModal = document.querySelector('.end-modal');
        winModal.style.display = 'flex';
        this.timer.stopTimer();
        const playAgainButton = document.querySelector('.play-again');
        playAgainButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    checkEdgeCases(pressedKey, currentcharacter) {
        //gotta figure out emojis at a later date...
    
        const accentedAs = ['À', 'à', 'Á', 'á', 'Ã', 'ã', 'Ä', 'ä'];
        const accentedEs = ['È', 'è', 'É', 'é', 'Ê', 'ê', 'Ë', 'ë'];
        const accentedIs = ['Ì', 'ì', 'Í', 'í', 'Î', 'î', 'Ï', 'ï'];
        const accentedOs = ['Ò', 'ò', 'Ó', 'ó', 'Ô', 'ô', 'Õ', 'õ', 'Ö', 'ö'];
        const accentedUs = ['Ù', 'ù', 'Ú', 'ú', 'Û', 'û', 'Ü', 'ü'];
        const accentedNs = ['Ñ', 'ñ'];
        
        if (pressedKey === "-" && currentCharacter === "—") { return true; };
        if (pressedKey === "a" && accentedAs.includes(currentcharacter)) { return true; }
        if (pressedKey === "e" && accentedEs.includes(currentcharacter)) { return true; }
        if (pressedKey === "i" && accentedIs.includes(currentcharacter)) { return true; }
        if (pressedKey === "o" && accentedOs.includes(currentcharacter)) { return true; }
        if (pressedKey === "u" && accentedUs.includes(currentcharacter)) { return true; }
        if (pressedKey === "n" && accentedNs.includes(currentcharacter)) { return true; }
        return false;
    }
}

export default Text;
