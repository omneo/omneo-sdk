import { CustomField, RequestParams } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileListCustomFields extends Resource {
  get (listID: number, namespace: string, handle: string): Promise<CustomField> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}/custom-fields/${namespace}:${handle}`
    }).then((response) => {
      return response.data
    })
  }

  list (listID: number, params?: RequestParams): Promise<{data: CustomField[]}> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}/custom-fields`,
      params
    }).then((response) => {
      return response
    })
  }

  create (listID: number, body: CustomField): Promise<CustomField> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/me/lists/${listID}/custom-fields`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (listID: number, namespace: string, handle: string, body: CustomField): Promise<CustomField> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/lists/${listID}/custom-fields/${namespace}:${handle}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (listID: number, namespace: string, handle: string): Promise<any> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/lists/${listID}/custom-fields/${namespace}:${handle}`
    }).then((response) => {
      return response
    })
  }
}
