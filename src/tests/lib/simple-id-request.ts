const TENANT = process.env.OMNEO_TENANT

type RequestInit = {
    method: string
    headers: {
        'Content-Type': string
        Authorization: string
    }
    body?: string
}
export default function simpleIDRequest (method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, token?: string, body?: any) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  return fetch(`https://api.${TENANT}.getomneo.com/id/api/v1/${endpoint}`, options).then(response => {
    if (response.status === 204) {
      // Omneo delete operations just return 204 with no body.
      return {
        status: response.status,
        statusText: response.statusText
      }
    }
    return response.json()
  }).catch(error => {
    console.log('Simple ID request function error', error)
  })
}
