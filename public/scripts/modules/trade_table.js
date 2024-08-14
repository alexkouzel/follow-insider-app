import { Table, Row, Cell } from '/scripts/visuals/table/table.js';
import { Forms } from '/scripts/client/endpoints.js';
import * as string from '/scripts/utils/string.js';

export async function initTradeTable(container) {
    let columns = ['Company', 'Insider', 'Relationship', 'Type', '# Shares', 'Price', 'Value', '# Shares Left', 'Executed At', 'URL'];
    let align = ['start', 'start', 'start', 'center', 'end', 'end', 'end', 'end', 'end', 'center']

    let props = {
        align: align,
        loadPage: _getPage,
    };

    let table = new Table(columns, props);
    container.appendChild(table.tag);
}

async function _getPage(idx) {
    let forms = await Forms.getPage(idx);
    return _formsToRows(forms);
}

function _formsToRows(forms) {
    return forms.map(form => _formToRows(form)).flat(1);
}

function _formToRows(form) {
    let company = new Cell(form.company.name, {
        // onclick: () => window.open('/company/' + form.company.cik)
    });

    let insider = new Cell(form.insider.name);
    let relationship = new Cell(form.insiderTitles.join(', '));
    
    let url = new Cell('', { 
        color: 'var(--blue)',
        icon: '/assets/icons/link.png', 
        iconSize: '2rem',
        onclick: () => window.open(form.xmlUrl)
    });

    return form.trades.map(trade => new Row([company, insider, relationship, ..._getTradeCells(trade), url]));
}

function _getTradeCells(trade) {
    let typeColor = trade.type == 'BUY' ? 'var(--green)' : 'var(--red)';

    let type = new Cell(trade.type, { color: typeColor });
    let shareCount = new Cell(trade.shareCount);
    let price = new Cell(string.formatMoney(trade.sharePrice, '$'));
    let value = new Cell(trade.sharePrice ? string.formatMoney(trade.sharePrice * trade.shareCount, '$') : 'NAN');
    let sharesLeft = new Cell(trade.sharesLeft);
    let executedAt = new Cell(string.formatDate(trade.executedAt));

    return [type, price, shareCount, value, sharesLeft, executedAt];
}