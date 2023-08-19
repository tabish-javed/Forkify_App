import { TIMEOUT_SECONDS } from "./config";


const timeout = function (seconds) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${seconds} second`));
        }, seconds * 1000);
    });
};


export async function AJAX (url, uploadData = undefined) {
    try {
        const fetchCode = uploadData ?
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uploadData)
            }) : fetch(url);
        const response = await Promise.race([fetchCode, timeout(TIMEOUT_SECONDS)]);
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);
        return data;
    } catch (error) {
        throw error;
    }
}

/*
export async function getJSON (url) {

}


export async function sendJSON (url, uploadData) {
    try {
        const fetchCode =
        const response = await Promise.race([fetchCode, timeout(TIMEOUT_SECONDS)]);
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);
        return data;
    } catch (error) {
        throw error;
    }
}
*/