import './styles/index.scss';
import Text from './scripts/text';
import Modal from './scripts/modal';
// import { timer } from './scripts/timer';

document.addEventListener("DOMContentLoaded", () => {
    const text = new Text();
    text.currentDiv.style.bottom = -2020 + "px";
    text.displayDiv();
    // timer();

    const modal = new Modal(text);

    window.charsSpans = text.charsSpans;
    window.words = text.words;
    window.currentDiv = text.currentDiv;
    window.currentCharacterSpan = text.currentCharacterSpan;
    window.speed = modal.speed;
    window.modal = modal;


    setTimeout(() => {
        document.querySelector(".splash-bg").setAttribute("class", "hidden-splash-bg");
    }, 1000);
});