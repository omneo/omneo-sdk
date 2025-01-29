import randomString from './random'

export const getRandomString = (name: string) => { return `${name}_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }

export const convertToUTC = (dateStr: string): string => {
  const targetDate = new Date(dateStr)
  const pad = (num) => num.toString().padStart(2, '0')
  const year = targetDate.getUTCFullYear()
  const month = pad(targetDate.getUTCMonth() + 1)
  const day = pad(targetDate.getUTCDay() + 1)
  const hours = pad(targetDate.getUTCHours())
  const minutes = pad(targetDate.getUTCMinutes())
  const seconds = pad(targetDate.getUTCSeconds())
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const getIsoNumeric = () => { return `${Math.floor(Date.now()) + Math.floor(Math.random() * 1000)}` }
