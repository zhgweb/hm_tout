<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id?'编辑':'发布'}}文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form ref="form" label-width="120px">
        <el-form-item label="标题: " style="width:400px">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面: ">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">自动</el-radio>
            <el-radio :label="-1">无图</el-radio>
          </el-radio-group>
          <!-- 使用封面图组件 -->
          <my-image v-model="articleForm.cover.images[0]"></my-image>
        </el-form-item>
        <el-form-item label="频道: ">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="内容: " v-if="$route.query.id">
          <el-button @click="editSendCon(false)" type="primary">编辑</el-button>
          <el-button @click="editSendCon(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item label="内容: " v-else>
          <el-button @click="sendCon(false)" type="primary">发表</el-button>
          <el-button @click="sendCon(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },

  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          images: [],
          type: 1
        }
      },
      // 富文本
      editorOption: {
        // 清空默认字
        placeholder: '',
        // 配置
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  watch: {
    '$route.query.id': function (newVal, oldVal) {
      if (newVal) {
        this.getArticle(newVal)
      } else {
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            images: [],
            type: 1
          }
        }
      }
    }
  },
  created () {
    // 根据地址栏是否有ID来判断
    const articleId = this.$route.query.id
    if (articleId) {
      // 编辑状态
      // 拿数据
      // 调用方法
      this.getArticle(articleId)
      // const { data: { data } } = this.$http.get(`articles/${articleId}`)
      // this.articleForm = data
    }
  },
  methods: {
    // 发布 草稿
    async sendCon (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 存入草稿  // 发布文章
      this.$message.success(draft ? '存入草稿成功!' : '发布文章成功!')
      // 跳转
      this.$router.push('/article')
    },
    // 拿数据
    async getArticle (articleId) {
      const { data: { data } } = await this.$http.get(`articles/${articleId}`)
      this.articleForm = data
    },
    async editSendCon (draft) {
      await this.$http.put(`articles/${this.$route.query.id}?draft=${draft}`, this.articleForm)
      this.$message.success('修改成功')
      this.$router.push('/article')
    }
  }
}

</script>

<style scoped lang='less'>
</style>
