import { Insider, Company, Trade, Form, Log } from 'entities.js'
import * as http from 'http.js'

export class Insiders {
    static path = '/insiders';

    static getPage(page = 0) {
        json = http.getJson(`${path}?page=${page}`);
        return json.map(obj => new Insider(obj));
    }
    
    static getByCik(cik) {
        json = http.getJson(`${path}/${cik}`);
        return new Insider(json);
    }
    
    static getFormsByCik(cik) {
        json = http.getJson(`${path}/${cik}/forms`);
        return json.map(obj => new Form(obj));
    }
}

export class Companies {

}

export class Search {

}

export class Logs {
    static path = '/logs';

    static getAll(level, limit, inverse) {
        json = http.getJson(`${path}?level=${level}&limit=${limit}&inverse=${inverse}`);
        return json.map(obj => new Log(obj));
    }
}