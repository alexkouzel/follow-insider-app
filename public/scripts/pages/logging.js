import { formatDate } from '/scripts/common/utils/string.js';
import { Logs } from '/scripts/client/endpoints.js'

initLogs(main);

function initLogs() {
    let container = document.querySelector('main');
    let logs = Logs.getAll()
    insertLogs(logs, container);
}

let LOG_COLORS = {
    'TRACE': '#8a50a9',
    'DEBUG': '#485aab',
    'INFO': '#69916a',
    'WARN': '#c5ae53',
    'ERROR': '#b44b4b',
}

function insertLogs(logs, container) {
    logs.forEach(log => insertLog(log, container));
}

function insertLog(log, container) {
    let color = LOG_COLORS[log.type];

    let dateOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    let date = formatDate(log.date, dateOptions);

    let logTag = document.createElement('p');
    logTag.innerHTML = `
        <span class="log-date">${date}</span>  
        <span style="font-weight: 500; color: ${color}">${log.type}</span>  ---  
        ${log.message}
    `;

    if (log.stackTrace) {
        insertStackTrace(log.stack_trace, logTag);
    }

    container.appendChild(logTag);
}

function insertStackTrace(stack_trace, container) {
    let throwPaths = stack_trace.split('\n');
    let stackTrace = document.createElement('div');
    
    stackTrace.classList.add('stack-trace');
    stackTrace.innerHTML = `<p>${throwPaths[0]} ...</p>`;

    stackTrace.onclick = function () {
        stackTrace.innerHTML = throwPaths.map(line => `<p>${line}</p>`).join('');
        stackTrace.style.cursor = 'auto';
        stackTrace.onclick = null;
    }
    container.after(stackTrace);
}