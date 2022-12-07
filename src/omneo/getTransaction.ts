import { Omneo } from '..'
import { Transaction, RequestParams } from '../types'

async function getTransaction (this: Omneo, id: string, params: RequestParams): Promise<Transaction> {
  return this.call({
    method: 'get',
    endpoint: `/transactions/${id}`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getTransaction
