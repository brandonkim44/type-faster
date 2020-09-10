import './styles/index.scss';
import StartModal from './scripts/startModal';
import Game from './scripts/game';

document.addEventListener("DOMContentLoaded", () => {
    const startModal = new StartModal();
    startModal.selectSpeed();
    startModal.startGame();
    
    setTimeout(() => {
        document.querySelector(".splash-bg").setAttribute("class", "hidden-splash-bg");
    }, 1000);
});