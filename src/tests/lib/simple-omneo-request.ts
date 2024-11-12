const TENANT = process.env.OMNEO_TENANT
const TOKEN = process.env.OMNEO_TOKEN

export default function simpleOmneoRequest(method: "GET" | "POST" | "PUT" | "DELETE", endpoint: string, body?: any) {
    return fetch(`https://api.${TENANT}.getomneo.com/api/v3${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }
    }).then(response => {
        if(response.status === 204) {
            // Omneo delete operations just return 204 with no body.
            return {
                status: response.status,
                statusText: response.statusText
            }
        }
        return response.json()
    }).catch(error => {
        console.log('Simple Omneo request function error', error);
    });
}
