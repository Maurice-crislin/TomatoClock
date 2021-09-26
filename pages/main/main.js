// pages/uiTest/test.js
const util = require('../../utils/util.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {


        timer: 25, //显示用的
        gapTime: 25 * 60, //25分钟 计算用的
        restTime: 5 * 60, //计算用的

        width: wx.getSystemInfoSync().windowWidth / 2,
        height: 120,
        staticCircleColor: '#87CEFF',
        changeCircleColor: "green",
        pauseBtnTxt: "pause",
        ableStart: true,
        isRunning: false


    },


    drawCricle(ctx, rad, color, width, height) {
        ctx.save(); // 保存当前环境的状态
        ctx.strokeStyle = color; //设置描边样式 
        ctx.lineWidth = 8; //设置线宽
        ctx.beginPath(); //路径开始 // False = 顺时针，true = 逆时针
        ctx.arc(width, height, 80, 0, rad, false); //逆时针,用于绘制圆弧ctx.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        ctx.stroke(); // 绘制
        ctx.closePath(); // 路径结束
        ctx.restore(); // 返回之前保存过的路径状态和属性            
    },
    drawText(string, ctx, width, height) {
        ctx.save();
        ctx.strokeStyle = "#00CED1"; //设置描边样式
        ctx.font = "40px Arial"; //设置字体大小和字体
        ctx.textBaseline = "top";
        ctx.textBaseline = "top";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        //绘制字体，并且指定位置//console.log('文字', n.toFixed(0));
        ctx.strokeText(string, width, height);
        ctx.stroke(); //执行绘制
        ctx.restore();

    },
    getTimerAndSetData: function() {
        try {
            const res = wx.getStorageSync("Timer");
            this.setData({ timer: res, gapTime: res * 60 })

            console.log("sync get data successfully,the data is '" + res + "'");
        } catch (e) {
            console.log("sync get data failed");
        }

        try {
            const res = wx.getStorageSync("PauseTime");
            this.setData({ restTime: res * 60 })
            console.log(this.data.restTime)
            console.log("sync get data successfully,the data is '" + res + "'");
        } catch (e) {
            console.log("sync get data failed");
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getTimerAndSetData();

        var ctx = wx.createCanvasContext('myCanvas', this); //1.创建carvas实例对象，方便后续使用。
        this.drawText("0:00", ctx, this.data.width, this.data.height);
        this.drawCricle(ctx, Math.PI * 2, this.data.staticCircleColor, this.data.width, this.data.height);
        ctx.draw() //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。

    },
    pauseBtnClick: function() {

        if (app.globalData.shouldPause) {
            app.globalData.shouldPause = false;
            this.setData({ pauseBtnTxt: "pause", isRunning: true });
        } else {
            app.globalData.shouldPause = true;
            this.setData({ pauseBtnTxt: "restart", isRunning: false });
        }

    },
    timeBtnClick: function() {
        if (!this.data.ableStart) return;

        this.setData({ ableStart: false, isRunning: true }); //app.globalData.NumberCountPerDay = [2, 2, 2, 80, 2]
        this.musicPlay();
        var ctx = wx.createCanvasContext('myCanvas', this); //1.创建carvas实例对象，方便后续使用。
        this.data.oldTime = Date.now();
        let passedTime = 0;
        //let restedTime = 0;
        var interval = setInterval(show.bind(this), 1000);

        function show() {
            // if (restedTime >= 5) {
            //     this.finish(interval);
            // }
            if (app.globalData.shouldPause) {
                //restedTime += 1;
                return;
            }
            passedTime += 1;
            let mins = Math.floor(passedTime / 60)
            let sec = Math.floor(passedTime - mins * 60)
            let timeStr = '';
            sec < 10 ? timeStr = mins + ':' + '0' + sec : timeStr = mins + ':' + sec;
            this.drawText(timeStr, ctx, this.data.width, this.data.height)
            let rad = (passedTime / this.data.gapTime) * Math.PI * 2;
            console.log(rad);
            this.drawCricle(ctx, rad, this.data.changeCircleColor, this.data.width, this.data.height);
            ctx.draw();
            if (passedTime == this.data.gapTime) {
                this.finish(interval);
            }


        }




    },
    finish(interval) {
        this.setData({ ableStart: true, isRunning: false });

        clearInterval(interval)

    },

    musicPlay: function() {
        const innerAudioContext = wx.createInnerAudioContext()
        innerAudioContext.autoplay = true // 是否自动开始播放，默认为 false
        innerAudioContext.loop = false // 是否循环播放，默认为 false
        wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
            obeyMuteSwitch: false, // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
            success: function(e) {
                console.log("成功了");
                console.log(e);
            },
            fail: function(e) {
                console.log("失败了");
                console.log(e);
            }
        })
        innerAudioContext.src = "../../music/battle.mp3"; // 音频资源的地址
        innerAudioContext.onPlay(() => { // 监听音频播放事件
            console.log('开始播放')
        })
        innerAudioContext.onError((res) => { // 监听音频播放错误事件
            console.log(res.errMsg)
            console.log(res.errCode)
        })


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {


    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getTimerAndSetData();

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

})

// timeBtnClick: function() {
//     app.globalData.NumberCountPerDay = [2, 2, 2, 80, 2]
//     this.musicPlay();
//     var ctx = wx.createCanvasContext('myCanvas', this); //1.创建carvas实例对象，方便后续使用。
//     this.data.oldTime = Date.now();
//     let passedTime = 0;

//     function show() {
//         if (app.globalData.shouldPause) return;



//         //passedTime = Date.now() - this.data.oldTime; //毫秒
//         passedTime += 1 * 1000 * 60;
//         let mins = Math.floor(passedTime / (1000 * 60))
//         let sec = Math.floor((passedTime - mins * 60 * 1000) / 1000)
//         let timeStr = '';
//         sec < 10 ? timeStr = mins + ':' + '0' + sec : timeStr = mins + ':' + sec;



//         this.drawText(timeStr, ctx, this.data.width, this.data.height)
//         let rad = ((passedTime / this.data.gapTime) - 1) * Math.PI * 2
//         this.drawCricle(ctx, rad, this.data.changeCircleColor, this.data.width, this.data.height)
//         ctx.draw()
//         if (mins == this.data.gapTime / (60 * 1000) || sec == 60) {
//             this.setData({ passedTime: 0 });
//             clearInterval(interval)
//         }

//     }
//     var interval = setInterval(show.bind(this), 1000);

// },