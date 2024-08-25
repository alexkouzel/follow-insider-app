import { initCompanySearch } from '/scripts/modules/company_search.js';

document.addEventListener('DOMContentLoaded', () => {

    // company search
    let searchTag = document.querySelector('.search');

    initCompanySearch(searchTag, (value, hint) => {
        if (hint) {
            window.location.assign(`/trades?companyName=${value}&companyCik=${hint}`);
        } else {
            window.location.assign(`/trades?companyName=${value}`);
        }
    });

});