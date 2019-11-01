
import myBread from '@/components/my-bread'
import myChannel from '@/components/my-channel'
export default {
  install (Vue) {
    Vue.component(myBread.name, myBread)
    Vue.component(myChannel.name, myChannel)
  }
}
