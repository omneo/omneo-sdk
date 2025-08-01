import { ProfileComms, ProfileCommsInput } from '../../../../types'
import Resource from '../../resource'

export default class ProfileAttributesComms extends Resource {
  get (profileID: string): Promise<ProfileComms> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/attributes/comms`
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, comms: ProfileCommsInput): Promise<ProfileComms> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/attributes/comms`,
      body: comms
    }).then((response) => {
      return response.data
    })
  }
}
