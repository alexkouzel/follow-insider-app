import { Config } from '/scripts/config.js';
import { Insider, Company, Trade, Form, Log } from './models.js';
import * as http from './http.js';

const serverUrl = Config.serverUrl;

export class Insiders {
    static getPage(page = 0) {
        let url = `${serverUrl}/insiders?page=${page}`;
        return http.getModels(url, json => new Insider(json));
    }

    static getByCik(cik) {
        let url = `${serverUrl}/insiders/${cik}`;
        return http.getEntity(url, json => new Insider(json));
    }

    static getFormsByCik(cik) {
        let url = `${serverUrl}/insiders/${cik}/forms`;
        return http.getModels(url, json => new Form(json));
    }
}

export class Companies {

}

export class Search {

}

export class Forms {
    static getPage(page = 0) {
        if (Config.debugMode) {
            return mockForms();
        }
        let url = `${serverUrl}/forms?page=${page}`;
        return http.getModels(url, json => new Form(json));
    }

    static getCount() {
        if (Config.debugMode) {
            return 1000;
        }
        let url = `${serverUrl}/forms/count`;
        return parseInt(http.getText(url));
    }
}

export class Logs {
    static getAll(level, limit, inverse) {
        let url = `${serverUrl}/logs?level=${level}&limit=${limit}&inverse=${inverse}`;
        return http.getEntity(url, json => new Log(json));
    }
}

function mockForms() {
    let form = new Form({
        'accNo': '0000919574-23-006577',
        'trades': mockTrades(),
        'company': mockCompany(),
        'insider': mockInsider(),
        'insiderTitles': ['10% Owner', 'Director'],
        'filedAt': 1723658480,
        'xmlUrl': 'https://www.sec.gov/Archives/edgar/data/718937/000091957423006577/xslF345X03/ownership.xml'
    });
    return Array.from({length: 10}, () => form);
}

function mockTrades() {
    let trade = new Trade({
        'securityTitle': 'Common Stock',
        'shareCount': 100.0,
        'sharePrice': 10.0,
        'executedAt': 1723658480,
        'sharesLeft': 1000.0,
        'valueLeft': null,
        'type': 'BUY'
    });
    return [trade];
}

function mockInsider() {
    return new Insider({
        'cik': '0001278386',
        'name': 'BROADWOOD PARTNERS, L.P.'
    });
}

function mockCompany() {
    return new Company({
        'cik': '0000718937',
        'name': 'STAAR SURGICAL CO',
        'ticker': 'STAA',
        'exchange': null
    });
}