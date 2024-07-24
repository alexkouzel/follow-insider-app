export function post(url) {
    return request(url, { method: 'POST' });
}

export function postJson(url, json) {
    return postData(url, 'application/json', JSON.stringify(json));
}

export function postForm(url, form) {
    contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
    return postData(url, contentType, new URLSearchParams(form));
}

export function getText(url) {
    return getData(url, 'text/plain', data => data.text());
}

export function getJson(url) {
    return getData(url, 'application/json', data => data.json());
}

async function postData(url, contentType, body) {
    return await request(url, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body: body,
    });
}

async function getData(url, accept, convert) {
    const data = await request(url, {
        method: 'GET',
        headers: { 'Accept': accept },
    });
    if (!data) {
        throw new Error('Invalid data');
    }
    return convert(data);
}

async function request(url, props) {
    console.log(props.method + ' ' + props.url);

    // Ensure redirects are followed automatically
    props['redirect'] = 'follow';

    const response = await fetch(location.origin + url, props);
    return handleResponse(response);
}

function handleResponse(response) {
    if (response.redirected) {
        window.location.href = response.url;
    }
    if (response.ok) {
        return response;
    }
    return response.json().then(errorData => {
        throw new Error(errorData.message || response.statusText);
    });
}