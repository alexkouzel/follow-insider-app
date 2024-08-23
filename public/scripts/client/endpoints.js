import { Config } from '/scripts/config.js';
import { Insider, Company, Trade, FormTrade, Form, Log } from './models.js';
import { mockForms, mockInsider, mockInsiders, mockTrades } from './mocker.js';
import * as http from './http.js';

const serverUrl = Config.serverUrl;

export class Insiders {
    static async getPage(page = 0, pageSize = 10) {

        if (Config.debugMode) {
            await debugDelay();
            return mockInsiders(pageSize);
        }

        let url = `${serverUrl}/insiders?page=${page}`;
        return await http.getModels(url, json => new Insider(json));
    }

    static async getByCik(cik) {

        if (Config.debugMode) {
            await debugDelay();
            return mockInsider();
        }

        let url = `${serverUrl}/insiders/${cik}`;
        return await http.getEntity(url, json => new Insider(json));
    }

    static async getFormsByCik(cik) {

        if (Config.debugMode) {
            await debugDelay();
            return mockForms(4);
        }

        let url = `${serverUrl}/insiders/${cik}/forms`;
        return await http.getModels(url, json => new Form(json));
    }
}

export class Companies {

}

export class Search {

}

export class Forms {
    static async getPage(page = 0, pageSize = 10) {

        if (Config.debugMode) {
            await debugDelay();
            return mockForms(pageSize);
        }

        let url = `${serverUrl}/forms?page=${page}`;
        return await http.getModels(url, json => new Form(json));
    }

    static async getCount() {

        if (Config.debugMode) {
            await debugDelay();
            return 1000;
        }

        let url = `${serverUrl}/forms/count`;
        return parseInt(await http.getText(url));
    }
}

export class Trades {
    static async getPage(page = 0, pageSize = 10, params) {

        if (Config.debugMode) {
            await debugDelay();
            return mockTrades(pageSize, params);
        }

        let url = `${serverUrl}/trades?page=${page}?${this._formatParams(params)}`;
        return await http.getModels(url, json => new TradeDto(json));
    }

    static async getCount(params) {

        if (Config.debugMode) {
            await debugDelay();
            return 1000;
        }

        let url = `${serverUrl}/trades/count?${this._formatParams(params)}`;
        return parseInt(await http.getText(url));
    }

    static _formatParams(params) {
        let type = {
            'All': '',
            'Buy': 'buy',
            'Sell': 'sell'
        }
    
        let executedAt = {
            'All': '',
            'Today': 'd1',
            'Last 7 Days': 'd7',
            'Last 31 Days': 'd31'
        }

        params['type'] = type[params['type']];
        params['executedAt'] = executedAt[params['executedAt']];

        return formatParams(params);
    }
}

export class Logs {
    static async getAll(level, limit, inverse) {
        let url = `${serverUrl}/logs?level=${level}&limit=${limit}&inverse=${inverse}`;
        return await http.getEntity(url, json => new Log(json));
    }
}

function debugDelay() {
    return new Promise(resolve => setTimeout(resolve, Config.debugDelay));
}

function formatParams(params) {
    if (!params) return '';
    return Object
        .keys(params)
        .map(key => key + '=' + params[key])
        .filter(val => val)
        .join('&');
}