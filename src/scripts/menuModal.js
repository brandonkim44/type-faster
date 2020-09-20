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
        this.restart();
    }

    openMenu() {
        const menuButton = document.querySelector('.menu');
        menuButton.addEventListener('click', () => {
            document.querySelector('.menu-modal').style.display = 'flex';
            this.stopDiv();
            this.stopTimer();
            document.removeEventListener('keydown', this.checkCharacter);
        });
    }

    resume() {
        const resumeButton = document.querySelector('.resume');
        resumeButton.addEventListener('click', () => {
            const start = document.querySelector('.start-button');
            document.querySelector('.menu-modal').style.display = 'none';
            const selectedWPM = parseInt(start.dataset.selectedwpm);
            this.moveDiv(selectedWPM);
            this.startTimer();            
            document.addEventListener('keydown', this.checkCharacter);
        });
    }

    restart() {
        const restartButton = document.querySelector('.restart');
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
    }
};