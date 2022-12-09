import { Omneo } from '..'
import { InteractionRequest, Interaction } from '../types'

async function createProfileInteraction (this: Omneo, profileID: string, body: InteractionRequest): Promise<Interaction> {
  return this.call({
    method: 'post',
    endpoint: `/profiles/${profileID}/identities`,
    body
  }).then((response) => {
    return response.data
  })
}

export default createProfileInteraction
