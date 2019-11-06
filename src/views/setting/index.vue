<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <!-- 基本设置 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="editUserInfo">立即创建</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" style="text-align:center">
          <!-- 头像上传组件 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request='userImg'
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '../../eventBus.js'
import local from '@/utils/local'
export default {
  data () {
    return {
      userInfo: {
        name: null,
        intro: null,
        email: null,
        photo: null
      }

    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userInfo = data
    },
    // 保存用户信息 （除去头像不能保存）
    async editUserInfo () {
      // patch  都是修改请求  局部修改
      // put 都是修改请求 完整修改
      await this.$http.patch('user/profile', {
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email })
      // 提示
      this.$message.success('修改成功')
      // 更新home里面的用户内容
      eventBus.$emit('userName', this.userInfo.name)
      // 更新本地存储
      const user = local.getUser()
      user.name = this.userInfo.name
      local.setUser(user)
    },
    async userImg (result) {
      // 选择文件后触发当前函数，默认传入一个选择后的结果（包含文件信息）
      // 1. 获取图片文件数据

      const file = result.file
      // console.log(file)
      // 2. 创建一个formData
      const formData = new FormData()

      // 3. 追加图片数据到fromData  字段名字和后台一致
      formData.append('photo', file)
      // console.log(formData.get('photo'))
      // 4. 使用axios提交数据
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // 5. 拿着上传成功后的地址进行预览
      this.userInfo.photo = data.photo
      // 6. 提示
      this.$message.success('修改头像成功')
      // 7. 更新home组件的photo
      eventBus.$emit('editUserImg', this.userInfo.photo)
      // 8. 更新本地存储的photo
      const user = local.getUser()
      user.photo = this.photo
      local.setUser(user)
    }
  }
}
</script>

<style scoped lang='less'></style>
