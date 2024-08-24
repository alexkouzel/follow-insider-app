import { Config } from '/scripts/config.js';
import { Insider, Company, Form, Trade } from './models.js';
import { Mocker } from './mocker.js';
import * as http from '/scripts/utils/http.js';

const serverUrl = Config.serverUrl;

export class Insiders {
    static async page(page, pageSize = 10) {

        if (Config.debugMode) {
            await debugDelay();
            return Mocker.insiders(pageSize);
        }

        let url = `${serverUrl}/insiders?page=${page}`;
        return await http.getModels(url, json => new Insider(json));
    }

    static async cik(cik) {

        if (Config.debugMode) {
            await debugDelay();
            return Mocker.insider();
        }

        let url = `${serverUrl}/insiders/${cik}`;
        return await http.getModel(url, json => new Insider(json));
    }

    static async forms(cik) {

        if (Config.debugMode) {
            await debugDelay();
            return Mocker.forms(4, true);
        }

        let url = `${serverUrl}/insiders/${cik}/forms`;
        return await http.getModels(url, json => new Form(json));
    }

    static async search(text, limit) {

        if (Config.debugMode) {
            await debugDelay();
            return Mocker.insiders(limit);
        }

        let url = `${serverUrl}/insiders/search?text=${text}&limit=${limit}`;
        return await http.getModels(url, json => new Insider(json));
    }
}

export class Companies {
    static async page(page, pageSize = 10) {

        if (Config.debugMode) {
            await debugDelay();
            return Mocker.companies(pageSize);
        }

        let url = `${serverUrl}/companies?page=${page}`;
        return await http.getModels(url, json => new Company(json));
    }

    static async cik(cik) {

        if (Config.debugMode) {
            await debugDelay();
            return Mocker.company();
        }

        let url = `${serverUrl}/companies/${cik}`;
        return await http.getModel(url, json => new Company(json));
    }

    static async forms(cik) {

        if (Config.debugMode) {
            await debugDelay();
            return Mocker.forms(4, true);
        }

        let url = `${serverUrl}/companies/${cik}/forms`;
        return await http.getModels(url, json => new Form(json));
    }

    static async search(text, limit) {

        if (Config.debugMode) {
            await debugDelay();
            return Mocker.companies(limit);
        }

        let url = `${serverUrl}/companies/search?text=${text}&limit=${limit}`;
        return await http.getModels(url, json => new Company(json));
    }
}

export class Forms {
    static async page(page, pageSize = 10) {

        if (Config.debugMode) {
            await debugDelay();
            return Mocker.forms(pageSize, true);
        }

        let url = `${serverUrl}/forms?page=${page}`;
        return await http.getModels(url, json => new Form(json));
    }

    static async count() {

        if (Config.debugMode) {
            await debugDelay();
            return 1000;
        }

        let url = `${serverUrl}/forms/count`;
        return parseInt(await http.getText(url));
    }
}

export class Trades {
    static async page(page = 0, pageSize = 10, params) {

        if (Config.debugMode) {
            await debugDelay();
            return Mocker.trades(pageSize, true);
        }

        let url = `${serverUrl}/trades?page=${page}${formatParams(params)}`;
        return await http.getModels(url, json => new Trade(json));
    }

    static async count(params) {

        if (Config.debugMode) {
            await debugDelay();
            return 1000;
        }

        let url = `${serverUrl}/trades/count${formatParams(params)}`;
        return parseInt(await http.getText(url));
    }
}

function debugDelay() {
    return new Promise(resolve => setTimeout(resolve, Config.debugDelay));
}

function formatParams(params) {
    if (!params) return '';
    return '?' + Object
        .keys(params)
        .map(key => key + '=' + params[key])
        .filter(val => val)
        .join('&');
}