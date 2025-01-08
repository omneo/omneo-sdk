import { Region } from '../../../types'
import Resource from '../resource'

export default class ProfileRegions extends Resource {
  get (): Promise<Region[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/regions'
    }).then((response) => {
      return response.data
    })
  }
}
