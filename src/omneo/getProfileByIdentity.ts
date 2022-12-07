import { Omneo } from '..'
import { Profile } from '../types'

async function getProfileByIdentity (this: Omneo, identifier: string, handle: string): Promise<Profile> {
  return this.call({
    method: 'post',
    endpoint: '/profiles/search-id',
    body: { type: handle, id: identifier }
  }).then((response) => {
    return response.data
  })
}
export default getProfileByIdentity
