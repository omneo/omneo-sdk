import { ProfileAppearance } from '../../../../types'
import Resource from '../../resource'

export default class ProfileAttributesAppearance extends Resource {
  get (profileID: string): Promise<ProfileAppearance> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/attributes/appearance`
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string): Promise<ProfileAppearance> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/attributes/appearance`
    }).then((response) => {
      return response.data
    })
  }
}
