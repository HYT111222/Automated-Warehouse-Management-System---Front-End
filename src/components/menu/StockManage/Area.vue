<template>
    <div>
     <el-container style="height: 500px; border: 1px solid #eee">
        <el-header>
            <span>  货架编号:</span>
            <el-input v-model="regionId" placeholder="请输入库区编号" size="medium" style="width:200px"></el-input>
            <el-button type="primary"  icon="el-icon-search"  round size="small">搜索</el-button>
        </el-header>
     <el-container>
      <el-aside width="100px" style="background-color: rgb(255, 255, 255);height:500px">
        <el-menu class="menu"
          @select="menuselected"
          background-color="#5ea6c9"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse-transition="false"
          >
              <el-menu-item index="北京">
                  <span slot="title" > 北京</span>
              </el-menu-item>
              <el-menu-item index="上海">
                  <span slot="title" > 上海</span>
              </el-menu-item>
              <el-menu-item index="广东">
                  <span slot="title" > 广东</span>
              </el-menu-item>
              <el-menu-item index="天津">
                  <span slot="title" > 天津</span>
              </el-menu-item>
              <el-menu-item index="重庆">
                  <span slot="title" > 重庆</span>
              </el-menu-item>
              <el-menu-item index="河北">
                  <span slot="title" > 河北</span>
              </el-menu-item>
              <el-menu-item index="山西">
                  <span slot="title" > 陕西</span>
              </el-menu-item>
              <el-menu-item index="陕西">
                  <span slot="title" > 陕西</span>
              </el-menu-item>
              <el-menu-item index="山东">
                  <span slot="title" > 山东</span>
              </el-menu-item>
              <el-menu-item index="河南">
                  <span slot="title" > 河南</span>
              </el-menu-item>
              <el-menu-item index="辽宁">
                  <span slot="title" > 辽宁</span>
              </el-menu-item>
              <el-menu-item index="吉林">
                  <span slot="title" > 吉林</span>
              </el-menu-item>
              <el-menu-item index="黑龙江">
                  <span slot="title" > 黑龙江</span>
              </el-menu-item>
              <el-menu-item index="江苏">
                  <span slot="title" > 江苏</span>
              </el-menu-item>
              <el-menu-item index="浙江">
                  <span slot="title" > 浙江</span>
              </el-menu-item>
              <el-menu-item index="安徽">
                  <span slot="title" > 安徽</span>
              </el-menu-item>
              <el-menu-item index="江西">
                  <span slot="title" > 江西</span>
              </el-menu-item>
              <el-menu-item index="福建">
                  <span slot="title" > 福建</span>
              </el-menu-item>
              <el-menu-item index="湖北">
                  <span slot="title" > 湖北</span>
              </el-menu-item>
              <el-menu-item index="湖南">
                  <span slot="title" > 湖南</span>
              </el-menu-item>
              <el-menu-item index="四川">
                  <span slot="title" > 四川</span>
              </el-menu-item>
              <el-menu-item index="贵州">
                  <span slot="title" > 贵州</span>
              </el-menu-item>
              <el-menu-item index="云南">
                  <span slot="title" > 云南</span>
              </el-menu-item>
              <el-menu-item index="海南">
                  <span slot="title" > 海南</span>
              </el-menu-item>
              <el-menu-item index="甘肃">
                  <span slot="title" > 甘肃</span>
              </el-menu-item>
              <el-menu-item index="内蒙古">
                  <span slot="title" > 内蒙古</span>
              </el-menu-item>
              <el-menu-item index="青海">
                  <span slot="title" > 青海</span>
              </el-menu-item>
              <el-menu-item index="新疆">
                  <span slot="title" > 新疆</span>
              </el-menu-item>
              <el-menu-item index="西藏">
                  <span slot="title" > 西藏</span>
              </el-menu-item>
              <el-menu-item index="广西">
                  <span slot="title" > 广西</span>
              </el-menu-item>
              <el-menu-item index="宁夏">
                  <span slot="title" > 宁夏</span>
              </el-menu-item>


        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
        <el-card class="box-card">
            <el-descriptions title="库存信息">
            <el-descriptions-item label="库区id">{{ regionInformation.regionId }}</el-descriptions-item>
            <el-descriptions-item label="库区名称">{{ regionInformation.regionName }}</el-descriptions-item>
            <el-descriptions-item label="货架数">{{ regionInformation.shelfNumber }}</el-descriptions-item>
            </el-descriptions>
        </el-card>

        <el-card style="margin-top: 10px;">
            <span>  货架编号:</span>
            <el-input v-model="shelfId" placeholder="请输入货架编号" size="small" style="width:200px"></el-input>
            <el-button type="primary"  icon="el-icon-search"  round size="mini">搜索</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" plain style="float:right;padding: 6px; margin-bottom: 10px;">删除</el-button>
            <!--表头等操作-->
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" @selection-change="handleSelectionChange" 
            :header-row-style="{height:'30px'}" 
            :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
            :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }" 
            size='small' >
            
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column  prop="regionId"  label="库区编号"  >
            </el-table-column>
            <el-table-column  prop="shelfId"  label="货架编号">
            </el-table-column>
            <el-table-column prop="shelfCapacity" label="货架容量" ></el-table-column>
            <el-table-column prop="shelfAllowance"  label="货架余量" >
            </el-table-column>
        <el-table-column
            label="操作">
        <template slot-scope="scope">
            <div style=" display: flex;">
                <el-button @click="handleClick(scope.row)" type="text" size="small" > 删除</el-button>
            </div>
        </template>
        </el-table-column>
        </el-table>
        <el-pagination align='center' 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :current-page="currentPage" 
        :page-sizes="[5,10,20]" 
        :page-size="pageSize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="tableData.length"
        style="margin-top: 7px;">
        </el-pagination>
    </el-card>

        </el-main>
       </el-container>
      </el-container>
    </el-container>
    </div>
  </template>
  
  <script>
  import regionAndShelf from '@/api/regionAndShelf';
  export default{
    data(){
      return {
        regionInformation:{
            regionId:'BJ',
            regionName:'北京',
            shelfNumber:'10'
        },
        tableData:[
                {
                    regionId:"BJ",
                    shelfId:"01",
                    shelfCapacity:"100",
                    shelfAllowance:"80"
                },
                {
                    regionId:"BJ",
                    shelfId:"01",
                    shelfCapacity:"100",
                    shelfAllowance:"80"
                },
                {
                    regionId:"BJ",
                    shelfId:"01",
                    shelfCapacity:"100",
                    shelfAllowance:"80"
                },
                {
                    regionId:"BJ",
                    shelfId:"01",
                    shelfCapacity:"100",
                    shelfAllowance:"80"
                },
                {
                    regionId:"BJ",
                    shelfId:"01",
                    shelfCapacity:"100",
                    shelfAllowance:"80"
                },
                {
                    regionId:"BJ",
                    shelfId:"01",
                    shelfCapacity:"100",
                    shelfAllowance:"80"
                },
                {
                    regionId:"BJ",
                    shelfId:"01",
                    shelfCapacity:"100",
                    shelfAllowance:"80"
                },
                {
                    regionId:"BJ",
                    shelfId:"01",
                    shelfCapacity:"100",
                    shelfAllowance:"80"
                },
                {
                    regionId:"BJ",
                    shelfId:"01",
                    shelfCapacity:"100",
                    shelfAllowance:"80"
                }
            ],
        multipleSelection: [],//选中的信息
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 5 // 每页的数据条数
      }
    },
    
    methods:{
      menuselected(e){
        console.log(e)
      },
       //每页条数改变时触发 选择一页显示多少行
     handleSizeChange(val) {
         console.log(`每页 ${val} 条`);
         this.currentPage = 1;
         this.pageSize = val;
     },
     //当前页改变时触发 跳转其他页
     handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
         this.currentPage = val;
     },
        //清除筛选器
        resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      //状态标签筛选器
      filterTag(value, row) {
        return row.inStatus === value;
      },
      //取消选择
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      
    }
    }
      
  
  </script>
  
<style lang="less" scoped>
.box-card {
    position: relative;
}
  .menu {
  
  background-color: transparent !important;
  }
  .menu{
    color:#5ea6c9
  }
  </style>