<template>
    <div>
        <el-card style="margin-bottom: 10px;" >
            <div class="whole">
            <div style="float: left;display: flex;" >
                <div class="personal-img">
                <img src="@/assets//image/R.jpg" />
            </div>
            <div class="personal-text" >
                <div >
                    <h3 style="">Hello~{{ userName }}</h3>
                   <div style="margin-bottom: 10px;display: flex;padding: auto;">
                    <div style="margin-right: 10px;">
                        <i class="iconfont" style="color:rgb(244, 84, 16); margin-right: 5px;font-size:20px;" v-if="authority==='仓库管理员'" >&#xe8d2;</i>
                        <i class="iconfont" style="color: blue;margin-right: 5px;font-size:20px;" v-else >&#xe8cf;</i>
                        <span style="">{{ authority }}</span>
                    </div>
                    <div >
                            <i class="iconfont" style="margin-right: 5px;color:red;font-size:20px;">&#xe8cc;</i>
                           <span v-if="authority==='仓库管理员'">仓库员工数量{{ staffNum }}</span>
                           <span v-else>所属管理员：{{ managerName }}</span>
                    </div>
                   </div> 
                   <div>
                    <span style="">{{ time }}</span>
                   </div>
                </div>
            </div>
            </div>
            
            <div style="float: right; display: flex;margin-top:20px;"  >
                <div style="text-align: center;" >
                    <div v-if="authority==='仓库管理员'">
                        <div>
                        <el-badge :value="inList.length" class="item">
                    <el-button type="primary" @click="managerToDeal" icon="el-icon-s-order" plain  circle style="padding:5px; font-size: 30px;"></el-button>
                    </el-badge>
                    </div>
                    <div style="margin-top: 7px;">
                        <span style="font-size: 10px;">待审核入库单</span>
                    </div>
                    </div>
                    <div v-else>
                        <div>
                            <el-badge :value="inList.length" class="item">
                            <el-button type="success" icon="el-icon-s-order" @click="userToDealIn" plain  circle style="padding:5px; font-size: 30px;" ></el-button>
                            </el-badge>
                        </div>
                        <div style="margin-top: 7px;">
                            <span style="font-size: 10px;">待入库单</span>
                        </div>
                    </div>
                </div>
                <div style="text-align: center;margin-left: 15px;">
                    <div v-if="authority==='仓库管理员'">
                        <div>
                        <el-badge :value="outList.length" class="item">
                        <el-button @click="managerToDeal" type="primary" icon="el-icon-s-management" plain  circle style="padding:5px; font-size: 30px;"></el-button>
                        </el-badge>
                    </div>
                    <div style="margin-top: 7px;">
                        <span style="font-size: 10px;">待审核出库单</span>
                    </div>
                    </div>
                    <div v-else>
                        <div>
                            <el-badge :value="outList.length" class="item">
                            <el-button type="success" icon="el-icon-s-management" @click="userToDealOut" plain  circle style="padding:5px; font-size: 30px;"></el-button>
                            </el-badge>
                        </div>
                        <div style="margin-top: 7px;">
                            <span style="font-size: 10px;">待出库单</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </el-card>
        <el-card style="float: left; width: 49%; " >
            <div class="left-container">
                <div class="one-icon-container">
                <div >
                    <i class="iconfont icon shelf">&#xe634;</i>
                    <el-statistic group-separator="," :precision="2" decimal-separator="." :value="shelfNum" title="货架数量">
                        <template slot="prefix">
                        <i class="el-icon-s-flag" style="color: red"></i>
                        </template>
                        <template slot="suffix">
                        <i class="el-icon-s-flag" style="color: blue"></i>
                        </template>
                    </el-statistic>
                </div>
            </div>
        
            <div class="one-icon-container">
                <div >
                    <i class="iconfont icon company">&#xe8d3;</i>
                    <el-statistic group-separator="," :precision="2" decimal-separator="." :value="companyNum" title="客户数量">
                        <template slot="prefix">
                        <i class="el-icon-s-flag" style="color: red"></i>
                        </template>
                        <template slot="suffix">
                        <i class="el-icon-s-flag" style="color: blue"></i>
                        </template>
                    </el-statistic>
                </div>
            </div>

            <div class="one-icon-container">
                <div >
                    <i class="iconfont icon enter">&#xeaca;</i>
                    <el-statistic group-separator="," :precision="2" decimal-separator="." :value="inPeopleNum" title="入库交接人数量">
                        <template slot="prefix">
                        <i class="el-icon-s-flag" style="color: red"></i>
                        </template>
                        <template slot="suffix">
                        <i class="el-icon-s-flag" style="color: blue"></i>
                        </template>
                    </el-statistic>
                </div>
            </div>

            <div class="one-icon-container">
                <div >
                    <i class="iconfont icon outer">&#xeac9;</i>
                    <el-statistic group-separator="," :precision="2" decimal-separator="." :value="outPeopleNum" title="出库交接人数量">
                        <template slot="prefix">
                        <i class="el-icon-s-flag" style="color: red"></i>
                        </template>
                        <template slot="suffix">
                        <i class="el-icon-s-flag" style="color: blue"></i>
                        </template>
                    </el-statistic>
                </div>
            </div>

   
            </div>
            
        </el-card>
        <div class="img-background" style="float: right;width: 49%;height: 500px;">
            
        </div>
        <!-- <el-card style="float: right;width: 49%;">

        </el-card> -->
    </div>
