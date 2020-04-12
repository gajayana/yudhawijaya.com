import format from 'date-fns/format'
import { enGB, id } from 'date-fns/locale'

export default {
  filters: {
    dateTimeFormatter(str, locale = 'id') {
      return format(new Date(str), 'PPP', { locale: (locale === 'en') ? enGB : id })
    }
  }
}
