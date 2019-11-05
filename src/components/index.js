
import myBread from '@/components/my-bread'
import myChannel from '@/components/my-channel'
import myImage from '@/components/my-image'
export default {
  install (Vue) {
    Vue.component(myBread.name, myBread)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImage.name, myImage)
  }
}
