import { Omneo } from '..'
import { Address, AddressUpdateRequest } from '../types'

async function updateProfileAddress (this: Omneo, profileID: string, addressID: string, body: AddressUpdateRequest): Promise<Address> {
  return this.call({
    method: 'put',
    endpoint: `/profiles/${profileID}/addresses/${addressID}`,
    body
  }).then((response) => {
    return response.data
  })
}

export default updateProfileAddress
