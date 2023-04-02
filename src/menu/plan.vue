<template>
    <div class="whole_container">
          <div class="inputData">
            <el-tabs v-model="defaultTab" @tab-click="handleClick" >
              <el-tab-pane label="入库" name="first">

                <el-form :inline="true" :model="parcelIn" class="mag" :rules="rules">
                <el-form-item label="包裹ID:" prop="id">
                    <el-input v-model="parcelIn.id" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item label="包裹目的地：" prop="place">
                    <el-input v-model="parcelIn.place" placeholder="目的地"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="avgDrving('parcelIn')">入库</el-button>
                </el-form-item>
            </el-form>

              </el-tab-pane>

              <el-tab-pane label="出库" name="second">

                <el-form :inline="true" :model="parcelOut" class="mag" :rules="rules">
                <el-form-item label="包裹ID:" prop="id">
                    <el-input v-model="parcelOut.id" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item label="包裹目的地：" prop="place">
                  <el-select v-model="parcelOut.place" placeholder="目的地">
                    <el-option label="北京" value="北京"></el-option>
                    <el-option label="上海" value="上海"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" :loading="loading"  @click="avgDrving('parcelOut')">出库</el-button>
                </el-form-item>

            </el-form>
              </el-tab-pane>
        
            </el-tabs>
            
          </div>
          <div class="can">
             <canvas id="stock" width="900" height="700"></canvas>
          </div>
    </div>
</template>

<script>
export default{
  data(){
    var parcelID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入包裹id'))
        } else if (!/(?=.*[a-zA-Z])[a-zA-Z0-9]{6,18}/.test(value)) {
          return callback(new Error('密码长度在6-18个字符，只能包含数字、大小写字母 且 至少包含一个字母'))
        }else {
          callback()
        }
      }
      var parcelPlace = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }

    return{
      loading: false,//加载效果
      defaultTab:'first',
      parcelIn:{
        id:'',
        place: ''
      },
      parcelOut:{
        id:'',
        place: ''
      },
      canvas:null,
      context:null,
      rules:{
        id:[{ validator: parcelID, trigger: 'blur' }],
        place:[{ validator: parcelPlace, trigger: 'blur' }]
      }
    }
  },
  //仓库初始化（画出平面图）
  mounted() {
      var init = JSON.parse(window.localStorage.getItem('initData'));
      if(init) {
        console.log("ok");
        console.log(init.capacity_x);
      }
      this.canvas=document.getElementById('stock');//创建一个画布
      this.context=this.canvas.getContext('2d');//canvas现在还是一个小孩子，不能支持3D
      this.context.fillStyle='#69a7e5';//填充颜色,可覆盖
      this.context.fillRect(0,0,init.capacity_x,init.capacity_y);//左手用来画个矩形

       //右手准备画个圆
      this.context.beginPath();//设置弧形，因为这里圆是属于弧形
      this.context.arc(100,75,50,0,2*Math.PI);//画弧的方法
      this.context.stroke();//在页面是实际画的方式 

    },  

    methods: {
      /**avg动画（出入库是否要共用一个） */
      avgDrving(parcel) {
       //表单验证-发送请求-得到后端数据-触发动画
       console.log(this.parcelOut.place)
       

      }
    }
}
</script>

<style lang="less" scoped>
#stock{
    border: 1px solid rgb(61, 94, 155);
}


  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .can {
    background-color: #eef3fb;
  }
</style>