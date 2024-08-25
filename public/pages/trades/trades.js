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
        'companyName': urlParams.get('companyName') || '',
        'companyCik': urlParams.get('companyCik') || '',
        'executedAt': getValidatedParam('executedAt', Object.keys(DATES)),
        'filedAt': getValidatedParam('filedAt', Object.keys(DATES)),
        'type': getValidatedParam('type', Object.keys(TYPES))
    }

    // --- table ---
    let main = document.querySelector('main');
    let table = initTradeTable(main, paramsToFilters(params));

    // --- filters 1 ---
    let filters1 = document.getElementById('filters-1');
    let input = filters1.querySelector('input');

    input.value = params['companyName'];

    initCompanySearch(filters1, (value, hint) => {
        params['companyName'] = value;
        params['companyCik'] = hint || '';

        input.value = value;
        table = updateTable(main, table, params);
    });

    // --- filters 2 ---
    let filters2 = document.getElementById('filters-2');

    initDropdown(filters2, 'Transaction', params['type'], TYPES, (_, value) => {
        params['type'] = value;
        table = updateTable(main, table, params);
    });

    initDropdown(filters2, 'Executed at', params['executedAt'], DATES, (_, value) => {
        params['executedAt'] = value;
        table = updateTable(main, table, params);
    });

    initDropdown(filters2, 'Filed at', params['filedAt'], DATES, (_, value) => {
        params['filedAt'] = value;
        table = updateTable(main, table, params);
    });

});

function updateTable(main, table, params) {
    table.tag.remove();
    let filters = paramsToFilters(params);
    return initTradeTable(main, filters);
}

function convertDate(date) {
    if (!date) return null;

    let day = 24 * 60 * 60 * 1000;

    let types = {
        'D': day,
        'W': day * 7,
        'M': day * 30,
        'Y': day * 365
    }

    let now = new Date();
    let number = parseInt(date.substring(1));

    return new Date(now - number * types[date.charAt(0)]);
}

function paramsToFilters(params) {
    let filters = Object.assign({}, params);
    
    filters['companyName'] = params['companyName'] ? params['companyName'] : null;
    filters['companyCik'] = params['companyCik'] ? parseInt(params['companyCik']) : null;
    filters['executedAt'] = convertDate(params['executedAt']);
    filters['filedAt'] = convertDate(params['filedAt']);
    filters['type'] = params['type'] ? params['type'] : null;
    
    return filters;
}