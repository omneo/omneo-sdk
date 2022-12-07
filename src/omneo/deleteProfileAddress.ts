import { Omneo } from '..'
import { Address } from '../types'

async function deleteProfileAddress (this: Omneo, profileID: string, addressID: string): Promise<Address> {
  return this.call({
    method: 'delete',
    endpoint: `/profiles/${profileID}/addresses/${addressID}`
  }).then((response) => {
    return response.data
  })
}

export default deleteProfileAddress
