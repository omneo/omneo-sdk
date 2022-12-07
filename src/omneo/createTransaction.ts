import { Omneo } from '..'
import { Transaction } from '../types'

async function createTransaction (this: Omneo, body: any): Promise<Transaction> {
  return this.call({
    method: 'post',
    endpoint: '/transactions',
    body
  }).then((response) => {
    return response.data
  })
}

export default createTransaction
