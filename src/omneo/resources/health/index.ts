import { Omneo } from '../..'

export default async function health (this: Omneo): Promise<{ status: number, statusText: string}> {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`
  })

  const url = this.baseURL.replace('/api/v3', '/api/health')
  const { status, statusText } = await fetch(url, {
    method: 'get',
    headers
  })

  return { status, statusText }
}
