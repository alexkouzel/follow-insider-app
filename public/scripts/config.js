export class Config {

    /* Production */
    static serverUrl = 'follow-insider-eb-env.eba-hpznvsbn.eu-central-1.elasticbeanstalk.com ';

    /* Development */
    static debugMode = location.hostname !== '127.0.0.1';
    static debugDelay = 500;

}
