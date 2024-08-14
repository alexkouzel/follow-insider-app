import { Loader } from '/scripts/visuals/loader.js';

/* props: align */
export class Table {
    constructor(columns, props) {
        this.columns = columns;

        // init props
        props.align = props.align ?? Array(columns.length).fill('start');
        this.props = props;

        // init state
        this.rowCount = 0;
        this.full = false;

        // build table tag
        this.tag = this._build();

        // add loader between pages
        this.loader = new Loader(this.tag);

        // add initial rows
        props.loadPage(0).then(rows => this.addRows(rows));
    }

    addRows(rows) {
        this.loader.hide();
        const body = this.tag.querySelector('tbody');
        rows.forEach(row => {
            body.appendChild(row.build(this.props.align));
            this.rowCount++;
        });
    }

    onFull() {
        this.loader.hide();
        if (this.rowCount === 0) {
            this.tag.innerHTML += `
                <div class='abs-ctr empty-state'>
                    <img src='/assets/icons/error.svg' alt="table error">
                    <h3>Whoops!</h3>
                    <p>No data available at the moment</p>
                <div>
            `;
        }
        this.full = true;
    }

    onError() {
        this.loader.hide();
        this.tag.innerHTML += `
            <div class='abs-ctr empty-state'>
                <img src='/assets/icons/not_found.svg' alt="table error">
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
        const table = document.createElement('div');
        table.appendChild(this._buildWrapper());
        table.appendChild(this._buildNav());
        return table;
    }

    _buildWrapper() {
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
        return wrapper;
    }

    _buildNav() {
        let nav = document.createElement('div');
        nav.classList.add('table-nav');
        nav.innerHTML = `
            <p>1 - 16 of 426 items</p>
            <div>
                <button class='btn' id='prev'>Prev</button>
            </div>
        `;
        return nav;
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
            cell.classList.add('link');
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
        if (this.props.icon) {
            let img = document.createElement('img');
            
            img.src = this.props.icon;
            img.style.height = this.props.iconSize; 
            img.alt = 'link';

            cell.appendChild(img);
        } else {
            cell.innerText = this.value
        }
        cell.style.textAlign = align;

        return cell;
    }
}