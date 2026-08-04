import { ListItem, ListItemInput, ListItemCustomInput, ListItemResponse } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileListItems extends Resource {
  get (listID: number, listItemID: number): Promise<ListItem> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response.data
    })
  }

  list (listID: number): Promise<ListItemResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}/items`
    }).then((response) => {
      return response
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

  custom (listID: number, body: ListItemCustomInput): Promise<ListItem> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/me/lists/${listID}/custom`,
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
      return response
    })
  }
}
