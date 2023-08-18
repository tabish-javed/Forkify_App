import { TIMEOUT_SECONDS } from "./config";


const timeout = function (seconds) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${seconds} second`));
        }, seconds * 1000);
    });
};


export async function getJSON (url) {
    try {
        const fetchCode = fetch(url);
        const response = await Promise.race([fetchCode, timeout(TIMEOUT_SECONDS)]);
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);
        return data;
    } catch (error) {
        throw error;
    }
}


export async function sendJSON (url, uploadData) {
    try {
        const fetchCode = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        });
        const response = await Promise.race([fetchCode, timeout(TIMEOUT_SECONDS)]);
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);
        return data;
    } catch (error) {
        throw error;
    }
}