import { loadText } from './utils';

export default class Game {
    constructor() {
        debugger;
        this.modalDiv = document.querySelector('.start-modal');
        this.startGame = this.startGame.bind(this);
    }

    startGame() {
        //can set data attribute on html element, but user can change it...
        const start = document.querySelector('.start-button');
        // let that = this;
        start.addEventListener('click', (e) => {
            e.preventDefault();

            debugger;
            //condition: only run this code if div with id="current" has textContent.length > 0
            const inputFieldValue = document.getElementById('input-field').value;
            const selectedWPM = parseInt(start.dataset.selectedwpm);
            
            if (Number.isInteger(selectedWPM) && inputFieldValue.length > 1) {

                loadText(inputFieldValue, this.modalDiv, selectedWPM);
            }
        });
    }
}