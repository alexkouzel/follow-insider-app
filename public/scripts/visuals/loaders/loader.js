export class Loader {
    constructor(container) {
        this.loader = this._build();
        container.appendChild(this.loader);
    }

    _build() {
        let loader = document.createElement('div');
        loader.classList.add('abs-ctr');
        loader.innerHTML = '<div class="lds-facebook"><div></div><div></div><div></div></div>';
        return loader;
    }

    show() {
        // TODO: Implement this.
    }

    hide() {
        // TODO: Implement this.
    }

    remove() {
        this.loader.remove();
    }
}