<template>
  <el-container class="home-container">
    <!-- 侧面导航菜单 -->
    <el-aside :width="isOpen?'200px':'64px'">
      <!-- logo -->
      <div class="logo" :class="{smallLogo:!isOpen}"></div>
      <!-- 导航菜单 -->
      <!-- 背景样式 默认文本颜色 激活文本颜色 折叠侧边栏 折叠动画 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转-->
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 图标 -->
        <span
          class="icon"
          :class="[{'el-icon-s-fold':isOpen},{'el-icon-s-unfold':!isOpen}]"
          @click="toggleMenu"
        ></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单组件 -->
        <!-- <div style="float-right"> -->
        <el-dropdown class="dropdown" @command="setoutClick">
          <span class="el-dropdown-link">
            <img class="headIcon" :src="photo" alt />
            <span class="userName">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- </div> -->
      </el-header>
      <!-- 路由视图 -->
      <el-main>
        <!-- 二级路由容器 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
import eventBus from '../../eventBus.js'
export default {
  data () {
    return {
      // 是不是展开的
      isOpen: true,
      // 头像
      photo: '',
      // 用户名
      name: ''
    }
  },
  methods: {
    toggleMenu () {
      // 切换侧边栏  展开与收起
      this.isOpen = !this.isOpen
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // 先清除 在跳转
      local.delUser()
      this.$router.push('/login')
    },
    setoutClick (command) {
      this[command]()
      // debugger
    }
  },
  // 一进页面就获取用户信息
  created () {
    const user = local.getUser() || {}
    this.photo = user.photo
    this.name = user.name
    // 绑定事件 userName
    eventBus.$on('userName', (data) => {
      this.name = data
    })
    // 绑定事件 editUserimg
    eventBus.$on('editUserImg', (data) => {
      this.photo = data
    })
  }
}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url("../../assets/logo_admin.png") no-repeat center /
        140px auto;
      // 宽度140 高度等比例缩放
    }
    .smallLogo {
      background: #002244 url("../../assets/logo_admin_01.png") no-repeat center;
      background-size: 36px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;

      .headIcon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .userName {
        margin-left: 5px;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
}
</style>
