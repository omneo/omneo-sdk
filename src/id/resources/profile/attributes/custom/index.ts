import { Address, CustomAttribute, CustomAttributeInput, RequestParams } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileAttributesCustom extends Resource {
  get (namespace: string, handle: string): Promise<CustomAttribute> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/attributes/custom/${namespace}:${handle}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<CustomAttribute[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/attributes/custom',
      params
    }).then((response) => {
      return response.data
    })
  }

  update (namespace: string, handle: string, body: Partial<CustomAttributeInput>): Promise<CustomAttribute> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/attributes/custom/${namespace}:${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (namespace: string, handle: string): Promise<Address> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'DELETE',
      endpoint: `/profiles/me/attributes/custom/${attribute}`
    }).then((response) => {
      return response.data
    })
  }
}
