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
                fetch(`../../functions/loadText?topic=${topic}&selectedWPM=${selectedWPM}`, {});       
                // loadText(inputFieldValue, selectedWPM);
            }
        });
    }
}
