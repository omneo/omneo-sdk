import { Omneo } from '..'
import { RequestParams } from '../types'

async function listOrders (this: Omneo, params: RequestParams): Promise<{data: Array<any>, links: any, meta: any}> { // TODO Create and use order type
  return this.call({
    method: 'get',
    endpoint: '/orders',
    params
  }).then((response: any) => {
    return response
  })
}

export default listOrders
