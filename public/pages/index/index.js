import { initCompanySearch } from '/scripts/modules/company_search.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // init company search
    let searchTag = document.querySelector('.search');
    initCompanySearch(searchTag);

});