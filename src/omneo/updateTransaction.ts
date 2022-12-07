import { Omneo } from '..'
import { Transaction } from '../types'

async function updateTransaction (this: Omneo, id: string, body: any): Promise<Transaction> {
  return this.call({
    method: 'put',
    endpoint: `/transactions/${id}`,
    body
  }).then((response) => {
    return response.data
  })
}

export default updateTransaction
