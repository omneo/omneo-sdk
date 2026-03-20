import { List, ListInput, RequestParams } from '@types'
import Resource from '@omneo/resources/resource'
import Items from './items'
import CustomFields from './custom-fields'
import Shares from './shares'
import Reservations from './reservations'

export default class ProfileLists extends Resource {
  customFields = new CustomFields(this.client)
  items = new Items(this.client)
  reservations = new Reservations(this.client)
  shares = new Shares(this.client)
  reservations = new Reservations(this.client)

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
      return response
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
      return response
    })
  }
}
