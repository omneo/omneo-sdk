import { ProfileResponse, CustomAttribute, CustomAttributeInput, RequestParams } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileAttributesCustom extends Resource {
  get (profileID: string, namespace: string, handle: string): Promise<CustomAttribute> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileID}/attributes/custom/${attribute}`
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
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'PUT',
      endpoint: `/profiles/${profileID}/attributes/custom/${attribute}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, namespace: string, handle: string): Promise<Response> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'DELETE',
      endpoint: `/profiles/${profileID}/attributes/custom/${attribute}`
    })
  }

  find (params: RequestParams): Promise<ProfileResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/attributes/custom',
      params
    })
  }
}
