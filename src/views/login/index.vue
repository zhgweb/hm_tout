<template>
  <!-- 全屏容器  -->
  <div class="container">
    <!-- 卡片容器  el-card是一个element组件，根元素上默认添加一个类和组件的名称一致 element 提供的-->
    <el-card>
      <img src="../../assets/logo_index.png" alt="这是头条LOGO" />

      <el-form :model="LoginForm" :rules="LoginRules" ref="loginForm" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="LoginForm.code"
            placeholder="请输入验证码"
            style="width: 238px; margin-right:10px"
          ></el-input>
          <el-button>获取验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    // 校验手机号函数
    const checkMobile = (rule, value, callback) => {
      // 去判断value是否符合手机号格式
      // 格式：1开头  第二位 3-9 之间  9位数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      LoginForm: { mobile: '15966666666', code: '246810' },
      // 登录模块校验的数据
      LoginRules: {
        mobile: [
          // type 选项：指定内容的格式  date|email|...  不包含手机号类型
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 自定义校验规则
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入六位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          // 校验成功  进行登录（发请求）
          // post(url,参数对象)
          // get(url,{params:参数对象})
          // this.$http({
          //   url: 'authorizations',
          //   data: this.LoginForm,
          //   method: 'post'
          // })
          //   .then(res => {
          //     // 成功
          //     // 保存用户信息 因为经常用 要封装成工具
          //     // 成功 res 是响应对象  res.data 是响应主体
          //     // 保存用户信息（token）
          //     local.setUser(res.data.data)
          //     this.$router.push('/') // 并没有刷新页面,是通过路由跳转到首页
          //   })
          //   .catch(() => {
          //     // 失败 提示
          //     this.$message.error('手机号或验证码格式错误')
          //   })
          try {
            const { data: { data } } = await this.$http({
              url: 'authorizations',
              data: this.LoginForm,
              method: 'post'
            })
            local.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码格式错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  // background-color: pink;
  //   用定位来摆脱 没有高度的问题
  position: absolute;
  left: 0;
  top: 0;
  // 背景图尺寸：拆分写法 background-size
  // 组合写法：background:..... / 背景图尺寸(width,height)
  // 特殊写法：center 居中 / cover  等比例缩放铺满容器多余不显示  contain 等比例缩放完全显示在容器内
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  .el-card {
    width: 400px;
    height: 330px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}
</style>
