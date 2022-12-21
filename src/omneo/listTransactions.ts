import { Omneo } from '..'
import { Transaction, RequestParams } from '../types'

async function listTransactions (this: Omneo, params: RequestParams): Promise<{data: Array<Transaction>, links: any, meta: any}> {
  return this.call({
    method: 'get',
    endpoint: '/transactions',
    params
  }).then((response: any) => {
    return response
  })
}

export default listTransactions
