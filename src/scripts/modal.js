import Text from './text';

export default class Modal {
    constructor(text) {
        this.modal = document.querySelector(".modal-bg");
        this.closeModal();
        this.text = text;
    }

    closeModal() {
        const start = document.querySelector(".start-button");
        start.addEventListener("click", (e) => {
            e.preventDefault();
            this.modal.style.display = "none";
            this.text.moveDiv()
        });
    }
}
