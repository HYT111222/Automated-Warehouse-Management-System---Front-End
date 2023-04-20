<template>
  <div>
    <div class="whole_container">
          <div class="inputData">
            <el-tabs v-model="defaultTab" @tab-click="handleClick" >
              <el-tab-pane label="入库" name="first">
               
                <el-form :inline="true" :model="parcelInList" class="mag" :rules="rules">
                  <div  v-for= "(item) in parcelInList" >
                <el-form-item label="包裹ID:" prop="id">
                    <el-input v-model="item.id" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item label="包裹目的地：" >
                    <el-select v-model="item.place" placeholder="目的地">
                    <!--香港澳门台湾是否在业务范围内-->
                    <el-option label="北京" value="北京"></el-option>
                    <el-option label="上海" value="上海"></el-option>
                    <el-option label="广东" value="广"></el-option>
                    <el-option label="天津" value="天津"></el-option>
                    <el-option label="重庆" value="重庆"></el-option>
                    <el-option label="河北" value="河北"></el-option>
                    <el-option label="山西" value="山西"></el-option>
                    <el-option label="陕西" value="陕西"></el-option>
                    <el-option label="山东" value="山东"></el-option>
                    <el-option label="河南" value="河南"></el-option>
                    <el-option label="辽宁" value="辽宁"></el-option>
                    <el-option label="吉林" value="吉林"></el-option>
                    <el-option label="黑龙江" value="黑龙江"></el-option>
                    <el-option label="江苏" value="江苏"></el-option>
                    <el-option label="浙江" value="浙江"></el-option>
                    <el-option label="安徽" value="安徽"></el-option>
                    <el-option label="江西" value="江西"></el-option>
                    <el-option label="福建" value="福建"></el-option>
                    <el-option label="湖北" value="湖北"></el-option>
                    <el-option label="湖南" value="湖南"></el-option>
                    <el-option label="四川" value="四川"></el-option>
                    <el-option label="贵州" value="贵州"></el-option>
                    <el-option label="云南" value="云南"></el-option>
                    <el-option label="海南" value="海南"></el-option>
                    <el-option label="甘肃" value="甘肃"></el-option>
                    <el-option label="内蒙古" value="内蒙古"></el-option>
                    <el-option label="青海" value="青海"></el-option>
                    <el-option label="新疆" value="新疆"></el-option>
                    <el-option label="西藏" value="西藏"></el-option>
                    <el-option label="广西" value="广西"></el-option>
                    <el-option label="宁夏" value="宁夏"></el-option>
                  </el-select>
                  </el-form-item>
              </div >
                <el-form-item  >
                    <el-button type="primary" :loading="loading" @click="avgPlace('parcelInList')">入库</el-button>
                </el-form-item>
            </el-form>
          
              </el-tab-pane>

              <el-tab-pane label="出库" name="second">

                <el-form :inline="true" :model="parcelOutList" class="mag" :rules="rules">
                  <div  v-for= "(item) in parcelOutList" >
                <el-form-item label="包裹ID:" prop="id">
                    <el-input v-model="item.id" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item label="包裹目的地：" >
                    <el-select v-model="item.place" placeholder="目的地">
                    <!--香港澳门台湾是否在业务范围内-->
                    <el-option label="北京" value="北京"></el-option>
                    <el-option label="上海" value="上海"></el-option>
                    <el-option label="广东" value="广"></el-option>
                    <el-option label="天津" value="天津"></el-option>
                    <el-option label="重庆" value="重庆"></el-option>
                    <el-option label="河北" value="河北"></el-option>
                    <el-option label="山西" value="山西"></el-option>
                    <el-option label="陕西" value="陕西"></el-option>
                    <el-option label="山东" value="山东"></el-option>
                    <el-option label="河南" value="河南"></el-option>
                    <el-option label="辽宁" value="辽宁"></el-option>
                    <el-option label="吉林" value="吉林"></el-option>
                    <el-option label="黑龙江" value="黑龙江"></el-option>
                    <el-option label="江苏" value="江苏"></el-option>
                    <el-option label="浙江" value="浙江"></el-option>
                    <el-option label="安徽" value="安徽"></el-option>
                    <el-option label="江西" value="江西"></el-option>
                    <el-option label="福建" value="福建"></el-option>
                    <el-option label="湖北" value="湖北"></el-option>
                    <el-option label="湖南" value="湖南"></el-option>
                    <el-option label="四川" value="四川"></el-option>
                    <el-option label="贵州" value="贵州"></el-option>
                    <el-option label="云南" value="云南"></el-option>
                    <el-option label="海南" value="海南"></el-option>
                    <el-option label="甘肃" value="甘肃"></el-option>
                    <el-option label="内蒙古" value="内蒙古"></el-option>
                    <el-option label="青海" value="青海"></el-option>
                    <el-option label="新疆" value="新疆"></el-option>
                    <el-option label="西藏" value="西藏"></el-option>
                    <el-option label="广西" value="广西"></el-option>
                    <el-option label="宁夏" value="宁夏"></el-option>
                  </el-select>
                  </el-form-item>
              </div >
                <el-form-item  >
                    <el-button type="success" :loading="loading" @click="avgFetch('parcelOutList')">入库</el-button>
                </el-form-item>
            </el-form>
              </el-tab-pane>
        
            </el-tabs>
            
          </div>
            
          </div>
          <!-- <div class="can">
             <canvas id="stock" width="900" height="700"></canvas>
          </div> -->
    
    <!-- <div>仓库实时平面图 -->
    <div class="canvas">
        <div ref="page_canvas"></div>
        <canvas id='mycanvas' ></canvas>
    </div>
  </div>
