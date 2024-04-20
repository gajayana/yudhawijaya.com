<script lang="ts" setup>
// eslint-disable-next-line import/no-duplicates
import { format as formatter } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import { enGB as en, id } from 'date-fns/locale'

const props = defineProps({
  format: {
    type: String,
    default: DATETIME_FORMAT_DEFAULT
  },
  locale: {
    type: String,
    default: DEFAULT_LOCALE,
    validator (value:string) {
      return LOCALES.includes(value)
    }
  },
  value: {
    type: String,
    required: true
  }
})

const text = computed<string>(() => {
  return props?.value ? formatter(new Date(props?.value), props.format, { locale: props.locale === 'en' ? en : id }) : ''
})

</script>

<template>
  <time :datetime="value || ''">{{ text }}</time>
</template>
