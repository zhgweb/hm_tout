<template>
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  name: 'my-channel',
  data () {
    return {
      //   value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值 channelOptions
      this.channelOptions = data.channels
    },
    // 频道改变函数
    // 频道改变过，把频道ID提交给父组件
    fn (channelId) {
      // 清空值是'' 改成null
      if (channelId === '')channelId = null
      this.$emit('input', channelId)
    }
  }
}
</script>

<style scoped lang='less'></style>
