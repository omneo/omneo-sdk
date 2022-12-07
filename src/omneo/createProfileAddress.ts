import { Omneo } from '..'
import { Address, AddressRequest } from '../types'

async function createProfileAddress (this: Omneo, profileID: string, body: AddressRequest): Promise<Address> {
  return this.call({
    method: 'post',
    endpoint: `/profiles/${profileID}/addresses`,
    body
  }).then((response) => {
    return response.data
  })
}

export default createProfileAddress
