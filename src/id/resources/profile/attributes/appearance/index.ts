import { ProfileAppearanceAttribute, RequestUpdateProfileAppearanceAttribute } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileAttributesAppearance extends Resource {
  get (): Promise<ProfileAppearanceAttribute> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/attributes/appearance'
    }).then((response) => {
      return response.data
    })
  }

  update (body: RequestUpdateProfileAppearanceAttribute): Promise<ProfileAppearanceAttribute> {
    return this.client.call({
      method: 'put',
      endpoint: '/profiles/me/attributes/appearance',
      body
    }).then((response) => {
      return response.data
    })
  }
}
