import { Form, FormTrade, Trade, Insider, Company } from './models.js';

const FORM_XML_URL = 'https://www.sec.gov/Archives/edgar/data/718937/000091957423006577/xslF345X03/ownership.xml';

const COMPANIES = [
    ['Apple Inc.', 'AAPL'],
    ['MICROSOFT CORP', 'MSFT'],
    ['NVIDIA CORP', 'NVDA'],
    ['ELECTRAMECCANICA VEHICLES CORP.', 'SOLO'],
    ['AMAZON COM INC', 'AMZN'],
    ['Meta Platforms, Inc.', 'META'],
    ['UNIVERSAL BIOSENSORS INC', 'UBI'],
    ['View, Inc.', 'VIEW'],
    ['ELI LILLY & Co', 'LLY'],
    ['Tesla, Inc.', 'TSLA']
]

const INSIDERS = [
    'Musk Elon',
    'Musk Kimbal',
    'Mizuno Hiromichi',
    'DENHOLM ROBYN M',
    'Wilson-Thompson Kathleen',
    'Taneja Vaibhav',
    'Baglino Andrew D',
    'Branderiz Eric',
    'MURDOCH JAMES R',
    'Buss Brad W'
]

const INSIDER_TITLES = [
    '10% Owner',
    'Director',
    'Officer',
    'Other'
]

const TRADE_SECURITY_TITLES = [
    'Common Stock',
    'Restricted Stock'
]

const TRADE_TYPES = [
    'Buy',
    'Sell'
]

export function mockForms(count) {
    return Array.from({ length: count }, (_, idx) => mockForm(idx));
}

export function mockForm(idx) {
    return new Form({
        'accNo': '0000000000-00-000000',
        'company': mockCompany(idx),
        'insider': mockInsider(idx),
        'insiderTitles': mockInsiderTitles(),
        'trades': mockFormTrades(Math.floor(Math.random() * 2)),
        'filedAt': Math.floor(Math.random() * 1_000_000_000),
        'xmlUrl': FORM_XML_URL
    });
}

export function mockTrades(count, params) {
    return Array.from({ length: count }, (_, idx) => mockTrade(idx, params));
}

export function mockTrade(idx, params) {
    return new Trade({
        'company': mockCompany(idx, params),
        'insider': mockInsider(idx),
        'insiderTitles': mockInsiderTitles(),
        'type': params['type'] === 'All' ? random(TRADE_TYPES) : params['type'],
        'shareCount': Math.floor(Math.random() * 1_000),
        'sharePrice': Math.random() * 100,
        'sharesLeft': Math.floor(Math.random() * 1_000_000),
        'valueLeft': null,
        'executedAt': Math.floor(Math.random() * 1_000_000_000),
        'xmlUrl': FORM_XML_URL
    });
}

export function mockFormTrades(count) {
    return Array.from({ length: count }, () => mockFormTrade());
}

export function mockFormTrade() {
    return new FormTrade({
        'securityTitle': random(TRADE_SECURITY_TITLES),
        'sharePrice': Math.random() * 100,
        'shareCount': Math.floor(Math.random() * 1_000),
        'executedAt': Math.floor(Math.random() * 1_000_000_000),
        'sharesLeft': Math.floor(Math.random() * 1_000_000),
        'valueLeft': null,
        'type': random(TRADE_TYPES)
    });
}

export function mockInsiders(count) {
    return Array.from({ length: count }, (_, idx) => mockInsider(idx));
}

export function mockInsider(idx) {
    return new Insider({
        'cik': '0000000000',
        'name': INSIDERS[idx % INSIDERS.length]
    });
}

export function mockCompanies(count) {
    return Array.from({ length: count }, (_, idx) => mockCompany(idx));
}

export function mockCompany(idx, params) {
    return new Company({
        'cik': '0000000000',
        'name': params['company-name'] ? params['company-name'] : COMPANIES[idx % COMPANIES.length][0],
        'ticker': params['company-ticker'] ? params['company-ticker'] : COMPANIES[idx % COMPANIES.length][1],
        'exchange': null
    });
}

function mockInsiderTitles() {
    let count = Math.floor(Math.random() * 2) + 1;

    let result = Array.from({ length: count }, () => random(INSIDER_TITLES));
    result = [...new Set(result)];

    return result;
}

function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}