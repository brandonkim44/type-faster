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

        this.createText();
        this.createTimer();
        this.createMenuModal();
    }

    createText() {
        const text = new Text(this.contentRes);
        text.displayDiv();
        text.moveDiv(this.selectedWPM);
        this.stopDiv = text.stopDiv;
        this.moveDiv = text.moveDiv;
        this.checkCharacter = text.checkCharacter;
    }

    createTimer() {
        const timer = new Timer();
        timer.startTimer();
        this.stopTimer = timer.stopTimer;
    }

    createMenuModal() {
        //just pass this.text into menuModal...
        const menuModal = new MenuModal(this.stopDiv, this.stopTimer, this.moveDiv, this.checkCharacter);
        menuModal.openMenu();
    }
};