import { ListItem, ListItemInput, RequestParams } from '../../../../../types'
import Resource from '../../../resource'

export default class ProfileListItems extends Resource {
  get (listID: number, listItemID: number): Promise<ListItem> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response.data
    })
  }

  list (listID: number, params?: RequestParams): Promise<ListItem[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}/items`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (listID: number, body: ListItemInput): Promise<ListItem> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/me/lists/${listID}/items`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (listID: number, listItemID: number, body: ListItemInput): Promise<ListItem> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/lists/${listID}/items/${listItemID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (listID: number, listItemID: number): Promise<ListItem> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response.data
    })
  }
}
