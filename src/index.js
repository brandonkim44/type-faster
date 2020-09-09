import './styles/index.scss';
import StartModal from './scripts/startModal';
import Game from './scripts/game';

document.addEventListener("DOMContentLoaded", () => {
    const startModal = new StartModal();
    const game = new Game();
    game.startGame();
    window.startModal = startModal;
    setTimeout(() => {
        document.querySelector(".splash-bg").setAttribute("class", "hidden-splash-bg");
    }, 1000);
});