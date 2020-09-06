import { timer } from './timer';
import Text from './text';
import { loadText } from './utils';

export default class Game {
    constructor(modal) {
        debugger;

        this.modal = modal;
        this.modalDiv = document.querySelector('.start-modal');
        this.startGame = this.startGame.bind(this);
    }

    startGame() {
        //can set data attribute on html element, but user can change it...
        const start = document.querySelector('.start-button');
        let that = this;
        start.addEventListener('click', (e) => {
            e.preventDefault();

            debugger;
            //condition: only run this code if div with id="current" has textContent.length > 0
            const inputFieldValue = document.getElementById('input-field').value;
            const setSpeed = parseInt(start.dataset.speed);
            
            if (Number.isInteger(setSpeed) && inputFieldValue.length > 1) {

                const returnValue = loadText(inputFieldValue);
                debugger;
                
                if (returnValue) {
                    const text = new Text();
                    debugger;
                    that.modalDiv.style.display = 'none';
                    text.displayDiv();
                    text.moveDiv(setSpeed);
                    timer();
                }
            }
        });
    }
}