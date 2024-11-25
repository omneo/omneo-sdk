import { describe, test, afterAll, expect } from 'vitest'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
import { Omneo } from '../../../../omneo'

const CREATED_API_TOKENS : string[] = []

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const tokenName = 'SDK Tokens Get Test API Token'

describe('API Tokens get', async () => {
  const { token: { id: testTokenID } } = await simpleOmneoRequest('POST', '/auth/api-tokens', {
    name: tokenName,
    scopes: ['read-profiles']
  })

  CREATED_API_TOKENS.push(testTokenID)

  test('SDK can get current API tokens', async () => {
    const currentTokens = await omneo.auth.getAPITokens({ type: 'current' })
    const matchedToken = currentTokens.find((tkn) => tkn.id === testTokenID)

    expect(matchedToken).toBeDefined()
    expect(matchedToken?.id).toEqual(testTokenID)

    const expiredTokens = currentTokens.filter((tkn) => new Date(tkn.expires_at).getTime() < Date.now())
    expect(expiredTokens.length).toEqual(0)
  })

  test('SDK can get current API tokens', async () => {
    const expiredTokens = await omneo.auth.getAPITokens({ type: 'expired' })

    const currentTokens = expiredTokens.filter((tkn) => new Date(tkn.expires_at).getTime() > Date.now())
    expect(currentTokens.length).toEqual(0)
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
