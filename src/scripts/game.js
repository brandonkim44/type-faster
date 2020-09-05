import { timer } from './timer';

export default class Game {
    constructor(modal, text) {
        debugger;
        this.text = text;
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
            const setSpeed = parseInt(start.dataset.speed);
            if (Number.isInteger(setSpeed)) {
                debugger;
                that.modalDiv.style.display = 'none';
                that.modal.text.moveDiv(setSpeed);
                timer();
            }
        });
    }
}