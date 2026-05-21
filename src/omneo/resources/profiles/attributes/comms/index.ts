import { ProfileCommsAttribute, RequestUpdateProfileCommsAttribute } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileAttributesComms extends Resource {
  get (profileID: string): Promise<ProfileCommsAttribute> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/attributes/comms`
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, comms: RequestUpdateProfileCommsAttribute): Promise<ProfileCommsAttribute> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/attributes/comms`,
      body: comms
    }).then((response) => {
      return response.data
    })
  }
}
