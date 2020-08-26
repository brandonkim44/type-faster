
export default class Modal {
    constructor(text) {
        this.modal = document.querySelector('.start-modal');
        this.text = text;
        this.playAgainModal = this.playAgainModal.bind(this);
        this.startGame = this.startGame.bind(this);
        this.selectSpeed = this.selectSpeed.bind(this);
        this.selectSpeed();
        this.playAgainModal();
        // this.speed = null;
        this.startGame(this.speed);
    }

    selectSpeed() {
        //see if i can use hover instead and pass in the class, so the code can be more DRY
        const slow = document.querySelector('.speed.slow');
        const medium = document.querySelector('.speed.medium');
        const fast = document.querySelector('.speed.fast');
        let that = this;
        slow.addEventListener('click', () => {
            slow.style.backgroundColor = 'white';
            slow.style.color = 'rgba(0, 23, 95, 0.7)';
            medium.style.backgroundColor = 'unset';
            medium.style.color = 'white';
            fast.style.backgroundColor = 'unset';
            fast.style.color = 'white';
            debugger;
            that.speed = parseInt(slow.dataset.speed);
            // debugger;
        })
        medium.addEventListener('click', () => {
            medium.style.backgroundColor = 'white';
            medium.style.color = 'rgba(0, 23, 95, 0.7)';
            slow.style.backgroundColor = 'unset';
            slow.style.color = 'white';
            fast.style.backgroundColor = 'unset';
            fast.style.color = 'white';
            that.speed = parseInt(medium.dataset.speed);
            // debugger;
        })
        fast.addEventListener('click', () => {
            fast.style.backgroundColor = 'white';
            fast.style.color = 'rgba(0, 23, 95, 0.7)';
            slow.style.backgroundColor = 'unset';
            slow.style.color = 'white';
            medium.style.backgroundColor = 'unset';
            medium.style.color = 'white';
            that.speed = parseInt(fast.dataset.speed);
        })
        // debugger;
        // this.startGame(speed);
    }

    startGame(speed = this.speed) {
        const start = document.querySelector('.start-button');
        start.addEventListener('click', (e) => {
            e.preventDefault();
            // debugger;
            // if (speed) {
                this.modal.style.display = 'none';
                this.text.moveDiv(speed);
            // }
        });
    }

    playAgainModal(speed = this.speed) {
        const playAgain = document.querySelector('.play-again-button');
        const playAgainModal = document.querySelector('.end-modal');
        playAgain.addEventListener('click', (e) => {
            e.preventDefault();
            playAgainModal.style.display = 'none';
            this.text.moveDiv(speed)
        });
    }
}
