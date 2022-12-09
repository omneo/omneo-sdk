import { Omneo } from '..'
import { CommsChannel, ProfileComms } from '../types'

async function unsubscribe (this: Omneo, profileID: string, channel: CommsChannel, options: {toggleOptOut: boolean}): Promise<ProfileComms> {
  const body = {
    [`${channel}_promo`]: false
  }

  if (options.toggleOptOut) body[`${channel}_optout`] = true

  return this.call({
    method: 'put',
    endpoint: `/profiles/${profileID}/comms`,
    body
  }).then((response: any) => {
    return response.data?.[0]
  })
}

export default unsubscribe
