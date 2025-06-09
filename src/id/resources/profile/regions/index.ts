import { Region } from '../../../../types'
import Resource from '../../resource'

export default class ProfileRegions extends Resource {
  // TODO NOT IMPLEMENTED IN API
  // get (regionID: number): Promise<Region> {
  //   return this.client.call({
  //     method: 'get',
  //     endpoint: `/profiles/me/regions/${regionID}`
  //   }).then((response) => {
  //     return response.data
  //   })
  // }

  list (): Promise<Region[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/regions'
    }).then((response) => {
      return response.data
    })
  }

  create (region: any): Promise<Region> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/regions',
      body: region
    }).then((response) => {
      return response.data
    })
  }

  update (regionID: number, region: any): Promise<Region> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/regions/${regionID}`,
      body: region
    }).then((response) => {
      return response.data
    })
  }

  delete (regionID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/regions/${regionID}`
    }).then((response) => {
      return response
    })
  }
}
