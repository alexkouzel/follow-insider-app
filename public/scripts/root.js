import { Config } from 'config.js'

class UniqueID {
    constructor() {
        this.counter = 0;
    }

    get() {
        return 'id-' + this.counter++;
    }
}

window.uniqueId = new UniqueID();

// --------------------------------------------------------

// Load scripts for header and footer
const head = document.getElementsByTagName('head')[0];
loadScript(head, 'scripts/components/footer.js');

function loadScript(head, url, isModule = false) {
    let script = document.createElement('script');
    script.type = isModule ? 'module' : 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

// --------------------------------------------------------