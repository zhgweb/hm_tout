<template>
  <div class="my-image">
    <!-- 按钮 -->
    <div class="btn_box" @click="open">
      <!-- 如果value有图片传入的地址，使用默认图的地址 -->
      <img :src="value || show" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 全部与收藏 -->
          <!-- label 指定选中当前单选框的值 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 素材区域 -->
          <div class="lists">
            <div
              :class="{selected:selectedImageUrl===item.url}"
              class="img_item"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            style="margin: 0px auto"
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传组件 -->
          <el-upload
            name="image"
            :headers="headers"
            :on-success="handleSuccess"
            style="text-align: center;"
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
import show from '../assets/default.png'
export default {
  name: 'my-image',
  // value 在发布文章的时候没有值，编辑的时候才有图片数据。
  props: ['value'],
  data () {
    return {
      reqParams: {
        collect: false,
        per_page: 8,
        page: 1
      },
      show: show,
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      // 控制对话框显示与隐藏
      dialogVisible: false,
      // 当前激活选项卡的name的值
      activeName: 'image',
      // 当前选中的图片地址
      selectedImageUrl: null,
      // 当前上传图片的地址
      uploadImageUrl: null,
      // 设置请求头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    // 确定上传
    sendImg () {
      if (this.activeName === 'image') {
        // 素材库
        if (this.selectedImageUrl === null) {
          return this.$message.warning('请选中一张图片')
        } else {
          // 给img的src赋值图片地址
          this.$emit('input', this.selectedImageUrl)
        }
      } else { // 上传图片
        if (this.uploadImageUrl === null) {
          return this.$message.warning('请上传一张图片')
        } else { // 给img的src赋值图片地址
          // this.show = this.uploadImageUrl
          this.$emit('input', this.uploadImageUrl)
        }
      }
      // 关闭选项卡
      this.dialogVisible = false
    },
    // 上传图片成功之后
    handleSuccess (res) {
      // res 就是响应主体  res.data.url 就是图片地址
      // 预览
      this.uploadImageUrl = res.data.url
      // 成功信息
      this.$message.success('上传图片成功!')
    },
    // 获取素材列表
    async getImages () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 赋值给images
      this.images = data.results
      // 总条数赋值
      this.total = data.total_count
    },
    // 打开对话框
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    // 切换 全部与收藏 列表
    toggleList () {
      this.reqParams.page = 1
      // this.reqParams.page = false
      this.getImages()
    },
    // 点击变成当前页
    pager (newPage) {
      this.reqParams.page = newPage
      // 获取素材列表
      this.getImages()
    },
    // 点击选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    }
  }
}
</script>

<style scoped lang='less'>
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.lists {
  margin-top: 20px;
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url("../assets/selected.png") no-repeat
        center / 50px 50px;
    }
  }
}
</style>
