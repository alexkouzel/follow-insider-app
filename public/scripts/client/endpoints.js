import { Config } from '/scripts/config.js';
import { Insider, Company, Trade, Form, Log } from './entities.js';
import * as http from './http.js';

export class Insiders {
    static path = '/insiders';

    static getPage(page = 0) {
        let url = `${path}?page=${page}`;
        return http.getEntities(url, json => new Insider(json));
    }

    static getByCik(cik) {
        let url = `${path}/${cik}`;
        return http.getEntity(url, json => new Insider(json));
    }

    static getFormsByCik(cik) {
        let url = `${path}/${cik}/forms`;
        return http.getEntities(url, json => new Form(json));
    }
}

export class Companies {

}

export class Search {

}

export class Forms {
    static path = '/forms';

    static getPage(page = 0) {
        if (Config.debugMode) {
            return mockForms();
        }
        let url = `${path}?page=${page}`;
        return http.getEntities(url, json => new Form(json));
    }
}

export class Logs {
    static path = '/logs';

    static getAll(level, limit, inverse) {
        let url = `${path}?level=${level}&limit=${limit}&inverse=${inverse}`;
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
        'filedAt': '-- filedAt --',
        'xmlUrl': 'https://www.sec.gov/Archives/edgar/data/718937/000091957423006577/xslF345X03/ownership.xml'
    });
    return [form];
}

function mockTrades() {
    let trade = new Trade({
        'securityTitle': 'Common Stock',
        'shareCount': 100.0,
        'sharePrice': 10.0,
        'sharePriceFootnote': null,
        'executedAt': '-- executedAt --',
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