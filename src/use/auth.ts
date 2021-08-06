import { reactive, computed } from 'vue'
import { supabase } from '~/modules/supabase'

const state = reactive({
  user: null as any,
  isOnline: false,
  count: 0,
  ready: false,
})

setInterval(() => {
  state.count++
}, 1000)

export function useAuth() {
  const signIn = async() => {
    console.log('signIn', window.location.origin)
    const redirectTo = window.location.origin
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'discord',
    }, { redirectTo })
    // state.user = user
  }
  const signOut = async() => {
    console.log('signOut')
    const { error } = await supabase.auth.signOut()
    state.user = null
  }
  const init = () => {
    console.log('init')
    const user = supabase.auth.user()
    if (user) state.user = user
    supabase.auth.onAuthStateChange((_, session) => {
      console.log('session', session)
      state.user = session?.user
    })
    state.ready = true
  }
  return {
    state,
    signIn,
    signOut,
    init,
  }
}
