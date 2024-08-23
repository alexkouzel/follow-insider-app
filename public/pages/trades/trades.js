import { initCompanySearch } from '/scripts/modules/company_search.js';
import { initTradeTable } from '/scripts/modules/trade_table.js';
import { initDropdown } from '/scripts/visuals/dropdown.js';

document.addEventListener('DOMContentLoaded', () => {

    // initialize params
    let params = {
        'company-name': '',
        'company-ticker': '',
        'type': 'All',
        'executedAt': 'All'
    }
        
    // initialize table
    let main = document.querySelector('main');
    let table = initTradeTable(main, params);

    // search for company
    let searchTag = document.querySelector('.search');

    initCompanySearch(searchTag, (value, hint) => {
        params['company-name'] = value;
        params['company-ticker'] = hint;
        
        searchTag.querySelector('input').value = value;
        table = updateTable(main, table, params);
    });

    // choose transaction type
    let transaction = ['All', 'Buy', 'Sell']

    initDropdown('dd-transaction', 'Transaction', 'All', transaction, (value) => {
        params['type'] = value;
        table = updateTable(main, table, params);
    });

    // choose executed at
    let executedAt = ['All', 'Today', 'Last 7 Days', 'Last 31 Days']

    initDropdown('dd-executed-at', 'ExecutedAt', 'All', executedAt, (value) => {
        params['executedAt'] = value;
        table = updateTable(main, table, params);
    });

    // choose insider
    initDropdown('dd-insider', 'Insider', 'All', [], (value) => {
        // TODO: Implement this.
    });

});

function updateTable(main, table, params) {
    table.tag.remove();
    return initTradeTable(main, params);
}