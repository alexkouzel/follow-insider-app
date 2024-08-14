import { initCompanySearch } from '/scripts/modules/company_search.js';
import { initTradeTable } from '/scripts/modules/trade_table.js';
import { initDropdown } from '/scripts/visuals/dropdown.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // initialize search bar
    let searchTag = document.querySelector('.search');
    initCompanySearch(searchTag); 

    // initialize filters
    let filterTransaction = document.getElementById('filter-transaction');
    let filterExecutedAt = document.getElementById('filter-executed-at');

    initDropdown(filterTransaction);
    initDropdown(filterExecutedAt);

    // initialize table
    let table = document.getElementById('trade-table');
    initTradeTable(table);

});