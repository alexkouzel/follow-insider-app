export function getLastUrlSegment() {
    let url = location.href.split('?')[0];
    let segments = url.split('/');
    return segments.pop() || segments.pop();
}