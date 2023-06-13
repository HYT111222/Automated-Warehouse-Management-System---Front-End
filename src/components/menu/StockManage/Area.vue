<template>
    <div>
     <el-container style="height: 500px; ">
        <el-header>
            <span>  库区名称:</span>
            <el-input v-model="regionName" placeholder="请输入库区名称" size="medium" style="width:200px"></el-input>
            <el-button type="primary"  @click="regionselected(this.regionName)" icon="el-icon-search"  round size="small">搜索</el-button>
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
        <el-main style="padding-top:0px ;">
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
            <el-button type="primary"  @click="searchShelfID(shelfId)" icon="el-icon-search"  round size="mini">搜索</el-button>

            <template>
            <el-popconfirm @confirm="confirm()" title="确定添加货架吗？" >
                <el-button slot="reference" type="primary" icon="el-icon-circle-plus-outline" size="small" plain style="float:right;padding: 6px; margin-bottom: 10px;">添加货架</el-button>
            </el-popconfirm>
            </template>
            <!--表头等操作-->
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" height="250px" style="width: 100%" @selection-change="handleSelectionChange"
            :header-row-style="{height:'30px'}"
            :header-cell-style="{background:'#f5f7fa',padding:'0px',textAlign: 'center'}"
            :row-style="{height:'40px'}" :cell-style="{padding:'0px', textAlign: 'center' }"
            size='small' >


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
                <el-button @click="deleteshelf(scope.row)" type="text" style="flex: auto" size="small" > 删除货架</el-button>
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
   //判断待删除的货架的状态，空的才能删除
   function judgeState(thing){
        if (thing.shelfAllowance==thing.shelfAllowance){
                return true
             }
        return false
}
  export default{
    data(){
      return {
        dialogTableVisible:false,
        regionName:'BJ',
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
    confirm(){
        console.log(this.regionInformation.regionId)
        regionAndShelf.addShelf(this.regionInformation.regionId).then(res=>{
            if(res.data.status_code === true){
                    this.$message({
                        message:"添加成功",
                        type:"success"
                    })
            }
            else {
                    this.$message({
                    message:"添加失败",
                    type:"error"
                    })
                }
            })

    },
    // regionselected(e){
    //     console.log(e)
    //     this.parcelName=e
    //     regionAndShelf.searchRegion(e).then(res=>{
    //                console.log(res)
    //                this.regionInformation.regionId = res.data.inBoundPeopleList[0].regionId
    //                this.regionInformation.regionName = res.data.inBoundPeopleList[0].regionName
    //                this.regionInformation.shelfNumber = res.data.inBoundPeopleList[0].shelfNumber
    //                 this.$message({
    //                     message:"查找成功",
    //                     type:"success"
    //                 })
    //                 regionAndShelf.allShelf(this.regionInformation.regionId).then(are=>{
    //                 console.log(are)
    //                 if(are.data.status_code === true){
    //                     this.tableData = are.data.shelfList
    //                 }else {
    //                     this.$message({
    //                         message:"查询异常",
    //                         type:"error"
    //                     })
    //                 }
    //             })
    //         })

    // },
    //选择库区
      menuselected(e){
        console.log(e)
        this.parcelName=e
        regionAndShelf.searchRegion(e).then(res=>{
                   console.log(res)
                   this.regionInformation.regionId = res.data.inBoundPeopleList[0].regionId
                   this.regionInformation.regionName = res.data.inBoundPeopleList[0].regionName
                   this.regionInformation.shelfNumber = res.data.inBoundPeopleList[0].shelfNumber
                    this.$message({
                        message:"查找成功",
                        type:"success"
                    })
                    regionAndShelf.allShelf(this.regionInformation.regionId).then(are=>{
                    console.log(are)
                    if(are.data.status_code === true){
                        this.tableData = are.data.shelfList
                    }else {
                        this.$message({
                            message:"查询异常",
                            type:"error"
                        })
                    }
                })
            })

      },
    //按照货架编号搜索货架
    searchShelfID(id){
            if (id!= null) {
                regionAndShelf.searchShelf(id).then(res=>{
                    if(res.data.status_code === true){
                        this.tableData.regionId = res.data.regionId
                        this.tableData.shelfId=res.data.shelfId
                        this.tableData.shelfCapacity=res.data.shelfCapacity
                        this.tableData.shelfAllowance=res.data.shelfAllowance
                    }else {
                        this.$message({
                            message:"查询异常",
                            type:"error"
                        })
                    }
                })
            }
            else if(id==null){
                regionAndShelf.allShelf(this.regionInformation.regionId).then(res=>{
                    if(res.data.status_code === true){
                        this.tableData = res.data.shelfList
                    }else {
                        this.$message({
                            message:"查询异常",
                            type:"error"
                        })
                    }
                })
            }

    },
    deleteshelf(row){
        if (judgeState(row) == true){
            regionAndShelf.deleteShelf(row.shelfId).then(res=>{
                if(res.data.status_code ==true){
                    this.$message({
                        message:"删除成功",
                        type:"success"
                    })
                }else{
                    this.$message({
                        message:"删除异常",
                        type:"error"
                    })
                }
            })
        }else {
            this.$message({
                message:"只能删除空货架",
                type:"error"
            })
        }


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
    // background-color: antiquewhite;
    // margin-top: 0%;
}
  .menu {

  background-color: transparent !important;
  }
  .menu{
    color:#5ea6c9
  }
  .textInput2 {
    width: 303px;
    align-items: center;
}
  </style>
