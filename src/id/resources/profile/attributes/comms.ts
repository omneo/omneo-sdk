import { ProfileComms } from '../../../../types'
import Resource from '../../resource'

export default class ProfileAttributesComms extends Resource {
  get (): Promise<ProfileComms> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/attributes/comms'
    }).then((response) => {
      return response.data
    })
  }

  update (): Promise<ProfileComms> {
    return this.client.call({
      method: 'put',
      endpoint: '/profiles/me/attributes/comms'
    }).then((response) => {
      return response.data
    })
  }
}
