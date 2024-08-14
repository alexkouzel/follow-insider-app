export class Loader {
    constructor(container) {
        this.tag = this._build();
        container.appendChild(this.tag);
    }

    _build() {
        let tag = document.createElement('div');
        tag.classList.add('abs-ctr');
        tag.innerHTML = '<div class="lds-facebook"><div></div><div></div><div></div></div>';
        return tag;
    }

    isVisible() {
        return this.tag.style.display === 'block';
    }

    show() {
        this.tag.style.display = 'block';
    }

    hide() {
        this.tag.style.display = 'none';
    }

    remove() {
        this.tag.remove();
    }
}