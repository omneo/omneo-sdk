const TENANT = process.env.OMNEO_TENANT
const TOKEN = process.env.OMNEO_TOKEN
type RequestInit = {
    method: string
    headers: {
        'Content-Type': string
        Authorization: string
    }
    body?: string
}
export default function simpleOmneoRequest (method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, body?: any) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`
    }
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  return fetch(`https://api.${TENANT}.getomneo.com/api/v3${endpoint}`, options).then(response => {
    if (response.status === 204 || response.status === 404) {
      // Omneo delete operations just return 204 with no body.
      return {
        status: response.status,
        statusText: response.statusText
      }
    }
    return response.json()
  }).catch(error => {
    console.log('Simple Omneo request function error', error)
  })
}
