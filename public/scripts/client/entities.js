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

export class Trade {
    constructor({ securityTitle, shareCount, sharePrice, sharePriceFootnote, executedAt, sharesLeft, valueLeft, type }) {
        this.securityTitle = securityTitle;
        this.shareCount = shareCount;
        this.sharePrice = sharePrice;
        this.sharePriceFootnote = sharePriceFootnote;
        this.executedAt = executedAt;
        this.sharesLeft = sharesLeft;
        this.valueLeft = valueLeft;
        this.type = type;
    }
}

export class Form {
    constructor({ accNo, trades, company, insider, insiderTitles, filedAt, xmlUrl }) {
        this.accNo = accNo;
        this.trades = trades.map(trade => new Trade(trade));
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