import { Table, Row, Cell } from '/scripts/visuals/table.js';
import { Trades } from '/scripts/client/endpoints.js';
import * as string from '/scripts/utils/string.js';

export function initTradeTable(container, filters) {
    let columns = ['Company', 'Insider', 'Relationship', 'Type', '# Shares', 'Price', 'Value', '# Shares Left', 'Executed At', 'URL'];
    let align = ['start', 'start', 'start', 'center', 'end', 'end', 'end', 'end', 'end', 'center']

    let pageSize = 10;

    let props = {
        align: align,
        loadPage: (idx) => _loadPage(idx, pageSize, filters),
        loadCount: () => _loadCount(filters),
        pageSize: pageSize,
    };

    let table = new Table(columns, props);
    container.appendChild(table.tag);

    return table;
}

async function _loadCount(filters) {
    return await Trades.count(filters);
}

async function _loadPage(idx, pageSize, filters) {
    let trades = await Trades.page(idx, pageSize, filters);
    return _tradesToRows(trades);
}

function _tradesToRows(trades) {
    return trades.map(trade => _tradeToRow(trade));
}

function _tradeToRow(trade) {
    let form = trade.form;
    
    // company cell
    let company = `${form.company.name} (${form.company.ticker})`;
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
    let price = trade.sharePrice ? string.formatMoney(trade.sharePrice, '$') : 'Unknown';
    let priceCell = new Cell(price);

    // value cell
    let value = trade.sharePrice ? string.formatMoney(trade.sharePrice * trade.shareCount, '$') : 'Unknown';
    let valueCell = new Cell(value);

    // shares left cell
    let sharesLeft = string.formatMoney(trade.valueLeft, '$');
    let sharesLeftCell = new Cell(sharesLeft);

    // executed at cell
    let executedAt = trade.executedAt ? string.formatDate(trade.executedAt) : 'Unknown';
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
        priceCell, valueCell, sharesLeftCell, executedAtCell, urlCell
    ]);
}
