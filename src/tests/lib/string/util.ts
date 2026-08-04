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

export const formatUtcToTimezone = (dateTime: string, timezone: string): string => {
  const [datePart, timePart] = dateTime.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hours, minutes, seconds] = (timePart ?? '00:00:00').split(':').map(Number)

  const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds))
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(utcDate)

  const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? ''

  return `${getPart('year')}-${getPart('month')}-${getPart('day')} ${getPart('hour')}:${getPart('minute')}:${getPart('second')}`
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
