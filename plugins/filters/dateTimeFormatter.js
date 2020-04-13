import Vue from 'vue'
import format from 'date-fns/format'
import { enGB, id } from 'date-fns/locale'

Vue.filter(
  'dateTimeFormatter',
  (str, locale = 'id') => {
    return format(new Date(str), 'PPP', { locale: (locale === 'en') ? enGB : id })
  }
)
