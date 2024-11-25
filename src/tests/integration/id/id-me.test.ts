import { describe, expect } from 'vitest'
import { ID } from '../../../id'
import jwt from 'jsonwebtoken'
import { testWithIDData } from './test-with-id-data'

describe('ID me', () => {
  testWithIDData('ID SDK can get me', async ({ IDData }) => {
    const { tokenData } = IDData
    const { pid: decodedProfileID } = jwt.decode(tokenData.token)

    const IDClient = new ID({
      tenant: process.env.OMNEO_TENANT as string,
      config: {},
      omneoAPIToken: process.env.OMNEO_TOKEN as string,
      IDToken: tokenData.token,
      IDTokenExpiry: tokenData.exp
    })
    const profile = await IDClient.profile.get()

    expect(profile.id).toBe(decodedProfileID)
    expect(typeof profile.email).toBe('string')
  })
})
