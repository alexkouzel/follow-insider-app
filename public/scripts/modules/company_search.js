import { SearchBar } from '/scripts/visuals/search.js';

export function initCompanySearch(tag) {
    let loadHints = async (text) => {
        return {
            'Apple Inc. (AAPL)': '320193',
            'MICROSOFT CORP (MSFT)': '789019',
            'NVIDIA CORP (NVDA)': '1045810',
            'ELECTRAMECCANICA VEHICLES CORP. (SOLO)': '1637736',
            'AMAZON COM INC (AMZN)': '1018724',
            'Meta Platforms, Inc. (META)': '1326801',
            'UNIVERSAL BIOSENSORS INC (UBI)': '1279695',
            'View, Inc. (VIEW)': '1811856'
        };
    };

    let onSearch = (isHint, value) => {
        console.log(isHint + ' ' + value);
    };

    return new SearchBar(tag, loadHints, onSearch);
}