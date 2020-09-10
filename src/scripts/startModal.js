import { loadText } from './utils';

export default class StartModal {
    constructor() {
        // this.playAgainModal = this.playAgainModal.bind(this);
        this.selectSpeed = this.selectSpeed.bind(this);
        // this.playAgainModal();
        this.startGame = this.startGame.bind(this);
    }
    
    selectSpeed() {
        //note to self: see if i can use hover instead and pass in the class, so the code can be more DRY

        const speedButtons = document.getElementsByClassName('speed');
        const startButton = document.querySelector('.start-button');
        //not great space complexity, O(n), and time complexity, O(n^2) , but more DRY for now
        for(let i = 0; i < speedButtons.length; i++) {
            speedButtons[i].addEventListener('click', (e) => {
                
                const allSpeedButtons = document.querySelectorAll('[data-wpm]');

                for (let j = 0; j < allSpeedButtons.length; j++) {
                    debugger;
                    allSpeedButtons[j].setAttribute('class', 'speed');
                }
                debugger;
                e.currentTarget.setAttribute('class', 'selected-speed');
                debugger;
                startButton.dataset.selectedwpm = e.currentTarget.dataset.wpm;
            })
        }
    }

    startGame() {
        //can set data attribute on html element, but user can change it...
        const start = document.querySelector('.start-button');
        // let that = this;
        start.addEventListener('click', (e) => {
            e.preventDefault();

            //condition: only run this code if div with id="current" has textContent.length > 0
            const inputFieldValue = document.getElementById('input-field').value;
            const selectedWPM = parseInt(start.dataset.selectedwpm);

            if (Number.isInteger(selectedWPM) && inputFieldValue.length > 1) {
                loadText(inputFieldValue, selectedWPM);
            }
        });
    }

    // playAgainModal(speed = this.speed) {
    //     const playAgain = document.querySelector('.play-again-button');
    //     const playAgainModal = document.querySelector('.end-modal');
    //     playAgain.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         playAgainModal.style.display = 'none';
    //         this.text.moveDiv(speed)
    //     });
    // }
}
