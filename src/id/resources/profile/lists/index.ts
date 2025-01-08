import { List, ListInput, RequestParams } from '../../../../types'
import Resource from '../../resource'
import Items from './items'

export default class ProfileLists extends Resource {
  items = new Items(this.client)

  get (listID: string): Promise<List> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<List[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/lists',
      params
    }).then((response) => {
      return response.data
    })
  }

  create (listInput: ListInput): Promise<List> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/lists',
      body: listInput
    }).then((response) => {
      return response.data
    })
  }

  update (listID: string, body: Partial<ListInput>): Promise<List> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/lists/${listID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (listID: string): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/lists/${listID}`
    }).then((response) => {
      return response.data
    })
  }
}
