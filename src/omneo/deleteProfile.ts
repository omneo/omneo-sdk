import { Omneo } from '..'
import { Transaction } from '../types'

async function deleteProfile (this: Omneo, id: string): Promise<Transaction> {
  return this.call({
    method: 'delete',
    endpoint: `/profiles/${id}`
  }).then((response) => {
    return response.data
  })
}

export default deleteProfile
