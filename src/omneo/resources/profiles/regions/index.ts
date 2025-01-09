import { Region } from '../../../../types'
import Resource from '../../resource'

export default class ProfileRegions extends Resource {
  list (id: string): Promise<Region[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${id}/regions`
    }).then((response) => {
      return response.data
    })
  }
}
