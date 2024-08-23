import { Table, Row, Cell } from '/scripts/visuals/table.js';
import { Trades } from '/scripts/client/endpoints.js';
import * as string from '/scripts/utils/string.js';

export function initTradeTable(container, params) {
    let columns = ['Company', 'Insider', 'Relationship', 'Type', '# Shares', 'Price', 'Value', 'Value Left', 'Executed At', 'URL'];
    let align = ['start', 'start', 'start', 'center', 'end', 'end', 'end', 'end', 'end', 'center']

    let props = {
        align: align,
        loadPage: (idx) => _loadPage(idx, params),
        loadCount: () => _loadCount(params)
    };

    let table = new Table(columns, props);
    container.appendChild(table.tag);

    return table;
}

async function _loadCount(params) {
    return await Trades.getCount(params);
}

async function _loadPage(idx, params) {
    let trades = await Trades.getPage(idx, 10, params);
    return _tradesToRows(trades);
}

function _tradesToRows(trades) {
    return trades.map(trade => _tradeToRow(trade));
}

function _tradeToRow(trade) {
    let company = new Cell(trade.company.name, {
        // onclick: () => window.open('/company/' + form.company.cik)
    });

    let insider = new Cell(trade.insider.name);
    let relationship = new Cell(trade.insiderTitles.join(', '));
    let type = new Cell(trade.type, { color: trade.type == 'Buy' ? 'var(--green)' : 'var(--red)' });
    let shareCount = new Cell(trade.shareCount);
    let price = new Cell(string.formatMoney(trade.sharePrice, '$'));
    let value = new Cell(trade.sharePrice ? string.formatMoney(trade.sharePrice * trade.shareCount, '$') : 'NAN');
    let valueLeft = new Cell(string.formatMoney(trade.valueLeft ? trade.valueLeft : trade.sharesLeft * trade.shareCount, '$'));
    let executedAt = new Cell(string.formatDate(trade.executedAt));

    let url = new Cell('', { 
        color: 'var(--blue)',
        icon: '/assets/icons/link.png', 
        iconSize: '2rem',
        onclick: () => window.open(trade.xmlUrl)
    });

    return new Row([company, insider, relationship, type, shareCount, price, value, valueLeft, executedAt, url]);
}