import './styles/index.scss';
import StartModal from './scripts/startModal';

document.addEventListener("DOMContentLoaded", () => {
    const startModal = new StartModal();
    startModal.selectSpeed();
    startModal.startGame();
    debugger;
    setTimeout(() => {
        document.querySelector(".splash-bg").setAttribute("class", "hidden-splash-bg");
    }, 1000);
});