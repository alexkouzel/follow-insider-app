export function capitalize(value) {
    return value.charAt(0).toUpperCase()
        + value.slice(1).toLowerCase();
}

export function formatNumber(value) {
    value = Math.abs(Number(value));
    if (value >= 1.0e+9) return (value / 1.0e+9).toFixed(2) + 'B';
    if (value >= 1.0e+6) return (value / 1.0e+6).toFixed(2) + 'M';
    if (value >= 1.0e+3) return (value / 1.0e+3).toFixed(2) + 'K';
    return value.toFixed(0);
}

export function formatDate(value, options) {
    options = options || { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(value).toLocaleDateString('en-US', options);
}

export function formatMoney(value, currency) {
    return currency + value.toFixed(2);
}