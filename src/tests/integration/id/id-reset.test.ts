import { describe, test, beforeEach, expect } from 'vitest'
import { ID } from '../../../id'

const IDClient = new ID({
  tenant: process.env.OMNEO_TENANT as string,
  config: {},
  omneoAPIToken: process.env.OMNEO_TOKEN as string
})

describe('ID Reset', () => {
  test('ID SDK can be reset', async () => {
    IDClient.IDToken = 'TEST123'
    IDClient.IDTokenExp = 12345
    IDClient.reset()
    expect(IDClient.IDToken).toBe('')
    expect(IDClient.IDTokenExp).toBeUndefined()
  })
})

beforeEach(async () => {
  IDClient.reset()
})
