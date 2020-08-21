import './styles/index.scss';
import Text from './scripts/text';
import Modal from './scripts/modal';

document.addEventListener("DOMContentLoaded", () => {
    const text = new Text();
    text.displayDiv();

    const modal = new Modal(text);
    window.charsSpans = text.charsSpans;
    window.words = text.words;
    window.currentDiv = text.currentDiv;
    window.currentCharacterSpan = text.currentCharacterSpan;


    setTimeout(() => {
        // debugger;
        document.querySelector(".splash-bg").setAttribute("class", "hidden-splash-bg");
    }, 1000);
});