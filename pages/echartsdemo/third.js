// pages/echartsdemo/third.js
import * as echarts from '../../libs/ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    var dataX = ['18~30岁', '31~40岁', '41~50岁', '51~60岁', '61~70岁'];
    var dataY = ['200', '102', '422', '189', '12'];
    var dataZ = [500, 500, 500, 500, 500];
    var option = {
        title: {
            text: '折线图标题',
            link: 'https://blog.csdn.net/gray_key',
            target: 'blank',
            left: '5%',
            textStyle: {
                color: 'black',
                fontSize: 15,
                bottom: 20
            }
        },
        grid: {
            left: 40,
            right: 40,
            top: 30,
            bottom: 25,
        },
        backgroundColor: '#F5F5F5', // 背景颜色
        tooltip: {
            trigger: 'item',
            formatter: "{a}<br/>{b} : {c}人"
        },
        xAxis: {
            type: 'category',
            position: 'bottom',
            // 等同于 axisLine: true    开始
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            // 等同于 axisLine: true    结束
            axisLabel: { //横轴上的字
                color: 'black',
                fontSize: 12
            },
            data: dataX,
        },
        yAxis: {
            splitNumber: 5, // 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。在类目轴中无效。
            // 等同于 axisLine: true    开始
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            // 等同于 axisLine: true    结束
            splitLine: {//横辅助线
                show: true,
                lineStyle: {
                    color: 'black',
                    opacity: 0.2
                }
            },
            axisLabel: { //纵轴上的字
                color: 'black',
                fontSize: 12
            }
        },
        series: [{
            name: '各年龄段人数',
            type: 'line',
            data: dataY,
            smooth: true,
            symbol: 'emptyCircle',
            symbolSize: 5,
            itemStyle: {
                normal: {
                    color: '#fff'
                }
            },
            lineStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(255,0,0,0.8)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(0,0,238,0.8)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    width: 3
                }
            },
            areaStyle: {
                normal: {
                    color: "rgba(51,255,255,0.3)",
                }
            },
            markLine: { // 图表标线。
                silent: false, // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                symbol: ["", "arrow"], // 标线两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定，具体格式见 data.symbol。
                // 标线的数据数组。每个数组项可以是一个两个值的数组，分别表示线的起点和终点，每一项是一个对象，有下面几种方式指定起点或终点的位置。
                data: [{ // 直接用 type 属性标注系列中的最大值，最小值。这时候可以使用 valueIndex 或者 valueDim 指定是在哪个维度上的最大值、最小值、平均值。 
                    name: '平均数',
                    type: 'average' // 支持 'average', 'min', 'max'
                }],
                precision: 0, // 标线数值的精度，在显示平均值线的时候有用。
                label: { // 标线的文本。
                    normal: {
                        formatter: '平均数:\n{c}人'
                    }
                },
                lineStyle: { // 标线的样式  
                    normal: {
                        color: '#fff',
                    }
                }
            }
        }, {
            name: '占位背景',
            type: 'bar',
            itemStyle: {
                normal: {
                    show: true,
                    color: '#fff', //#fff
                    opacity: 0
                }
            },
            silent: true, // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
            barWidth: '50%', // 柱条宽度
            data: dataZ, // 占位背景在y轴上的值(高度)
            animation: false // 是否开启动画
        }, {
            name: '占位背景',
            type: 'bar',
            itemStyle: {
                normal: {
                    show: true,
                    color: '#fff',
                    opacity: 0.1
                }
            },
            silent: true,
            barWidth: '50%',
            barGap: 0, // 柱间距离
            data: dataZ,
            animation: false
        }],
    };



    chart.setOption(option);
    return chart;
}

Page({
    data: {
        ec: {
            onInit: initChart
        }
    },

    onReady() {}
});