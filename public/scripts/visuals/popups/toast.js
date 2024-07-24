export class Toast {
    constructor(text, props) {
        
        // Ignore if another toast is already shown
        if (document.querySelector('.toast') !== null)
            return;

        props = props ?? {};
        this.color = props['color'] ?? 'var(--blue)';
        this.timeout = props['timeout'] ?? 3000;
        this.text = text;

        this._show();
    }

    static showError(error) {
        new Toast(error, { color: 'var(--red)' });
    }

    static showSuccess(message) {
        new Toast(message, { color: 'var(--green)' });
    }

    _build() {
        let toast = document.createElement('div');
        toast.style.background = this.color;
        toast.classList.add('toast', 'show');
        toast.innerText = this.text;
        return toast;
    }

    _show() {
        toast = this._build();
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), this.timeout);
    }
}