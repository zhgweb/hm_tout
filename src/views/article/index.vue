<template>
  <div class="container-article">
    <!-- 上部分筛选条件布局 -->
    <!-- 面包屑 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单框架 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
       <!-- 使用频道组件 -->
          <my-channel  v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下部分筛选结果布局 -->
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查到 {{ total}} 条结果:</span>
      </div>
      <!-- 表格部分 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="toEdit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain @click='delArticle(scope.row.id)'></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- layout="prev, pager, next" 当前分页组包含的布局 -->
      <!-- total 总条数 -->
      <!-- page-size 默认一页显示10条 -->
      <!-- current-page 指定当前激活的按钮 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [
        // { value: 1, label: 'java' },
        // { value: 2, label: '前端' }
      ],
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    // 获取文章列表数据
    async getArticles () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 赋值 articles
      this.articles = data.results
      // 总条数数据赋值
      this.total = data.total_count
    },
    // 分页函数
    pager (newPage) { // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新获取数据
      this.getArticles()
    },
    // 选择日期
    changeDate (dateArr) {
      // dateArr 是数组 [date,date]  起始时间  结束时间
      // 我们需要： dateArr 是数组 [string,string]  string === '2019-10-02'
      // value-form="yyyy-MM-dd" 格式转换成功
      // 注意：清空日期之后，dateArr是null  对应的 begin end 值也该为null
      // 频道清空功能：clearable
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选
    search () {
      // 获取筛选数据（准备日期数据）
      // 处理频道空字符串问题
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      // 把页码换成1
      this.reqParams.page = 1
      // 重新获取数据
      this.getArticles()
    },
    // 去编辑页面
    toEdit (id) {
      // this.$router.push(`@/publish?id=${id}`)
      // 第二种  query传参方式
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async delArticle (id) {
      // 发请求  restfull 接口规则（get post put patch delete）
      await this.$http.delete(`/articles/${id}`)
      // 提示
      this.$message.success('删除成功')
      // 更新列表 重新获取数据
      this.getArticles()
    }
  }
}
</script>

<style>
</style>
