import './styles/index.scss';
import Text from './scripts/text';
import Modal from './scripts/modal';
import Game from './scripts/game';
import { loadText } from './scripts/utils';

document.addEventListener("DOMContentLoaded", () => {
    loadText();
    const text = new Text();
    text.currentDiv.style.bottom = -7700 + "px";
    
    text.displayDiv();

    const modal = new Modal(text);
    const game = new Game(modal, text);
    game.startGame();
    window.text = text;
    window.charsSpans = text.charsSpans;
    window.words = text.words;
    window.currentDiv = text.currentDiv;
    window.currentCharacterSpan = text.currentCharacterSpan;
    window.modal = modal;
    window.speed = modal.speed;
    // window.res = res;


    setTimeout(() => {
        document.querySelector(".splash-bg").setAttribute("class", "hidden-splash-bg");
    }, 1000);
});