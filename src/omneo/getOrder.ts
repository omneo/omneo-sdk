import { Omneo } from '..'
import { RequestParams } from '../types'

async function getOrder (this: Omneo, id: string, params: RequestParams): Promise<any> { // TODO Create and use order type
  return this.call({
    method: 'get',
    endpoint: `/orders/${id}`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getOrder
