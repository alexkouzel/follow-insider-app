import { initTradeTable } from '/scripts/modules/trade_table.js';
import * as footer from '/scripts/visuals/components/footer.js'

init();

function init() {
    let main = document.querySelector('main');
    initTradeTable(main);
}