</template>


<script>
//导入pixi.js
  import * as PIXI from "pixi.js";
  import other from '@/api/other.js'
  import user from '@/api/user'
export default{
  data(){
    var parcelID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入包裹id'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,16}$/.test(value)) {
          return callback(new Error('长度在1-16个字符，只能包含数字、大小写字母'))
        }else {
          callback()
        }
      }

    return{
      parcelInList:[{}],//入库信息
      parcelOutList:[{}],//出库信息
      loading: false,//加载效果
      defaultTab:'first',
      //avg运动

      parcel:{
        id:'',
        place: ''
      },
      rules:{
        id:[{ validator: parcelID, trigger: 'blur' }]
      }
    }
  },
  //初始化数据
  created(){
    const _this = this
    var token = JSON.parse(window.localStorage.getItem("Token")).token
    //SVG测试
    let temp = JSON.parse(window.localStorage.getItem('initData'))
    console.log(temp)
    let x = temp.capacity_x
    let y = temp.capacity_y
    this.box = "0 0 "+ x + " " + y
    console.log("svg")
    console.log(this.box)

    //初始化表单
    console.log(temp.gateMachine)
    for (let i = 0; i < temp.gateMachine; i++) {
      this.parcelInList[i] = this.parcel
      this.parcelOutList[i] = this.parcel
    }
    
  },
  //仓库初始化（画出平面图,根据后端返回的数据）
  mounted() {
    this.createStickerCanvas();

    },  

    methods: {
      //仓库动画
      createStickerCanvas(){
            this.app = new PIXI.Application({
            width: 1000 ,
            height: 600 ,
            backgroundColor: "#bff8ec",
            transparent:false,
            resolution: 1,
            //forceCanvas: true,
            });
            //app.renderer.backgroundColor = 0xcccccc;
            //将应用画布添加到dom中
            this.$refs.page_canvas.appendChild(this.app.view);
            //document.body.appendChild(app.view);
            for(let i=0;i<4;i++){
              for(let j=0;j<4;j++){
                const ren = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
                ren.beginFill("#f9d5e8");//填充颜色
                ren.drawRect(j*200,i*100,100,50);//绘制矩形
                ren.endFill();//结束填充

                 this.app.stage.addChild(ren);//将矩形添加到舞台
              }
            }
            // let runball=function(){
            // const ren = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
            // ren.beginFill(0x66ccff);//填充颜色
            // ren.drawCircle(400,400,300);//绘制圆
            // ren.endFill();//结束填充

            //  this.app.stage.addChild(ren);//将矩形添加到舞台
            // }
            // runball();
            //创建一个纹理来添加图片
            const ball = PIXI.Texture.from("ball.png");
            const sprite = new PIXI.Sprite(ball);
            //设置精灵的锚点
            sprite.anchor.set(0.5,0.5);
            //设置精灵缩放
            sprite.scale.set(0.05,0.05);
            //sprite.x = this.app.screen.width/2;
            //sprite.y= this.app.screen.height/2;
            
            
            sprite.y = 60;
            sprite.vx = 0;
            sprite.vy = 0;
            this.app.stage.addChild(sprite);
            // runball() {
            //  this.app.ticker.add(function () {
            //     sprite.rotation += 0.2
            //     if(sprite.x < 700 && sprite.y <350) {
            //         play()
            //     }
            //     if(sprite.x == 699 || sprite.y == 349){
            //         sprite.visible=false;
            //     }
            
            // })
            // //设置运行的速度
            // function play() {
            //     sprite.vx = 2;
            //     sprite.vy = 1;
            //     sprite.x += sprite.vx;
            //     sprite.y += sprite.vy
            // }
            
            // runball();
            //控制运动规迹，让它在终点消失
            this.app.ticker.add(function () {
                sprite.rotation += 0.2;
                // 定义
                let arr = [[400,60],[400,300],[600,300],[600,400]]
                //在使用时，需要创建一个一维数组，否则会报错。
                 //arr[i] = []
                // 赋值
          
                //v-for="n in 3"
                for(let i=0;i<arr.length;i++){
                    // if(sprite.x!=arr[i][i]&&sprite.y!=arr[i][i+1]){
                    //     sprite.vx = 1;
                    //     sprite.vy= 1;
                    //     sprite.x += sprite.vx;
                    //     sprite.y += sprite.vy;
                    //     //play()
                    // }
                   if(sprite.x==arr[i][0]&&sprite.y!=arr[i][1]){
                        //console.log(arr[i][i]);

                        //sprite.x += 1;
                        sprite.y += 2;
                    }
                    else if(sprite.x!=arr[i][0]&&sprite.y==arr[i][1]){
                        sprite.x += 2;
                        //sprite.y += 1;
                    }

                    else if(sprite.x==arr[(arr.length-1)][0]&&sprite.y==arr[(arr.length-1)][1]){
                       sprite.visible=false;
                        //sprite.y += 1;
                    }
                    
                }
                //sprite.visible=false;
            })
            
        },
            //     // if(sprite.x < 7play()00 && sprite.y <350) {
            //     //     
            //     // }
            //     // if(sprite.x == 699 || sprite.y == 349){
            //     //     sprite.visible=false;
            //     // }
            // });
            // //设置运行的速度
            // function play() {
            //     sprite.vx = 2;
            //     sprite.vy = 1;
            //     sprite.x += sprite.vx;
            //     sprite.y += sprite.vy
            // };   
        
        
            
        
        //创建一个纹理
        createsprite(app1){
            const ball = PIXI.Texture.from("src\assets\ball.png") 
            const sprite = new PIXI.Sprite(ball);
            sprite.width = app.screen.width/2;
            sprite.height= app.screen.height/2;
            app1.stage.addChild(sprite);

        },
      //入库avg动画
      avgPlace(formName) {
       //表单验证-加载-发送请求(传输数据)-得到后端数据-关闭加载-触发动画
       console.log(this.parcelOutList[0].place)
       this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true//要在动画之前关闭
          other.enterStock(formName,token).then(res=>{
            if(res) {
              setTimeout(() => {
                for (let i = 0; i<res.data.avgPlace.parcelList.length; i++){
                if(res.data.avgPlace.parcelList[i].status==true) {//可以入库
                //提示用户该包裹可以正在入库中,保存路线以及存放位置，启动动画
                //动画avg运动到指定位置后提示用户，该包裹入库完成，位置为XXX
                }else {
                  //提示用户该包裹不可入库
                }
              }
              },500)
              this.$message({
                message: '仓库初始化成功',
                type: 'success'
              })
            }
          }).finally(res=>{
            this.loading = false
          })  
        }
       })
       

      },
      //出库avg动画
      avgFetch(formName) {
        //表单验证-加载-发送请求(传输数据)-得到后端数据-关闭加载-触发动画
        console.log(this.parcelOutList[0].place)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true//要在动画之前关闭
            other.enterStock(formName,token).then(res=>{
              if(res) {
                setTimeout(() => {
                  for (let i = 0; i<res.data.avgPlace.parcelList.length; i++){
                  if(res.data.avgPlace.parcelList[i].status==true) {//可以入库
                  //提示用户该包裹可以正在入库中,保存路线以及存放位置，启动动画
                  //动画avg运动到指定位置后提示用户，该包裹入库完成，位置为XXX
                  }else {
                    //提示用户该包裹不可入库
                  }
                }
                },500)
                this.$message({
                  message: '仓库初始化成功',
                  type: 'success'
                })
              }
            }).finally(res=>{
              this.loading = false
            })  
          }
        })
      },
      //切换
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style lang="less" scoped>

  .can {
    border: #101a28;
  }
</style>
      
    

</script>

<style lang="less" scoped>//scoped控制其只在当前组件内生效，而不是全局样式！！！
#stock{
    border: 1px solid rgb(190, 206, 50);
}
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
     font:#bff8ec
  }
  .can {
    background-color: #eef3fb;
  }
  .mycanvas{
  width: 1000pt;
  height: 800pt;
  position: fixed;
  //background-color: #cee2d2;
  left:200pt;
  top:100pt;

}
</style>


