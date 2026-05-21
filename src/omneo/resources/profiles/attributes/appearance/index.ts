import { ProfileAppearanceAttribute, RequestUpdateProfileAppearanceAttribute } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileAttributesAppearance extends Resource {
  get (profileID: string): Promise<ProfileAppearanceAttribute> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/attributes/appearance`
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, body: RequestUpdateProfileAppearanceAttribute): Promise<ProfileAppearanceAttribute> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/attributes/appearance`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
