import IDResource from '../resource'

export default class Auth extends IDResource {
// Id could be an omneo ID, or and identity (identifier) when id_handle is present
  requestAuthToken (body: { id: string, id_handle?: string }): Promise<any> {
    return fetch(`${this.client.baseURL}/auth/token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.client.omneoAPIToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then(({ data }) => {
        this.client.IDToken = data?.token
        this.client.IDTokenExp = data?.exp
        return data
      })
  }

  isTokenExpired () {
    if (!this.client.IDTokenExp) return true
    const currentTime = Math.floor(Date.now() / 1000)
    return this.client.IDTokenExp < currentTime
  }

  getProfileID () {
    const tokenParts = this.client.IDToken.split('.')
    const encodedPayload = tokenParts[1]
    const tokenData = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'))
    return tokenData?.pid
  }
}
