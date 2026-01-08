import { CustomField, CustomFieldInput, UpdateCustomFieldInput, RequestParams } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileListCustomFields extends Resource {
  get (profileID: string, listID: number, namespace: string, handle: string): Promise<CustomField> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists/${listID}/custom-fields/${namespace}:${handle}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, listID: number, params?: RequestParams): Promise<{data: CustomField[]}> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists/${listID}/custom-fields`,
      params
    }).then((response) => {
      return response
    })
  }

  create (profileID: string, listID: number, body: CustomFieldInput): Promise<CustomField> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/lists/${listID}/custom-fields`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, listID: number, namespace: string, handle: string, body: UpdateCustomFieldInput): Promise<CustomField> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/lists/${listID}/custom-fields/${namespace}:${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, listID: number, namespace: string, handle: string): Promise<any> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/lists/${listID}/custom-fields/${namespace}:${handle}`
    }).then((response) => {
      return response
    })
  }
}
