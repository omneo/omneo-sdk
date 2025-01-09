import { describe, expect } from 'vitest'
import { ID } from '../../../../../id'
import { testWithIDData } from '../../test-with-id-data'

describe('ID identities', () => {
  testWithIDData('ID SDK can list identities', async ({ IDData }) => {
    const { tokenData } = IDData

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      IDToken: tokenData.token,
      omneoAPIToken: process.env.OMNEO_TOKEN as string
    })

    const identities = await IDClient.profile.identities.list()
    expect(Array.isArray(identities)).toBe(true)
  })
})
