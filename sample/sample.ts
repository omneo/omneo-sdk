
import * as dotenv from 'dotenv'
import { Omneo } from '../src'

dotenv.config()

const { OMNEO_TOKEN: token, OMNEO_TENANT: tenant } = process.env

const omneoClient = new Omneo({ token: token as string, tenant: tenant as string })

console.log('Fetching Profiles')
omneoClient.profiles.list().then((profiles) => {
  console.log(`Retrieved ${profiles.length} profiles`)
})
