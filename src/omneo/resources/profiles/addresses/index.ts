import { Address, RequestUpdateAddress, RequestParams, RequestUpsertAddress } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileAddresses extends Resource {
  get (profileID: string, addressID: string): Promise<Address> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/addresses/${addressID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<Address[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/addresses`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (profileID: string, body: Address): Promise<Address> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/addresses`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, addressID: string, body: RequestUpdateAddress): Promise<Address> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/addresses/${addressID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, addressID: string): Promise<Address> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/addresses/${addressID}`
    }).then((response) => {
      return response.data
    })
  }

  upsert (profileID: string, body: RequestUpsertAddress): Promise<Address> {
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/${profileID}/addresses/upsert`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
