import { Omneo } from '..'

async function checkAvailability (this: Omneo, body: { mobile_phone?: string, email?: string }): Promise<any> {
  return this.call({
    method: 'post',
    endpoint: '/profiles/availability',
    body
  }).then((response) => {
    return response.data
  })
}

export default checkAvailability
