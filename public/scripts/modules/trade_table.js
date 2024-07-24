import { Table, Row, Cell } from '/scripts/visuals/components/table.js';
import { Forms } from '/scripts/client/endpoints.js';

export function initTradeTable(container) {
    let columns = ['Insider', 'Title', 'Type', 'Price', 'Shares', 'Value', 'Date'];
    let align = ['start', 'start', 'center', 'end', 'end', 'end', 'center']

    let table = new Table(columns, {
        align: align,
        scrollThreshold: 0.8,
        onScrollAdd: (idx) => formsToRows(Forms.getPage(idx)),
        initialData: formsToRows(Forms.getPage(0))
    });

    container.appendChild(table.tag);
}

function formsToRows(forms) {
    return forms.map(form => formToRows(form)).flat(1);
}

function formToRows(form) {
    let insider = new Cell(form.insider.name);
    let title = new Cell(form.insiderTitles.join(', '));

    return form.trades.map(trade => {
        let typeColor = trade.type == 'BUY' ? 'var(--green)' : 'var(--red)';

        let type = new Cell(trade.type, { color: typeColor });
        let price = new Cell(trade.sharePrice);
        let shares = new Cell(trade.shareCount);
        let totalValue = new Cell(trade.sharePrice ? trade.sharePrice * trade.shareCount : 'NAN');
        let date = new Cell(trade.executedAt);

        return new Row([insider, title, type, price, shares, totalValue, date]);
    });
}