<script lang="ts" setup>
import type { Locale as DateFnsLocale } from "date-fns";
import { format as formatter } from "date-fns";
import { enGB as en, id } from "date-fns/locale";
import type { Locale as AppLocale } from "~/utils/types";

// Create a type-safe locale map
const LOCALE_MAP: Record<AppLocale, DateFnsLocale> = {
  en,
  id,
} as const;

const props = defineProps({
  format: {
    type: String,
    default: DATETIME_FORMAT_DEFAULT,
  },
  locale: {
    type: String as PropType<AppLocale>,
    default: DEFAULT_LOCALE,
    validator: (value: string): value is AppLocale => LOCALES.includes(value),
  },
  value: {
    type: String,
    required: true,
  },
});

// Memoize date object creation and formatting
const text = computed<string>(() => {
  if (!props.value) return "";

  const date = new Date(props.value);
  return formatter(date, props.format, {
    locale: LOCALE_MAP[props.locale],
  });
});
</script>

<template>
  <time :datetime="props.value || ''">{{ text }}</time>
</template>
