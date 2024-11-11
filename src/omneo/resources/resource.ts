import { Omneo } from '../..'

export default class Resource {
  client: Omneo
  constructor (client: Omneo) {
    this.client = client
  }
}
