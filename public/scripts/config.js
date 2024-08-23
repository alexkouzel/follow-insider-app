export class Config {
    static debugMode = location.hostname === '127.0.0.1';
    static debugDelay = 500;
    
    static serverUrl = 'http://localhost:5000';
}
