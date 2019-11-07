<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <!-- 头部面包屑 -->
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- 标签页 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+ 关注</el-button>
            </div>
          </div>
          <!-- 分页按钮 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second">
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div ref="dom" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'list',
      fansList: [],
      reqParams: {
        per_page: 20,
        page: 1
      },
      total: null
    }
  },
  mounted () {
    this.getEcharts()
    console.log(this.getEcharts())
  },
  created () {
    this.getFansList()
  },
  methods: {
    //   获取数
    // 获取最新当前页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.total = data.total_count
      this.fansList = data.results
    },
    getEcharts () {
      // 基于准备好的dom，初始化echarts实例
      const dom = this.$refs.dom
      console.log(dom)

      //   初始化
      const myEcharts = echarts.init(dom)
      // 指定图表的配置项和数据
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myEcharts.setOption(option)
    }
  }
}
</script>

<style scoped lang='less'>
.fans_item {
  width: 140px;
  height: 180px;
  padding-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px dashed #dddddd;
  text-align: center;
  display: inline-block;
  p {
    font-size: 14px;
    color: #303133;
  }
}
</style>
