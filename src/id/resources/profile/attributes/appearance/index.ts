import { ProfileAppearance } from '../../../../../types'
import Resource from '../../../resource'

export default class ProfileAttributesAppearance extends Resource {
  get (): Promise<ProfileAppearance> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/attributes/appearance'
    }).then((response) => {
      return response.data
    })
  }

  update (): Promise<ProfileAppearance> {
    return this.client.call({
      method: 'put',
      endpoint: '/profiles/me/attributes/appearance'
    }).then((response) => {
      return response.data
    })
  }
}
