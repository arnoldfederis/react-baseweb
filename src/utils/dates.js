import moment from 'moment'

const defaultFormat = 'YYYY-MM-DD HH:mm:ss'

export const now = moment().format(defaultFormat)

export const dates = {
  createdAt: now,
  updatedAt: now
}

export const formatDate = (date, format = defaultFormat) => {
  return moment(date).format(format)
}
