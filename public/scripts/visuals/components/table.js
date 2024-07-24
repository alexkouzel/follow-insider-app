import { Loader } from '/scripts/visuals/loaders/loader.js';

/* props: align */
export class Table {
    constructor(columns, props) {
        this.columns = columns;
        this.rowCount = 0;
        this.full = false;

        props = props ?? {};
        props.align = props.align ?? Array(columns.length).fill('start');
        props.padding_left = props.padding_left ?? 'auto'
        this.props = props ?? {};

        this.tag = this._build();
        this.loader = new Loader(this.tag);

        if (this.props.initialData) {
            this.addRows(props.initialData);
        }
    }

    addRows(rows) {
        this.loader.hideIfVisible();
        const body = this.tag.querySelector('tbody');
        rows.forEach(row => {
            body.appendChild(row.build(this.props.align));
            this.rowCount++;
        });
    }

    onFull() {
        this.loader.hideIfVisible();
        if (this.rowCount === 0) {
            this.tag.innerHTML += `
                <div class='abs-ctr empty-state'>
                    <img src='/assets/icons/empty-box.svg' alt="table error">
                    <h3>Whoops!</h3>
                    <p>No data available at the moment</p>
                <div>
            `;
        }
        this.full = true;
    }

    onError() {
        this.loader.hideIfVisible();
        this.tag.innerHTML += `
            <div class='abs-ctr empty-state'>
                <img src='/assets/icons/empty-cloud.svg' alt="table error">
                <h3>Nooooo!</h3>
                <p>Something went wrong on the server</p>
            <div>
        `;
    }

    reset() {
        this.tag.querySelector('.empty-state')?.remove();
        this.tag.querySelector('tbody').innerHTML = '';

        this.loader.show();
        this.rowCount = 0;
    }

    _build() {
        let headerRow = this.columns.map(
            (label, i) => `<th style="text-align: ${this.props.align[i]}">${label}</th>`
        ).join('');

        let wrapper = document.createElement('div');
        wrapper.classList.add('table-wrapper', 'scrollbar');
        wrapper.innerHTML = `
            <table>
                <thead><tr>${headerRow}</tr></thead>
                <tbody></tbody>
            </table>
        `;

        // table = wrapper + filters
        const table = document.createElement('div');
        
        if (this.props.filters) {
            let filters = this.props.filters.build();
            table.appendChild(filters);
        }
        table.appendChild(wrapper);
        return table;
    }
}

/* props: color */
export class Row {
    constructor(cells, props) {
        this.cells = cells;
        this.props = props ?? {};
    }

    build(align) {
        let row = document.createElement('tr');

        if (this.props.color) {
            row.style.backgroundColor = this.props.color;
        }

        for (let i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i].build(align[i]);
            row.appendChild(cell);
        }
        return row;
    }
}

/* props: onclick, color, max_width, min_width, class */
export class Cell {
    constructor(value, props) {
        this.value = value;
        this.props = props ?? {};
    }

    build(align) {
        let cell = document.createElement('td');

        if (this.props.onclick) {
            cell.onclick = this.props.onclick;
        }
        if (this.props.color) {
            cell.style.color = this.props.color;
        }
        if (this.props.max_width) {
            cell.style.maxWidth = this.props.max_width;
        }
        if (this.props.min_width) {
            cell.style.minWidth = this.props.min_width;
        }
        if (this.props.class) {
            cell.classList.add(this.props.class);
        }
        cell.style.textAlign = align;
        cell.innerText = this.value;

        return cell;
    }
}

// ---------------------------------------------------------------------

/* props: checked, color */
export class Checkbox {
    constructor(label, props) {
        this.label = label;

        this.props = props ?? {};
        this.props.checked = props.checked ?? false;
    }

    build() {
        let tag = document.createElement('div');

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.id = this.label;
        input.name = this.label.toUpperCase();
        input.click();
        tag.appendChild(input);

        let label = document.createElement('label');
        label.style.color = this.props.color;
        label.innerText = this.label;
        label.setAttribute('for', this.label);
        tag.appendChild(label);

        return tag;
    }
}

export class CheckboxFilters {
    constructor(boxes) {
        this.id = window.uniqueId.get();
        this.boxes = boxes;
    }

    build() {
        let tag = document.createElement('div');
        this.boxes.forEach(box => tag.appendChild(box.build()));
        tag.classList.add('filters');
        tag.id = this.id;
        return tag;
    }

    onselect(func) {
        document.querySelectorAll(`#${this.id} input`).forEach(box => {
            box.onchange = func;
        });
    }

    get checked() {
        let checked = document.querySelectorAll(`#${this.id} input:checked`);
        return [...checked].map(box => box.getAttribute('name'));
    }
}