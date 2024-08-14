export class SearchBar {
    constructor(tag, loadHints, onSearch) {
        this.tag = tag;
        this.onSearch = onSearch;

        this.focus = -1;
        this.hintsNum = 0;

        this._handleHints(loadHints);
    }

    get _hintsTag() {
        return this.tag.querySelectorAll('.hints>*');
    }

    _handleHints(loadHints) {
        let searchBar = this;
        let inputTag = searchBar.tag.querySelector('input');

        // update hints on search input
        let debounceTimeout;
        inputTag.addEventListener('input', function () {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(async () => {
                let hints = await loadHints(this.value);
                searchBar._updateHints(hints, this.value);
            }, 300);
        });

        // handle hints' navigation & clicks
        inputTag.addEventListener('keydown', function (e) {
            switch (e.key) {
                case 'Down':
                case 'ArrowDown':
                    searchBar.focus++;
                    searchBar._updateActiveHint();
                    break;
                case 'Up':
                case 'ArrowUp':
                    searchBar.focus--;
                    searchBar._updateActiveHint();
                    break;
                case 'Enter':
                    let hints = searchBar._hintsTag;
                    if (searchBar.focus > -1 && hints) {
                        hints[searchBar.focus].click();
                    } else {
                        searchBar.onSearch(false, inputTag.value);
                    }
            }
        });

        // hide hints if clicked somewhere
        window.addEventListener('click', () => {
            searchBar._resetHints();
        });
    }

    _updateActiveHint() {
        let hintsNum = this.hintsNum;
        if (hintsNum === 0) return false;

        // shift current focus
        if (this.focus < 0) this.focus = (hintsNum - 1);
        this.focus = this.focus % hintsNum;

        // update an active hint
        let hints = this._hintsTag;
        for (let i = 0; i < hints.length; i++) {
            if (i === this.focus) {
                hints[i].classList.add('hints-active');
            } else {
                hints[i].classList.remove('hints-active');
            }
        }
    }

    _updateHints(hints, input) {
        this._resetHints();

        // check if any matches found
        this.hintsNum = Object.keys(hints).length;
        if (this.hintsNum === 0) return;

        // create a list with hints
        let container = document.createElement('div');
        container.classList.add('hints');
        this.tag.appendChild(container);

        // add matched hints to the list
        input = input.toLowerCase();
        for (let val in hints) {
            let hint = document.createElement('p');
            let idx = val.toLowerCase().indexOf(input)
            if (idx !== -1) {
                let left = val.substring(0, idx);
                let middle = val.substring(idx, input.length + idx);
                let right = val.substring(input.length + idx, val.length);
                hint.innerHTML = `${left}<b>${middle}</b>${right}`;
            } else {
                hint.innerText = val;
            }
            hint.onclick = () => {
                let chosenHint = hints[val]
                this.onSearch(chosenHint !== null, chosenHint ?? val);
            };
            container.appendChild(hint);
        }
    }

    _resetHints() {
        let hints = this.tag.querySelector('.hints');
        if (hints !== null) hints.remove();
        this.focus = -1;
    }
}