import { initCompanySearch } from '/scripts/modules/company_search.js';
import { initTradeTable } from '/scripts/modules/trade_table.js';
import { initDropdown } from '/scripts/visuals/dropdown.js';

const TYPES = {
    '': 'All',
    'BUY': 'Buy',
    'SELL': 'Sell'
};

const DATES = {
    '': 'All',
    'D1': 'Last day',
    'D3': 'Last 3 days',
    'W1': 'Last week',
    'W2': 'Last 2 weeks',
    'M1': 'Last month',
    'M2': 'Last 3 months',
    'M6': 'Last 6 months',
    'Y1': 'Last year',
    'Y2': 'Last 2 years'
};

document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // helper function to validate a parameter against a set of valid keys
    const getValidatedParam = (paramName, validKeys) => {
        let param = urlParams.get(paramName);
        if (!param) return '';

        param = param.toUpperCase();
        return validKeys.includes(param) ? param : '';
    };

    let params = {
        'company-name': urlParams.get('company-name') || '',
        'company-cik': urlParams.get('company-cik') || '',
        'executed-at': getValidatedParam('executed-at', Object.keys(DATES)),
        'filed-at': getValidatedParam('filed-at', Object.keys(DATES)),
        'type': getValidatedParam('type', Object.keys(TYPES))
    }

    // --- table ---
    let main = document.querySelector('main');
    let table = initTradeTable(main, params);

    // --- filters 1 ---
    let filters1 = document.getElementById('filters-1');
    let input = filters1.querySelector('input');

    input.value = params['company-name'];

    initCompanySearch(filters1, (value, hint) => {
        params['company-name'] = value;
        params['company-cik'] = hint || '';

        input.value = value;
        table = updateTable(main, table, params);
    });

    // --- filters 2 ---
    let filters2 = document.getElementById('filters-2');

    initDropdown(filters2, 'Transaction', params['type'], TYPES, (_, value) => {
        params['type'] = value;
        table = updateTable(main, table, params);
    });

    initDropdown(filters2, 'Executed at', params['executed-at'], DATES, (_, value) => {
        params['executedAt'] = value;
        table = updateTable(main, table, params);
    });

    initDropdown(filters2, 'Filed at', params['filed-at'], DATES, (_, value) => {
        params['filtedAt'] = value;
        table = updateTable(main, table, params);
    });

});

function updateTable(main, table, params) {
    table.tag.remove();
    return initTradeTable(main, params);
}