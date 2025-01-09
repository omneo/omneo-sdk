import { ListItem, ListItemInput, RequestParams } from '../../../../types'
import Resource from '../../resource'

export default class ProfileListItems extends Resource {
  get (profileID: string, listID: number, listItemID: number): Promise<ListItem> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, listID: number, params?: RequestParams): Promise<ListItem[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists/${listID}/items`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (profileID: string, listID: number, listItemID: number, body: ListItemInput): Promise<ListItem> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, listID: number, listItemID: number, body: ListItemInput): Promise<ListItem> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, listID: number, listItemID: number): Promise<ListItem> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response.data
    })
  }
}
