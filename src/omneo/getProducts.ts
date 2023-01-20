import { Omneo } from '..'
import { RequestParams } from '../types'

async function getProducts (this: Omneo, params: RequestParams): Promise<any> {
  return this.call({
    method: 'get',
    endpoint: 'products',
    params
  }).then((response) => {
    return response.data
  })
}

export default getProducts
