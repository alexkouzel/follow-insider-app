export class Toast {
    constructor(text, props) {
        
        // Ignore if another toast is already shown
        if (document.querySelector('.toast') !== null)
            return;

        this.text = text;
        this.props = props ?? {};

        props.color = props.color ?? 'var(--blue)';
        props.timeout = props.timeout ?? 3000;

        this._show();
    }

    static showError(error) {
        new Toast(error, { color: 'var(--red)' });
    }

    static showSuccess(message) {
        new Toast(message, { color: 'var(--green)' });
    }

    _show() {
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