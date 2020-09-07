import './styles/index.scss';
// import Text from './scripts/text';
import Modal from './scripts/modal';
import Game from './scripts/game';
// import { loadText } from './scripts/utils';

document.addEventListener("DOMContentLoaded", () => {
    const modal = new Modal();
    const game = new Game();
    game.startGame();
    window.modal = modal;
    setTimeout(() => {
        document.querySelector(".splash-bg").setAttribute("class", "hidden-splash-bg");
    }, 1000);
});