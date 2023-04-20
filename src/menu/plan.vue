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
      pixi:{
        width_h:'',//仓库长度
        height_h:'',//仓库宽度
        avg:'',
        arr1:[[]],
        width_h:'300',
        height_h:'200',
        avg:'5',
        ping:[[[]]],
        arr1:[[0,400,60],[0,400,300],[0,600,300],[0,600,400],[1,300,60],[1,300,200],[1,500,200]],
        arr3:[[300,60],[300,200],[500,200]],
        arr4:[[400,60],[400,300],[600,300],[600,400]],
        arr2:{avg1:[[]]}
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
    //let test = JSON.parse(window.sessionStorage.getItem('depository')).depository;
    // console.log(test);
    let width_1=this.pixi.width_h;//货架实际长度
    let height_1=this.pixi.height_h;//货架实际宽度
    let proportion=1000/width_1;//按照屏幕大小计算比例
    let width_new=proportion*width_1;//屏幕画面像素大小
    let height_new=proportion*height_1;

    let test=[[[0,0],[1,0],[0,0],[1,0],[0,0],[2,0],[0,0]],[[0],[0],[0],[0],[0]],[[0],[3],[0],[3]],[[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],
              [17]],[[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31],[32]],[[-1],[0]],
              [[0],[7]],[[0],[8]],[[0],[9]],[[-2],[0]]];//一个假的货架数组
    //console.log(test[0][1][0]);]
    this.app = new PIXI.Application({
            width: width_new ,
            height: height_new ,
            backgroundColor: "#feeeed",
            transparent:false,
            resolution: 1,
            //forceCanvas: true,
            });
            //app.renderer.backgroundColor = 0xcccccc;
            //将应用画布添加到dom中
            this.$refs.page_canvas.appendChild(this.app.view);
            //document.body.appendChild(app.view);
            this.createhouse(proportion,test);
            const ball = PIXI.Texture.from("ball.png");
            //for(let j=0;j<this.pixi.avg;j++){
            const sprite1 = new PIXI.Sprite(ball);//创建精灵，可能需要20个，目前先画了两个
            //设置精灵的锚点
            sprite1.anchor.set(0.5,0.5);
            //设置精灵缩放
            sprite1.scale.set(0.05,0.05);
            //sprite.x = this.app.screen.width/2;
            //sprite.y= this.app.screen.height/2;
            
            
            sprite1.x=60;
            sprite1.y = 60;
            sprite1.vx = 0;
            sprite1.vy = 0;
            //this.app.stage.addChild(sprite1);
            const sprite2= new PIXI.Sprite(ball);
            //设置精灵的锚点
            sprite2.x=60;
            sprite2.y = 60;
            sprite2.anchor.set(0.5,0.5);
            //设置精灵缩放
            sprite2.scale.set(0.07,0.07);
            //sprite.x = this.app.screen.width/2;
            //sprite.y= this.app.screen.height/2;
            
            
            //sprite.x=0;
            sprite2.y = 60;
            sprite2.vx = 0;
            sprite2.vy = 0;
            this.app.stage.addChild(sprite2);
    let arr_new=this.pixi.arr1;
    var rr_now = new Array();

    var arr_now_1 = [];
    //let arr_now=[[0,0],[0,0],[0,0]];
    switch(2)
    {
      case 3:{

      }
     // ((arr_new[(arr_new.length-1)
      case 2:{
      // const ren1 = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
      //           ren1.beginFill("#f9d5e8");//填充颜色
      //           ren1.drawRect(300,300,100,100);//绘制矩形
      //           ren1.endFill();//结束填充

      //            this.app.stage.addChild(ren1);//将矩形添加到舞台
        
      //   let a=0;
      //   for(let h=0;h<arr_new.length;h++){
      //     if(arr_new[h][0]==1){
      //       console.log(a);
      //       console.log("yes");
      //       console.log(arr_new[h][1]);
      //       console.log(arr_new[h][2]);
      //       arr_now[0]=arr_new[h][1];
      //       arr_now[1]=arr_new[h][2];
      //       arr_now_1[a]=arr_now;
      //       console.log(arr_now_1[a][0]);
      //       console.log(arr_now_1[a][1]);
      //       a=a+1;
      //     }
         
      // }
      // console.log(arr_now_1);
      // console.log(arr_now_1.length);
      this.createStickerCanvas(arr_now_1,sprite2,a);//动画触发
      }
    
    }
    //this.createStickerCanvas(this.pixi.arr1,sprite1);//动画触发
    //this.createStickerCanvas(this.pixi.arr3,sprite2);//动画触发


    },  

    methods: {
      createhouse(proportion1,test1){
        var start=[];
        console.log("yes");
        for(let i=0;i<test1.length;i++){
              for(let j=0;j<test1[i].length;j++){
                switch(test1[i][j][0]){
                  case 0:{
                    this.createroad("#feeeed",j,i,proportion1);
                    break;
                  }
                  case 1:{
                    this.createroad("#f9d5e8",j,i,proportion1);
                    break;
                  }
                  case 2:{
                    this.create();
                    this.createroad("#b03a33",j,i,proportion1);
                    break;
                  }
                  case 3:{
                    this.createroad("#d7c83c",j,i,proportion1);
                    break;
                  }
                  case 4:{
                    this.createroad("#9cd73c",j,i,proportion1);
                    break;
                  }
                  case 5:{
                    this.createroad("#d7913c",j,i,proportion1);
                    break;
                  }
                  case 6:{
                    this.createroad("#3cd787",j,i,proportion1);
                    break;
                  }
                  case 7:{
                    this.createroad("#38de3b",j,i,proportion1);
                    break;
                  }
                  case 8:{
                    this.createroad("#ef5b9c",j,i,proportion1);
                    break;
                  }
                  case 9:{
                    this.createroad("#6f6d85",j,i,proportion1);
                    break;
                  }
                  case 10:{
                    this.createroad("#f05b72",j,i,proportion1);
                    break;
                  }
                  case 11:{
                    this.createroad("#a3cf62",j,i,proportion1);
                    break;
                  }
                  case 12:{
                    this.createroad("#444693",j,i,proportion1);
                    break;
                  }
                  case 13:{
                    this.createroad("#c76968",j,i,proportion1);
                    break;
                  }
                  case 14:{
                    this.createroad("#fab27b",j,i,proportion1);
                    break;
                  }
                  case 15:{
                    this.createroad("#b7ba6b",j,i,proportion1);
                    break;
                  }
                  case 16:{
                    this.createroad("#afb4db",j,i,proportion1);
                    break;
                  }
                  case 17:{
                    this.createroad("#1d953f",j,i,proportion1);
                    break;
                  }
                  case 18:{
                    this.createroad("#d64f44",j,i,proportion1);
                    break;
                  }
                  case 19:{
                    this.createroad("#faa755",j,i,proportion1);
                    break;
                  }
                  case 20:{
                    this.createroad("#78a355",j,i,proportion1);
                    break;
                  }
                  case 21:{
                    this.createroad("#f58f98",j,i,proportion1);
                    break;
                  }
                  case 22:{
                    this.createroad("#2a5caa",j,i,proportion1);
                    break;
                  }
                  case 23:{
                    this.createroad("#87843b",j,i,proportion1);
                    break;
                  }
                  case 24:{
                    this.createroad("#dea32c",j,i,proportion1);
                    break;
                  }
                  case 25:{
                    this.createroad("#006c54",j,i,proportion1);
                    break;
                  }
                  case 26:{
                    this.createroad("#7d5886",j,i,proportion1);
                    break;
                  }
                  case 27:{
                    this.createroad("#411445",j,i,proportion1);
                    break;
                  }
                  case 28:{
                    this.createroad("#f3715c",j,i,proportion1);
                    break;
                  }
                  case 29:{
                    this.createroad("#c77eb5",j,i,proportion1);
                    break;
                  }
                  case 30:{
                    this.createroad("#50b7c1",j,i,proportion1);
                    break;
                  }
                  case 31:{
                    this.createroad("#da765b",j,i,proportion1);
                    break;
                  }
                  case 32:{
                    this.createroad("#7bbfea",j,i,proportion1);
                    break;
                  }
                  case -1:{
                    
                    start[0]=j*10*proportion1;
                    start[1]=i*10*proportion1+5;
                    // const ren = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
                    // ren.beginFill("#1b315e");//填充颜色
                    // ren.drawRect(j*10*proportion1,i*10*proportion1+5,5*proportion1,30*proportion1);//绘制矩形
                    // ren.endFill();//结束填充
                    // this.app.stage.addChild(ren);//将矩形添加到舞台
                    break;
                  }
                  case -2:{
                    start[2]=j*10*proportion1;
                    start[3]=i*10*proportion1+5;
                    // const ren = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
                    // ren.beginFill("#1b315e");//填充颜色
                    // ren.drawRect(j*10*proportion1,i*10*proportion1+5,5*proportion1,30*proportion1);//绘制矩形
                    // ren.endFill();//结束填充
                    // this.app.stage.addChild(ren);//将矩形添加到舞台
                    break;
                  }

                }
              }
            }
            const ren = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
            ren.beginFill("#1b315e");//填充颜色
            ren.drawRect(start[0],start[1],5*proportion1,30*proportion1);//绘制矩形
            ren.endFill();//结束填充
            this.app.stage.addChild(ren);//将矩形添加到舞台
            const ren1 = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
            ren1.beginFill("#1b315e");//填充颜色
            ren1.drawRect(start[2],start[3],5*proportion1,30*proportion1);//绘制矩形
            ren1.endFill();//结束填充
            this.app.stage.addChild(ren1);//将矩形添加到舞台

      },
      create(){
        console.log("chenggong");
      },
      createroad(str,x,y,proportion2){
        const ren = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
                    ren.beginFill(str);//填充颜色
                    ren.drawRect(x*10*proportion2,y*10*proportion2,10*proportion2,10*proportion2);//绘制矩形
                    ren.endFill();//结束填充
                    this.app.stage.addChild(ren);//将矩形添加到舞台
      },
      //仓库动画
      createStickerCanvas(arr,sprite,g){
            // //sprite.x=0;
            // sprite.y = 60;
            // sprite.vx = 0;
            // sprite.vy = 0;
            // this.app.stage.addChild(sprite);
          //}
            // //设置运行的速度
            // function play() {
            //     sprite.vx = 2;
            //     sprite.vy = 1;
            //     sprite.x += sprite.vx;
            //     sprite.y += sprite.vy
            // }
            //let _this=this;//为了让函数里的函数也能调用data的数据
          //   let root=0;
            
          //   this.app.ticker.add (function(){
          //     for(let h=0;h<((arr[(arr.length-1)][0])+1);h++){
          //   for(let j=0;j<arr.length;j++){
          //     if(arr[j][0]=h){
          //       root=root++;
          //     }

          //   }
          // }
           console.log(arr);     
            this.app.ticker.add (function(){
                sprite.rotation += 0.2;
                //定义
                //let arr = _this.pixi.arr1[[]];
                
                for(let i=0;i<arr.length;i++){
                  console.log(arr[i][0]);
                   if(sprite.x==arr[i][0]&&sprite.y!=arr[i][1]){
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
                
           })
            
        },
           
            
        
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
    font:#38de3b
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


