 // pages/echartsdemo/second.js
 import * as echarts from '../../libs/ec-canvas/echarts';
 const app = getApp();

 var XArr = ["四天前", "三天前", "前天", "昨天", "今天"]; //"三天前","三天前","三天前",




 //设定EChart报表的状态
 function setOption(chart) {
     var option = {
         //标题
         title: {
             text: '近期番茄钟完成数',
             textStyle: {
                 color: 'black',
                 fontSize: 15,
                 bottom: 20
             }
         },
         color: ['#5b9bd5'], //'#5b9bd5', '#ed7d31' 柱体颜色
         grid: {
             left: 40,
             right: 30,
             top: 50,
             bottom: 70,
         },
         backgroundColor: '#F5F5F5', // 背景颜色

         //提示框组件(提示鼠标放到图形中显示的数据)
         tooltip: {
             show: true,
             trigger: 'axis',
             axisPointer: { // 坐标轴指示器，坐标轴触发有效
                 type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                 fontSize: 8
             }

         },
         //X轴显示的数据
         xAxis: {
             data: XArr,

             boundaryGap: [0, 0.01],
             splitLine: { //网格样式
                 show: true,
                 lineStyle: {
                     color: ['#e7e8ec'], //
                     width: 1,
                     type: 'solid'
                 }
             }

         },
         //Y轴显示的数据
         yAxis: {},
         //series数据
         series: [{
             //图形的名称
             name: '个数',
             //图形的类型      line线形图，bar柱状图，pie扇形图。
             type: 'bar',
             //图形中的数据(很多都是从数据库中查询出来)
             data: app.globalData.NumberCountPerDay
         }]
     };

     chart.setOption(option);
 }



 Page({
     data: {
         ec: {
             // 将 lazyLoad 设为 true 后，需要手动初始化图表
             lazyLoad: true
         }
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {

     },
     /**
      * 生命周期函数--监听页面显示
      */
     onShow: function() {
         this.getAndSetCharts();

     },

     getAndSetCharts: function() {

         // 获取组件
         let ecComponent = this.selectComponent('#mychart-dom-graph');
         ecComponent.init((canvas, width, height, dpr) => {
             // 获取组件的 canvas、width、height 后的回调函数
             // 在这里初始化图表
             const chart = echarts.init(canvas, null, {
                 width: width,
                 height: height,
                 devicePixelRatio: dpr // new
             });
             //调用设定EChart报表状态的函数，并且把从后端拿到的数据传过去
             setOption(chart);
             // 注意这里一定要返回 chart 实例，否则会影响事件处理等
             return chart;
         });

     }
 });