import randomString from '../../../../../lib/string/random'
export const getRandomString = (name: string) => { return `${name}_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
