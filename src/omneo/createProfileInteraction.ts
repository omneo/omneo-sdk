import { Omneo } from '..'
import { InteractionRequest, Interaction } from '../types'

async function createInteraction (this: Omneo, body: InteractionRequest): Promise<Interaction> {
  return this.call({
    method: 'post',
    endpoint: '/interactions',
    body
  }).then((response) => {
    return response.data
  })
}

export default createInteraction
