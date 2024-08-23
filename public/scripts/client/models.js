export class Insider {
    constructor({ cik, name }) {
        this.cik = cik;
        this.name = name;
    }
}

export class Company {
    constructor({ cik, name, ticker, exchange }) {
        this.cik = cik;
        this.name = name;
        this.ticker = ticker;
        this.exchange = exchange;
    }
}

export class FormTrade {
    constructor({ securityTitle, shareCount, sharePrice, executedAt, sharesLeft, valueLeft, type }) {
        this.securityTitle = securityTitle;
        this.shareCount = shareCount;
        this.sharePrice = sharePrice;
        this.executedAt = new Date(executedAt);
        this.sharesLeft = sharesLeft;
        this.valueLeft = valueLeft;
        this.type = type;
    }
}

export class Trade {
    constructor({ company, insider, insiderTitles, type, shareCount, sharePrice, sharesLeft, valueLeft, executedAt, xmlUrl }) {
        this.company = company;
        this.insider = insider;
        this.insiderTitles = insiderTitles;
        this.type = type;
        this.shareCount = shareCount;
        this.sharePrice = sharePrice;
        this.sharesLeft = sharesLeft;
        this.valueLeft = valueLeft;
        this.executedAt = new Date(executedAt);
        this.xmlUrl = xmlUrl;
    }
}

export class Form {
    constructor({ accNo, trades, company, insider, insiderTitles, filedAt, xmlUrl }) {
        this.accNo = accNo;
        this.trades = trades.map(trade => new FormTrade(trade));
        this.company = new Company(company);
        this.insider = new Insider(insider);
        this.insiderTitles = insiderTitles;
        this.filedAt = filedAt;
        this.xmlUrl = xmlUrl;
    }
}

export class Log {
    constructor({ timestamp, threadName, logLevel, loggerName, message, stackTrace }) {
        this.timestamp = timestamp;
        this.threadName = threadName;
        this.logLevel = logLevel;
        this.loggerName = loggerName;
        this.message = message;
        this.stackTrace = stackTrace;
    }
}