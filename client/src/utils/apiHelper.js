// helper function to make fetch requests
export const apiHelper = (
    path,
    method = 'GET',
    body = null,
    credentials = null
    ) => {
        const url = 'http://localhost:5000/api' + path;

        const fetchOptions = {
            method,
            headers: {}
        };

        if (body) {
            fetchOptions.body = JSON.stringify(body);
            fetchOptions.headers['Content-Type'] = 'application/json; charset=utf-8';
        }

        if (credentials) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            fetchOptions.headers.Authorization = `Basic ${encodedCredentials}`;
        }

        return fetch(url, fetchOptions);
    };