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
    return await Trades.count(params);
}

async function _loadPage(idx, params) {
    let trades = await Trades.page(idx, 10, params);
    return _tradesToRows(trades);
}

function _tradesToRows(trades) {
    return trades.map(trade => _tradeToRow(trade));
}

function _tradeToRow(trade) {
    let form = trade.form;
    
    // company cell
    let company = form.company.name;
    let companyCell = new Cell(company, {
        // onclick: () => window.open('/company/' + form.company.cik)
    });

    // insider cell
    let insider = form.insider.name;
    let insiderCell = new Cell(insider);
    
    // relationship cell
    let relationship = form.insiderTitles.join(', ');
    let relationshipCell = new Cell(relationship);

    // type cell
    let typeValue = trade.type === 'BUY' ? 'Buy' : 'Sell';
    let typeColor = trade.type === 'BUY' ? 'var(--green)' : 'var(--red)';
    let typeCell = new Cell(typeValue, { color: typeColor });

    // share count cell
    let shareCount = trade.shareCount;
    let shareCountCell = new Cell(shareCount);

    // price cell
    let price = string.formatMoney(trade.sharePrice, '$');
    let priceCell = new Cell(price);

    // value cell
    let value = trade.sharePrice ? string.formatMoney(trade.sharePrice * trade.shareCount, '$') : 'NAN';
    let valueCell = new Cell(value);

    // value left cell
    trade.valueLeft ??= trade.sharesLeft * trade.shareCount;

    let valueLeft = string.formatMoney(trade.valueLeft, '$');
    let valueLeftCell = new Cell(valueLeft);

    // executed at cell
    let executedAt = string.formatDate(trade.executedAt);
    let executedAtCell = new Cell(executedAt);

    // url cell
    let urlCell = new Cell('', {
        color: 'var(--blue)',
        icon: '/assets/icons/link.svg',
        iconSize: '2rem',
        onclick: () => window.open(form.xmlUrl)
    });

    return new Row([
        companyCell, insiderCell, relationshipCell, typeCell, shareCountCell,
        priceCell, valueCell, valueLeftCell, executedAtCell, urlCell
    ]);
}