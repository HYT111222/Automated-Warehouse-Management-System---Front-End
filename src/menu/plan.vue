<template>
  <div>
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
          <!-- <div class="can">
             <canvas id="stock" width="900" height="700"></canvas>
          </div> -->
    </div>
    <!-- <div>仓库实时平面图 -->
    <div class="canvas">
        <div ref="page_one"></div>
        <div ref="page_canvas"></div>
        <canvas id='mycanvas' ></canvas>
    </div>
    <!-- </div> -->
  </div>
</template>


<script>
//导入pixi.js
import * as PIXI from "pixi.js";

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
    methods:{
      avgDrving(parcel) {
       //表单验证-发送请求-得到后端数据-触发动画
       console.log(this.parcelOut.place)
      
      },
        
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

        }
        },
        
        
            // method(){
            //     onemethod();
            // }
    
    mounted(){
      var init = JSON.parse(window.localStorage.getItem('initData'));
      if(init) {
        console.log("ok");
        console.log(init.capacity_x);
      }
      // this.canvas=document.getElementById('stock');//创建一个画布
      // this.context=this.canvas.getContext('2d');//canvas现在还是一个小孩子，不能支持3D
      // //this.context.fillStyle='#69a7e5';//填充颜色,可覆盖
      // this.context.fillRect(0,0,init.capacity_x,init.capacity_y);//左手用来画个矩形
      //  //右手准备画个圆
      // this.context.beginPath();//设置弧形，因为这里圆是属于弧形
      // this.context.arc(100,75,50,0,2*Math.PI);//画弧的方法
      // this.context.stroke();//在页面是实际画的方式 
        // this.app = new PIXI.Application({
        //     width: 600 ,
        //     height: 500 ,
        //     backgroundColor: "#100B34",
        //     resolution:  1,
        //     // left: 2000,
        //     // top: 700 ,
        //     });
        //     //将应用画布添加到dom中
        //     this.$refs.page_canvas.appendChild(this.app.view);
        //     document.body.appendChild(app.view);

        //     const ren = new PIXI.Graphics();
        //     ren.beginFill(0x66ccff);//填充颜色
        //     ren.drawCircle(200,200,60);//绘制圆
        //     ren.endFill();//结束填充

        //     this.app.stage.addChild(ren);//将矩形添加到舞台
        //this.createUnder();
        this.createStickerCanvas();
        //this.createsprite(this.app);
    }
    
}
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


