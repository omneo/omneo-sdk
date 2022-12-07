import { Omneo } from '..'
import { Transaction } from '../types'

async function deleteTransaction (this: Omneo, id: string): Promise<Transaction> {
  return this.call({
    method: 'post',
    endpoint: `/transactions/${id}`
  }).then((response) => {
    return response.data
  })
}

export default deleteTransaction
