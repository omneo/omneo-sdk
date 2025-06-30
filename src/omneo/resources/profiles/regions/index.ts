import { Region, ProfileRegionInput } from '../../../../types'
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

  create (id: string, body: ProfileRegionInput): Promise<Region[]> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${id}/regions`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, regionId: number, body: ProfileRegionInput): Promise<Region[]> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${id}/regions/${regionId}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string, regionId: number): Promise<Response> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${id}/regions/${regionId}`
    }).then((response) => {
      return response
    })
  }
}
