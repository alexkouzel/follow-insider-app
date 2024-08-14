export class Toast {
    constructor(text, props) {
        
        // ignore if another toast is already shown
        if (document.querySelector('.toast') !== null)
            return;

        this.text = text;

        props.color = props.color ?? 'var(--blue)';
        props.timeout = props.timeout ?? 3000;
        this.props = props ?? {};
    }

    static showError(error) {
        new Toast(error, { color: 'var(--red)' }).show();
    }

    static showSuccess(message) {
        new Toast(message, { color: 'var(--green)' }).show();
    }

    show() {
        let toast = this._build();
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), this.props.timeout);
    }
    
    _build() {
        let tag = document.createElement('div');
        tag.style.background = this.props.color;
        tag.classList.add('toast', 'show');
        tag.innerText = this.text;
        return tag;
    }
}