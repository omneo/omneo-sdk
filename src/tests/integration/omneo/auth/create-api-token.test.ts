import { describe, test, afterAll, expect } from 'vitest'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { Omneo } from '../../../../omneo'
import { allOmneoScopes } from '../../../mocks/auth/auth'

const CREATED_API_TOKENS : string[] = []

const scopes = allOmneoScopes

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const tokenName = 'SDK Tokens Create Test API Token'

describe('API Tokens create', () => {
  test('SDK can create an API Token', async () => {
    const { accessToken, token } = await omneo.auth.createAPIToken({
      name: tokenName,
      scopes
    })

    expect(token.name).toEqual(tokenName)
    expect(token.scopes).toEqual(expect.arrayContaining(scopes))
    expect(token.revoked).toBe(false)
    expect(new Date(token.expires_at).getTime()).toBeGreaterThan(Date.now())
    expect(accessToken).toBeTypeOf('string')

    CREATED_API_TOKENS.push(token.id)
  })
})

afterAll(async () => {
  if (CREATED_API_TOKENS.length > 0) {
    for (const tokenID of CREATED_API_TOKENS) {
      console.log('Cleaning up API Token with ID', tokenID)
      const deleteResponse = await simpleOmneoRequest('DELETE', `/auth/api-tokens/${tokenID}`)
      if (deleteResponse.status === 204) {
        console.log(`API Token ID ${tokenID} deleted`)
      }
    }
  }
})
