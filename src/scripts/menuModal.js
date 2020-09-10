export default class MenuModal {
    constructor(stopDiv, stopTimer, moveDiv, checkCharacter, startTimer) {
        this.stopDiv = stopDiv;
        this.stopTimer = stopTimer;
        this.moveDiv = moveDiv;
        this.checkCharacter = checkCharacter;
        this.startTimer = startTimer;


        this.openMenu = this.openMenu.bind(this);
        this.resume = this.resume.bind(this);
        this.restart = this.restart.bind(this);

        this.resume();
    }

    openMenu() {
        const menuButton = document.querySelector('.menu');
        let that = this;
        menuButton.addEventListener('click', () => {
            document.querySelector('.menu-modal').style.display = 'flex';
            that.stopDiv();
            // that.stopTimer();
            document.removeEventListener('keydown', this.checkCharacter);
        });
    }

    resume() {
        const resumeButton = document.querySelector('.resume');
        let that = this;

        resumeButton.addEventListener('click', () => {
            const start = document.querySelector('.start-button');
            document.querySelector('.menu-modal').style.display = 'none';
            const selectedWPM = parseInt(start.dataset.selectedwpm);
            that.moveDiv(selectedWPM);
            const currentTime = document.querySelector('[data-time]');
            
            that.startTimer();
            document.addEventListener('keydown', this.checkCharacter);

        });
    }

    restart() {
        const restartButton = document.querySelector('.restart');
        let that = this;
        restartButton.addEventListener('click', () => {

        });
    }
}