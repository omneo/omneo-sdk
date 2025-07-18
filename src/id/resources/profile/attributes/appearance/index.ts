import { ProfileAppearance, ProfileAppearanceInput } from '../../../../../types'
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

  update (body: ProfileAppearanceInput): Promise<ProfileAppearance> {
    return this.client.call({
      method: 'put',
      endpoint: '/profiles/me/attributes/appearance',
      body
    }).then((response) => {
      return response.data
    })
  }
}
