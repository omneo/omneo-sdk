import { Omneo } from '..'
import { CommsChannel, ProfileComms } from '../types'

async function subscribe (this: Omneo, profileID: string, channel: CommsChannel): Promise<ProfileComms> {
  return this.call({
    method: 'put',
    endpoint: `/profiles/${profileID}/comms`,
    body: {
      [`${channel}_optout`]: false,
      [`${channel}_promo`]: true
    }
  }).then((response: any) => {
    return response.data?.[0]
  })
}

export default subscribe
