import { FAMOUS_TEXTS } from './utils';

class Text {
    constructor() {
        this.currentDiv = document.getElementById('current');
        //use JSTOR api later
        debugger;
        this.text = FAMOUS_TEXTS[0];
        this.chars = this.text.split("");
        this._currentDiv = this._currentDiv.bind(this);
        this.displayDiv = this.displayDiv.bind(this);
        this.checkWord = this.checkWord.bind(this);
        this.moveDiv = this.moveDiv.bind(this);
        this.listenForLose = this.listenForLose.bind(this);
        this.listenForLose();
    }

    randomTextGenerator() {

    }

    _currentDiv() {
        debugger;
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
            debugger;
            let currentCharacterSpan = this.charsSpans[currentIndex];
            let currentCharacter = currentCharacterSpan.innerText;
            if (e.key === currentCharacter) {
                debugger;
                // currentCharacterSpan.remove();
                currentCharacterSpan.setAttribute('class', 'correct');
                // currentCharacterSpan.style.visibility = "hidden";
                currentIndex++;
            }
        })
    }

    displayDiv() {
        debugger;
        this._currentDiv();
        this.checkWord();
    }

    moveDiv() {
        // this.currentDiv;
        let pos = -2020;
        const id = setInterval(frame, 20);

        function frame() {
            if (pos === 300) {
                clearInterval(id);
            } else {
                pos++;
                this.currentDiv.style.bottom = pos + "px";
            }
        }
    }

    listenForLose() {
        window.addEventListener('scroll', (e) => {
            const incorrectSpans = document.getElementsByClassName('incorrect');
            const firstIncorrectSpan = incorrectSpans[0].getBoundingClientRect().top;
            debugger;
            if (firstIncorrectSpan <= 0) {
                debugger;
                alert("You lose!");
            }
        });


        // const incorrectSpans = document.getElementsByClassName('incorrect');

        // const observer = new IntersectionObserver( entries => {
        //     if (entries[0].boundingClientRect().top <= 0) {
        //         alert("You lose!");
        //     }
        // });
        // observer.observe(incorrectSpans);
        // this.currentDiv;
    }
}

export default Text;
