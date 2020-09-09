export default class MenuModal {
    constructor() {

    }

    openMenu(stopDiv, stopTimer) {
        const menuButton = document.querySelector('.menu');

        menuButton.addEventListener('click', () => {
            document.querySelector('.menu-modal').style.display = 'flex';
            // pause timer
            // pause text from moving
        });
    }

    resume() {

    }

    restart() {

    }
}