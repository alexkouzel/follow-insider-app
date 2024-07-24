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

    hideIfVisible() {
        if (this.isVisible()) {
            this.hide();
        }
    }

    isVisible() {
        return false;
    }

    show() {
        // TODO: Implement this.
    }

    hide() {
        // TODO: Implement this.
    }

    remove() {
        this.tag.remove();
    }
}