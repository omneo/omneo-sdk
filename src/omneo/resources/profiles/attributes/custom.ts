import { Address, CustomAttribute, CustomAttributeInput, RequestParams } from '../../../../types'
import Resource from '../../resource'

export default class ProfileAttributesCustom extends Resource {
  get (profileID: string, namespace: string, handle: string): Promise<CustomAttribute> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/attributes/custom/${namespace}:${handle}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<CustomAttribute[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/attributes/custom`,
      params
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, namespace: string, handle: string, body: Partial<CustomAttributeInput>): Promise<CustomAttribute> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/attributes/custom/${namespace}/${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, namespace: string, handle: string): Promise<Address> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/attributes/custom/${namespace}/${handle}`
    }).then((response) => {
      return response.data
    })
  }
}
