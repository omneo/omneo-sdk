import { Omneo } from '..'
import { Transaction, RequestParams } from '../types'

async function listTransactions (this: Omneo, params: RequestParams): Promise<Array<Transaction>> {
  return this.call({
    method: 'get',
    endpoint: '/transactions',
    params
  }).then((response) => {
    return response.data
  })
}

export default listTransactions
