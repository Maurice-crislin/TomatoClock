// pages/echartsdemo/fourth.js
import * as echarts from '../../libs/ec-canvas/echarts';
const app = getApp();
//设定EChart报表的状态
function setOption(chart, color_arr, series_data) {
    var option = {
        backgroundColor: "#ffffff",
        color: color_arr,
        series: [{
            label: {
                normal: {
                    fontSize: 14
                }
            },
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['40%', '60%'],
            data: series_data
        }]
    };
    chart.setOption(option);
}

Page({
    data: {
        ec: {
            // onInit: initChart
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
        // 调用后端数据
        // wx.request({
        //   url: `https://xxx.com/`,
        //   data: {
        //     id: '123'
        //   },
        //   method: 'GET',
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded'
        //   },
        //   success: function (res) {
        // console.log(res)

        // 这里开始我们假设已经从后端拿到了数据
        let color_arr = ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"];
        let series_data = [{
            value: 55,
            name: '北京'
        }, {
            value: 20,
            name: '武汉'
        }, {
            value: 10,
            name: '杭州'
        }, {
            value: 20,
            name: '广州'
        }, {
            value: 38,
            name: '上海'
        }];
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
            setOption(chart, color_arr, series_data);
            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return chart;
        });

        //   }
        // })


    }
});