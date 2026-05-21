import { CustomField, RequestParams } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileListCustomFields extends Resource {
  get (profileID: string, listID: number, namespace: string, handle: string): Promise<CustomField> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileID}/lists/${listID}/custom-fields/${attribute}`
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

  create (profileID: string, listID: number, body: CustomField): Promise<CustomField> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/lists/${listID}/custom-fields`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, listID: number, namespace: string, handle: string, body: CustomField): Promise<CustomField> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'PUT',
      endpoint: `/profiles/${profileID}/lists/${listID}/custom-fields/${attribute}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, listID: number, namespace: string, handle: string): Promise<any> {
    const attribute = `${namespace}:${handle}`
    return this.client.call({
      method: 'DELETE',
      endpoint: `/profiles/${profileID}/lists/${listID}/custom-fields/${attribute}`
    }).then((response) => {
      return response
    })
  }
}
