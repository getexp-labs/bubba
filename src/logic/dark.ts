import { useDark, useToggle } from '@vueuse/core'

// export const isDark = useDark()
export const isDark = true
export const toggleDark = useToggle(isDark)
