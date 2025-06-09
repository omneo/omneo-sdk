import { List, ListInput, RequestParams } from '../../../../types'
import Resource from '../../resource'
import Items from './items'

export default class ProfileLists extends Resource {
  items = new Items(this.client)

  get (profileID: string, listID: number): Promise<List> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists/${listID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<List[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (profileID: ListInput): Promise<List> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/lists`
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, listID: number, body: Partial<ListInput>): Promise<List> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/lists/${listID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, listID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/lists/${listID}`
    }).then((response) => {
      return response.data
    })
  }
}
