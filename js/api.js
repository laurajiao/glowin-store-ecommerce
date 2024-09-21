
export function apiRequest(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
}