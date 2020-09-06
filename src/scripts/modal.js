import Game from './game';
import loadText from './utils';

export default class Modal {
    constructor() {
        // this.modal = document.querySelector('.start-modal');
        // this.text = text;
        // this.playAgainModal = this.playAgainModal.bind(this);
        this.selectSpeed = this.selectSpeed.bind(this);
        // this.selectedSlow = this.selectedSlow.bind(this);
        // this.playAgainModal();
        this.selectSpeed();
    }
    
    selectSpeed() {
        //note to self: see if i can use hover instead and pass in the class, so the code can be more DRY
        const slow = document.querySelector('.speed.slow');
        const medium = document.querySelector('.speed.medium');
        const fast = document.querySelector('.speed.fast');
        const startButton = document.querySelector('.start-button');
        let that = this;
        slow.addEventListener('click', () => {
            slow.style.backgroundColor = 'white';
            slow.style.color = 'rgba(0, 23, 95, 0.7)';
            medium.style.backgroundColor = 'unset';
            medium.style.color = 'white';
            fast.style.backgroundColor = 'unset';
            fast.style.color = 'white';
            // Solution Attempt 1:
            const slowSpeed = slow.dataset.speed;
            debugger;
            startButton.dataset.speed = slowSpeed;
            // Solution Attempt 2:
            // this.selectedSlow();
        })
        medium.addEventListener('click', () => {
            medium.style.backgroundColor = 'white';
            medium.style.color = 'rgba(0, 23, 95, 0.7)';
            slow.style.backgroundColor = 'unset';
            slow.style.color = 'white';
            fast.style.backgroundColor = 'unset';
            fast.style.color = 'white';
            const mediumSpeed = medium.dataset.speed;
            startButton.dataset.speed = mediumSpeed;

            // debugger;
        })
        fast.addEventListener('click', () => {
            fast.style.backgroundColor = 'white';
            fast.style.color = 'rgba(0, 23, 95, 0.7)';
            slow.style.backgroundColor = 'unset';
            slow.style.color = 'white';
            medium.style.backgroundColor = 'unset';
            medium.style.color = 'white';
            const fastSpeed = medium.dataset.speed;
            startButton.dataset.speed = fastSpeed;
        })
    }

    // selectedSlow() {
    //     const slow = document.querySelector('.speed.slow');
    //     debugger;
    //     this.speed = parseInt(slow.dataset.speed);
    //     this.startGame(this.speed);
    // }

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
