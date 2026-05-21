import { Address, RequestUpdateAddress, RequestParams } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileAddresses extends Resource {
  get (addressID: string): Promise<Address> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/addresses/${addressID}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<Address[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/addresses',
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: Address): Promise<Address> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/addresses',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (addressID: string, body: RequestUpdateAddress): Promise<Address> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/addresses/${addressID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (addressID: string): Promise<Address> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/addresses/${addressID}`
    }).then((response) => {
      return response.data
    })
  }
}