</template>
<script >
import user from '@/api/user.js'
import outAndIn from '@/api/outAndIn.js'

function nowTime(){
            var current = new Date();//实例化Date对象
            var nowYear = current.getFullYear();//获取当前的年份
            var nowMonth = current.getMonth() + 1;//默认显示的是0-11月，比我们正常的月份少一个月，所以要+1
            var nowdates = current.getDate();//获取日期
            var arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            var day = current.getDay();//因为西方人的习惯是周日第一，周一第二这样的排列
            //而且getDate（）返回的是 1 、 2这样的数字，我们想要获取星期几的话，可以自己先写好数组存放
            //然后通过数组的索引来获取星期几
            var time = '今天是' + nowYear + '年' + nowMonth + '月' + nowdates + '日' + arr[day]
            //接着就是组装成我们想要的格式了
            return  time
}
export default{
    data(){
        return{
            time:'',
            icon:'',
            userName:'HYT',
            authority:'仓库管理员',
            managerName: "",//普通特有
            staffNum: 0,//管理员特有
            //共同
            shelfNum: 0,
            companyNum: 0,
            inPeopleNum: 0,
            outPeopleNum: 0,
            //在登录后就发送请求并保存下来的数据(普通和管理员参数都一样，只是发送的请求不同)
            inList:[{}],
            outList: [ {} ]

        }
    },
    created(){
        this.time=nowTime()
        this.userName = window.sessionStorage.getItem('userID')
        if (window.sessionStorage.getItem('authority') === 'manager'){//管理员
            this.authority= '仓库管理员'
            user.managerHomePage().then(res=>{
                if (res.data.status_code == true){
                    this.staffNum = res.data.staffNum-1
                    this.shelfNum = res.data.shelfNum
                    this.companyNum = res.data.companyNum
                    this.inPeopleNum = res.data.inPeopleNum
                    this.outPeopleNum = res.data.outPeopleNum
                }else {
                    this.$message({
                    message: '获取主页信息异常',
                    type: 'error'
                    })
                }
            })
            outAndIn.InNeedTocheck().then(res=>{
                if (res.data.status_code === true){
                    this.inList = res.data.inList
                }
            })
            outAndIn.OutNeedTocheck().then(res=>{
                if (res.data.status_code === true){
                    this.outList = res.data.outList
                }
            })
        } else {                                //普通员工
            this.authority= '普通员工'
            user.userHomePage().then(res=>{
                if (res.data.status_code == true){
                    this.managerName = res.data.managerName
                    this.shelfNum = res.data.shelfNum
                    this.companyNum = res.data.companyNum
                    this.inPeopleNum = res.data.inPeopleNum
                    this.outPeopleNum = res.data.outPeopleNum
                }else {
                    this.$message({
                    message: '获取主页信息异常',
                    type: 'error'
                    })
                }
            })
            outAndIn.InNeedToEnter().then(res=>{
                if (res.data.status_code === true){
                    this.inList = res.data.inList
                }
            })
            outAndIn.OutNeedToOut().then(res=>{
                if (res.data.status_code === true){
                    this.outList = res.data.outList
                }
            })
            
        }
       
    },
    methods:{
        managerToDeal(){
            this.$router.push('/managerCheck')
        },
        //普通用户直接跳到出入库界面
        userToDealIn(){
            this.$router.push('/inStock')
        },
        userToDealOut(){
            this.$router.push('/outStock')
        }

    }

}
</script>
<style lang="less" scoped>
/**-----------------------------右下--------------------------------------- */
.img-background{
    background-image: url('@/assets/image/快递送货.png');
    background-size: cover;
}
/**------------------------------顶层---------------------------------- */
.personal-img{
    float: left;
    margin:auto;
    width: 108px;
    height: 108px;
    background-color:#5995fd;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 18px;
}
.personal-img img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
}
.personal-text {
   left: 20px;//距离
   position: relative;
  //display:flex;
}
/**--------------------------------左下-------------------------------------- */
.left-container{
    border-radius: 7px; 
    width: 100%;
    padding: 0px 0px 0px 0px;
}

.one-icon-container{
    display: flex;
    display: inline-block;
    justify-content: center;
    align-items: center;
    margin: 13px;
    padding: 0px 15px 0px 15px;
}
.icon {
    font-size: 150px;
}
.shelf{
color: rgb(114, 146, 123);
}
.company{
    color: rgb(155, 75, 67);
}
.enter{
    color: rgb(79, 95, 169);
}
.outer{
    color: rgb(19, 19, 148);
}

</style>