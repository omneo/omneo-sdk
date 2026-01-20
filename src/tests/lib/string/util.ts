import randomString from './random'

export const getRandomString = (name: string) => {
  return `${name}_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}`
}

export const convertToUTC = (dateStr: string): string => {
  const targetDate = new Date(dateStr)
  const pad = (num: number) => num.toString().padStart(2, '0')
  const year = targetDate.getUTCFullYear()
  const month = pad(targetDate.getUTCMonth() + 1)
  const day = pad(targetDate.getUTCDay() + 1)
  const hours = pad(targetDate.getUTCHours())
  const minutes = pad(targetDate.getUTCMinutes())
  const seconds = pad(targetDate.getUTCSeconds())
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const getIsoNumeric = () => {
  return `${Math.floor(Date.now()) + Math.floor(Math.random() * 1000)}`
}

export const isSameDay = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

export const getRandomDigitString = (length: number) => {
  let result = ''
  const characters = '0123456789'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
