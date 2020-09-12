import Text from './text';
import Timer from './timer';
import MenuModal from './menuModal';

export default class Game {
    constructor(contentRes, selectedWPM) {
        this.contentRes = contentRes;
        this.selectedWPM = selectedWPM;

        this.createText = this.createText.bind(this);
        this.createTimer = this.createTimer.bind(this);
        this.createMenuModal = this.createMenuModal.bind(this);

        this.createTimer();
        this.createText();
        this.createMenuModal();
    }
    
    createTimer() {
        const timer = new Timer();
        this.timer = timer;
        timer.startTimer();
        this.stopTimer = timer.stopTimer;
        this.startTimer = timer.startTimer;
    }

    createText() {
        const text = new Text(this.contentRes, this.timer);
        text.displayDiv();
        text.moveDiv(this.selectedWPM);
        this.stopDiv = text.stopDiv;
        this.moveDiv = text.moveDiv;
        this.checkCharacter = text.checkCharacter;
    }

    createMenuModal() {
        const menuModal = new MenuModal(this.stopDiv, this.stopTimer, this.moveDiv, this.checkCharacter, this.startTimer);
        menuModal.openMenu();
    }

};