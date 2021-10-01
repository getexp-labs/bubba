import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(VuePlyr, {
    plyr: {},
  })
}
