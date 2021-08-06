import { createClient } from '@supabase/supabase-js'
import { UserModule } from '~/types'
import { useAuth } from '~/use/auth'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const install: UserModule = ({ app, router, isClient }) => {
  // do stuff
  const { init } = useAuth()
  init()
}
