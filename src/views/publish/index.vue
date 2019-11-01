<template>
  <div class='container'>
              <template slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain></el-button>
          </template>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>
