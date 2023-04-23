<template>
  <div>
    <div class="whole_container">
          <div class="inputData">
            <el-tabs v-model="defaultTab" @tab-click="handleClick" >
              <el-tab-pane label="入库" name="first">
                <el-form :inline="true" :model="InData" ref="InData" class="mag" :rules="rules">
                  <div  v-for= "(item,index) in InData.parcelInList" >
                <el-form-item label="包裹ID:" :prop="'parcelInList.'+index+'.id'" :rules="rules.id">
                    <el-input v-model="item.id" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item label="包裹目的地：" >
                    <el-select v-model="item.place" placeholder="目的地">
                    <!--香港澳门台湾是否在业务范围内-->
                    <el-option label="北京" value="1"></el-option>
                    <el-option label="上海" value="2"></el-option>
                    <el-option label="广东" value="3"></el-option>
                    <el-option label="天津" value="4"></el-option>
                    <el-option label="重庆" value="5"></el-option>
                    <el-option label="河北" value="6"></el-option>
                    <el-option label="山西" value="7"></el-option>
                    <el-option label="陕西" value="8"></el-option>
                    <el-option label="山东" value="9"></el-option>
                    <el-option label="河南" value="10"></el-option>
                    <el-option label="辽宁" value="11"></el-option>
                    <el-option label="吉林" value="12"></el-option>
                    <el-option label="黑龙江" value="13"></el-option>
                    <el-option label="江苏" value="14"></el-option>
                    <el-option label="浙江" value="15"></el-option>
                    <el-option label="安徽" value="16"></el-option>
                    <el-option label="江西" value="17"></el-option>
                    <el-option label="福建" value="18"></el-option>
                    <el-option label="湖北" value="19"></el-option>
                    <el-option label="湖南" value="20"></el-option>
                    <el-option label="四川" value="21"></el-option>
                    <el-option label="贵州" value="22"></el-option>
                    <el-option label="云南" value="23"></el-option>
                    <el-option label="海南" value="24"></el-option>
                    <el-option label="甘肃" value="25"></el-option>
                    <el-option label="内蒙古" value="26"></el-option>
                    <el-option label="青海" value="27"></el-option>
                    <el-option label="新疆" value="28"></el-option>
                    <el-option label="西藏" value="29"></el-option>
                    <el-option label="广西" value="30"></el-option>
                    <el-option label="宁夏" value="31"></el-option>
                  </el-select>
                  </el-form-item>
              </div >
                <el-form-item  >
                    <el-button type="primary" :loading="loading" @click="avgPlace('InData')">入库</el-button>
                </el-form-item>
            </el-form>
              </el-tab-pane>

              <el-tab-pane label="出库" name="second">
                <el-form :inline="true" :model="OutData" class="mag" ref="OutData" :rules="rules">
                  <div  v-for= "(item2,index2) in OutData.parcelOutList" >
                <el-form-item label="包裹ID:" :prop="'parcelOutList.'+index2+'.id'" :rules="rules.id">
                    <el-input v-model="item2.id" placeholder="ID"></el-input>
                </el-form-item>
                <el-form-item label="包裹目的地：" >
                    <el-select v-model="item2.place" placeholder="目的地">
                    <!--香港澳门台湾是否在业务范围内-->
                    <el-option label="北京" value="1"></el-option>
                    <el-option label="上海" value="2"></el-option>
                    <el-option label="广东" value="3"></el-option>
                    <el-option label="天津" value="4"></el-option>
                    <el-option label="重庆" value="5"></el-option>
                    <el-option label="河北" value="6"></el-option>
                    <el-option label="山西" value="7"></el-option>
                    <el-option label="陕西" value="8"></el-option>
                    <el-option label="山东" value="9"></el-option>
                    <el-option label="河南" value="10"></el-option>
                    <el-option label="辽宁" value="11"></el-option>
                    <el-option label="吉林" value="12"></el-option>
                    <el-option label="黑龙江" value="13"></el-option>
                    <el-option label="江苏" value="14"></el-option>
                    <el-option label="浙江" value="15"></el-option>
                    <el-option label="安徽" value="16"></el-option>
                    <el-option label="江西" value="17"></el-option>
                    <el-option label="福建" value="18"></el-option>
                    <el-option label="湖北" value="19"></el-option>
                    <el-option label="湖南" value="20"></el-option>
                    <el-option label="四川" value="21"></el-option>
                    <el-option label="贵州" value="22"></el-option>
                    <el-option label="云南" value="23"></el-option>
                    <el-option label="海南" value="24"></el-option>
                    <el-option label="甘肃" value="25"></el-option>
                    <el-option label="内蒙古" value="26"></el-option>
                    <el-option label="青海" value="27"></el-option>
                    <el-option label="新疆" value="28"></el-option>
                    <el-option label="西藏" value="29"></el-option>
                    <el-option label="广西" value="30"></el-option>
                    <el-option label="宁夏" value="31"></el-option>
                  </el-select>
                  </el-form-item>
              </div >
                <el-form-item  >
                    <el-button type="success" :loading="loading" @click="avgFetch('OutData')">出库</el-button>
                </el-form-item>
            </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
    </div>
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
          return callback()
        } else {
            if (!/^\d+$/.test(value)) {
            return callback(new Error('只能包含数字'))
          }else {
            callback()
          }
        }
         
      }

    return{
      InData:{
        parcelInList:[],//入库信息
        token: ''
      },
      OutData:{
        parcelOutList:[],//出库信息
        token: ''
      },
      
      loading: false,//加载效果
      defaultTab:'first',

      parcel:{
        id:'',
        place: ''
      },
      pixi:{
        p:'',
        avgList:[
        {
            avg_id:'0',
            parcelList: [],
            route: [[0,0],[50,0],[50,100],[74,100]]
        },
        {
            avg_id:'1',
            parcelList: [],
            route: [[0,124],[50,124],[50,150]]
        }
   ],
   avgList2:[
        {
            avg_id:'0',
            parcelList: [],
            route: [[74,100],[50,100],[50,0],[0,0]]
        },
        {
            avg_id:'1',
            parcelList: [],
            route: [[50,150],[50,124],[0,0]]
        }
   ]
      },
      rules:{
        id:[ { validator: parcelID, trigger: 'blur' } ]
      }
    }
  },
  //初始化数据
  created(){
    let temp = JSON.parse(window.sessionStorage.getItem('initData'))
    let width_start=JSON.parse(window.sessionStorage.getItem('initData')).capacity_x;//货架实际长度
    this.pixi.p=1000/width_start;
    //初始化表单
    console.log(temp.gateMachine)
    for (let i = 0; i < temp.gateMachine; i++) {
      //不能将parcel放在循环外，用同一个parcel赋给列表
      let parcel={
        id:'',
        place: ''
      }
      let parcel2={
        id:'',
        place: ''
      }
      this.InData.parcelInList.push(parcel)
      this.OutData.parcelOutList.push(parcel2)
      
    }
    console.log(this.InData.parcelInList.length)
    
  },
  //仓库初始化（画出平面图,根据后端返回的数据）
  mounted() {
    let test = JSON.parse(window.sessionStorage.getItem('depository')).depository;
    console.log(test);
    console.log(this.pixi.p);
    let width_1=JSON.parse(window.sessionStorage.getItem('initData')).capacity_x;//货架实际长度
    let height_1=JSON.parse(window.sessionStorage.getItem('initData')).capacity_y;//货架实际宽度
    let avg1=JSON.parse(window.sessionStorage.getItem('initData')).avg;//货架实际宽度
    let proportion=1000/width_1;//按照屏幕大小计算比例
    let width_new=proportion*width_1;//屏幕画面像素大小
    let height_new=proportion*height_1;
    this.app = new PIXI.Application({
            width: width_new ,
            height: height_new ,
            backgroundColor: "#fdfdea",
            transparent:false,
            resolution: 1,
            //forceCanvas: true,
            });
            //app.renderer.backgroundColor = 0xcccccc;
            //将应用画布添加到dom中
            this.$refs.page_canvas.appendChild(this.app.view);
            //document.body.appendChild(app.view);
            
            let start2=this.createhouse(proportion,test);
            console.log(start2);
            
            var place_start=[];
            var place_end=[];
            place_start[0]=start2[0];
            place_start[1]=start2[1];
            place_end[0]=start2[2];
            place_end[1]=start2[3];
            
            const ball = PIXI.Texture.from("ball.png");
            //for(let j=0;j<this.pixi.avg;j++){
            const sprite1 = new PIXI.Sprite(ball);//创建精灵，可能需要20个

            const sprite11 = new PIXI.Sprite(ball);
           
            
            this.setsprite_start(place_start,sprite1);
            this.setsprite_end(place_end,sprite11);
           

    },  

    methods: {
      //画入口假小车
      setsprite_start(place,spr){       
        spr.anchor.set(0.5,0.5);
        spr.scale.set(0.08,0.08)
        spr.x=place[0]+10;
        spr.y=place[1]+10;
        this.app.stage.addChild(spr);
      },
     //画出口假小车
      setsprite_end(place,spr){
        spr.anchor.set(0.5,0.5);
        spr.scale.set(0.08,0.08)
        spr.x=place[0]+10;
        spr.y=place[1]+10;
        this.app.stage.addChild(spr);
      },
      //画行动的小车
      setsprite(spr,avgplace1){
        let avgplace=avgplace1;
        console.log("yes?");
        spr.anchor.set(0.5,0.5);
        spr.scale.set(0.08,0.08)
        spr.x=avgplace[0]*4;
        spr.y=avgplace[1]*4;
        spr.vx = 0;
        spr.vy = 0;
        this.app.stage.addChild(spr);

      },
      create(){

      },
      //画所有的货架
      createhouse(proportion1,test1){
        console.log("ok");
        var start=[];
        console.log("yes");
        for(let i=0;i<test1.length;i++){
              for(let j=0;j<test1[i].length;j++){
                switch(test1[i][j][0]){
                  case 0:{
                    this.createroad("#fdfdea",j,i,proportion1);
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
                    start[1]=i*10*proportion1;
                    // const ren = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
                    // ren.beginFill("#1b315e");//填充颜色
                    // ren.drawRect(j*10*proportion1,i*10*proportion1+5,5*proportion1,30*proportion1);//绘制矩形
                    // ren.endFill();//结束填充
                    // this.app.stage.addChild(ren);//将矩形添加到舞台
                    break;
                  }
                  case -2:{
                    start[2]=j*10*proportion1;
                    start[3]=i*10*proportion1;
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
            if(start[0]==0){
            const ren = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
            ren.beginFill("#1b315e");//填充颜色
            ren.drawRect(start[0],start[1],2*proportion1,30*proportion1);//绘制矩形
            ren.endFill();//结束填充
            this.app.stage.addChild(ren);//将矩形添加到舞台
            }
            // if(start[1]==0){
            // const ren = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
            // ren.beginFill("#1b315e");//填充颜色
            // ren.drawRect(start[0],start[1],30*proportion1,2*proportion1);//绘制矩形
            // ren.endFill();//结束填充
            // this.app.stage.addChild(ren);//将矩形添加到舞台
            // }
            
            if(start[3]==0){
              const ren1 = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
              ren1.beginFill("#1b315e");//填充颜色
              ren1.drawRect(start[2],start[3],2*proportion1,30*proportion1);//绘制矩形
              ren1.endFill();//结束填充
              this.app.stage.addChild(ren1);//将矩形添加到舞台
            }
            // if(start[3]==0){
            //   const ren1 = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
            //   ren1.beginFill("#1b315e");//填充颜色
            //   ren1.drawRect(start[2],start[3],30*proportion1,2*proportion1);//绘制矩形
            //   ren1.endFill();//结束填充
            //   this.app.stage.addChild(ren1);//将矩形添加到舞台
            // }
            return start;

      },
      //画每个货架
      createroad(str,x,y,proportion2){
        const ren = new PIXI.Graphics();//为了让小车在其上行进，需要先画图
                    ren.beginFill(str);//填充颜色
                    ren.drawRect(x*10*proportion2,y*10*proportion2,10*proportion2,10*proportion2);//绘制矩形
                    ren.endFill();//结束填充
                    this.app.stage.addChild(ren);//将矩形添加到舞台
      },
      //仓库入库动画
      createStickerCanvas(sprite2,arr1){
          
           var sprite=sprite2;
           let arr=arr1;
          //  for(let i=0;i<arr.length;i++){
          //     for(let j=0;j<arr[i].length;j++){
          //       arr[i][j]=arr[i][j]*4
          //     }
          //  }
           console.log(arr); 
                 this.app.ticker.add (function(){
                sprite.rotation += 0.2;
                
                for(let i=0;i<arr.length;i++){
                   if(sprite.x==(arr[i][0])&&sprite.y!=(arr[i][1])){
                        sprite.y += 2;
                    }
                    else if(sprite.x!=(arr[i][0])&&sprite.y==(arr[i][1])){
                        sprite.x += 2;
                        
                    }
                    else if(sprite.x==(arr[(arr.length-1)][0])&&sprite.y==(arr[(arr.length-1)][1])){
                       sprite.visible=false;
                    }
                    
                }
                
           })
          },
        //仓库出库动画
      createStickerCanvas_2(sprite2,arr){
           console.log(arr); 
           var sprite=sprite2;
           
          
          this.app.ticker.add (function(){
         sprite.rotation -= 0.2;
         
         for(let i=0;i<arr.length;i++){
            if(sprite.x==(arr[i][0])&&sprite.y!=(arr[i][1])){
                 sprite.y -= 2;
             }
             else if(sprite.x!=(arr[i][0])&&sprite.y==(arr[i][1])){
                 sprite.x -= 2;
                 
             }
             else if(sprite.x==(arr[(arr.length-1)][0])&&sprite.y==(arr[(arr.length-1)][1])){
                sprite.visible=false;
             }
             
         }
         
    })
          },      
      //入库avg动画
        //入库
      avgPlace(formName) {
        // let test = JSON.parse(window.sessionStorage.getItem('depository')).depository
        // console.log(test[0][0][0])
        const _this =this;
        // console.log(_this.pixi.avgList);
        // let avglist=_this.pixi.avgList;
        // let bili_p=_this.pixi.p;
        // console.log(bili_p);
        // this.avgrun_in(avglist,bili_p);//这个就是入库按钮触发的小车的动画
             

      //  表单验证-加载-发送请求(传输数据)-得到后端数据-关闭加载-触发动画
       this.$refs[formName].validate((valid) => {
        if (valid) {
          let temp = {
            parcelInList:[],
            token:''
          }
          for (let i = 0; i<_this.InData.parcelInList.length;i++){
            if (_this.InData.parcelInList[i].id!='' && _this.InData.parcelInList[i].place!=''){
              temp.parcelInList.push(_this.InData.parcelInList[i])
            }
          }
          console.log(temp.parcelInList.length)
          if (temp.parcelInList.length>0){
          this.loading = true//要在动画之前关闭
          console.log(temp.parcelInList[0].place)//
          temp.token = JSON.parse(window.sessionStorage.getItem("Token")).token
          other.enterStock(temp).then(res=>{
          console.log(res)
            if(res) {//加入动画的位置
              //
              
              // setTimeout(() => {
              //   for (let i = 0; i<res.data.avgPlace.parcelList.length; i++){
              //   if(res.data.avgPlace.parcelList[i].status==true) {//可以入库
              //   //提示用户该包裹可以正在入库中,保存路线以及存放位置，启动动画
              //   //动画avg运动到指定位置后提示用户，该包裹入库完成，位置为XXX
              //   }else {
              //     //提示用户该包裹不可入库
              //   }
              // }
              // },500)
              this.$message({
                message: '',
                type: 'success'
              })
            }
          }).finally(res=>{
            this.loading = false
          })
          } else {
                this.$message({
                message: '包裹信息输入不可为空',
                type: 'error'
              })
          }
        }
       })
       

      },
      //出库
      avgFetch(formName) {
        const _this =this;
        console.log(_this.pixi.avgList2);
        let avglist=_this.pixi.avgList2;
        let bili_p=_this.pixi.p;
        console.log(bili_p);
        this.avgrun_out(avglist,bili_p);//这个就是入库按钮触发的小车的动画
       //表单验证-加载-发送请求(传输数据)-得到后端数据-关闭加载-触发动画
       this.$refs[formName].validate((valid) => {
        if (valid) {
          let temp = {
            parcelOutList:[],
            token:''
          }
          for (let i = 0; i<_this.OutData.parcelOutList.length;i++){
            if (_this.OutData.parcelOutList[i].id!='' && _this.OutData.parcelOutList[i].place!=''){
              temp.parcelOutList.push(_this.OutData.parcelOutList[i])
            }
          }
          if (temp.parcelOutList.length>0){
            this.loading = true//要在动画之前关闭
            temp.token = JSON.parse(window.sessionStorage.getItem("Token")).token
            console.log(temp.parcelOutList.length)
            other.outStock(temp).then(res=>{
            console.log(res)
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
                  message: '',
                  type: 'success'
                })
              }
            }).finally(res=>{
              this.loading = false
            })
          } else {
                this.$message({
                message: '包裹信息输入不可为空',
                type: 'error'
              })
          }
        }
       })
      },
      //切换
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //入库小车按数量触发
      avgrun_in(avglist,p){
        //var bili=this.pixi.
        const ball = PIXI.Texture.from("ball.png");
            //for(let j=0;j<this.pixi.avg;j++){
            const sprite1 = new PIXI.Sprite(ball);//创建精灵，可能需要5个
            const sprite2 = new PIXI.Sprite(ball);
            const sprite3 = new PIXI.Sprite(ball);
            const sprite4 = new PIXI.Sprite(ball);
            const sprite5 = new PIXI.Sprite(ball);
            switch(avglist.length){
                  case 5:{
                    this.setsprite(sprite5,avglist[4].route[0]);
                    createStickerCanvas(sprite5,avglist[4].route[0]);
                    
                  }
                  case 4:{
                    this.setsprite(sprite4,avglist[3].route[0]);
                    this.createStickerCanvas(sprite4,avglist[2].route);
                  }
                  case 3:{
                    this.setsprite(sprite3,avglist[2].route[0]);
                    this.createStickerCanvas(sprite3,avglist[2].route);
                  }
                  case 2:{
                  
                    this.setsprite(sprite2,avglist[1].route[0]);
                    //console.log(avglist_avg2[0]);
                    this.createStickerCanvas(sprite2,avglist[1].route);
                  }
                  case 1:{
                    
                    this.setsprite(sprite1,avglist[0].route[0]);
                    console.log(avglist[0].route);
                    this.createStickerCanvas(sprite1,avglist[0].route);
                  
                  }
                  
            }
      },
      //出库小车按数量触发
      avgrun_out(avglist,p){
       
        const ball = PIXI.Texture.from("ball.png");
            //for(let j=0;j<this.pixi.avg;j++){
            const sprite1 = new PIXI.Sprite(ball);//创建精灵，可能需要5个
            const sprite2 = new PIXI.Sprite(ball);
            const sprite3 = new PIXI.Sprite(ball);
            const sprite4 = new PIXI.Sprite(ball);
            const sprite5 = new PIXI.Sprite(ball);
            switch(avglist.length){
                  case 5:{
                    this.setsprite(sprite5,avglist[4].route[0]);
                    createStickerCanvas_2(sprite5,avglist[4].route[0]);
                    
                  }
                  case 4:{
                    this.setsprite(sprite4,avglist[3].route[0]);
                    this.createStickerCanvas_2(sprite4,avglist[2].route);
                  }
                  case 3:{
                    this.setsprite(sprite3,avglist[2].route[0]);
                    this.createStickerCanvas_2(sprite3,avglist[2].route);
                  }
                  case 2:{
                    this.setsprite(sprite2,avglist[1].route[0]);
                    console.log(avglist[1].route);
                    this.createStickerCanvas_2(sprite2,avglist[1].route);
                  }
                  case 1:{
                    this.setsprite(sprite1,avglist[0].route[0]);
                    console.log(avglist[0].route);
                    this.createStickerCanvas_2(sprite1,avglist[0].route);
                  
                  }
                  
            }
      }
    }
    }
  
</script>

<style lang="less" scoped>

  .can {
    border: #101a28;
    font:#8ede38
  }
</style>
      
    

</script>

<style lang="less" scoped>
#stock{
    border: 1px solid rgb(190, 206, 50);
    
}
  .el-carousel__item:nth-child(2n) {
     background-color: #fdfdea;
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


