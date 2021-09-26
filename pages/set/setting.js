// pages/setting/setting.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        timer: 25,
        pauseTime: 5


    },
    setTimer: function(_timer) {
        const keyStr = "Timer";
        wx.setStorage({
            key: keyStr,
            data: _timer,
            success: function() {
                console.log("store data successfully");
            },
            fail: function() {
                console.log("store data failed")
            }
        })

    },
    setPauseTime: function(_timer) {
        const keyStr = "PauseTime";
        wx.setStorage({
            key: keyStr,
            data: _timer,
            success: function() {
                console.log("store data successfully")
                console.log()
            },
            fail: function() {
                console.log("store data failed")
            }
        })
    },
    getLocalStorage: function() {
        try {
            const timer = wx.getStorageSync("Timer");
            const pausetime = wx.getStorageSync("PauseTime");
            console.log("sync get data successfully");
            this.setData({
                timer: timer,
                pauseTime: pausetime
            })
        } catch (e) {
            console.log("sync get data failed");
        }

    },

    changeTimer: function(e) {
        this.setData({ timer: e.detail.value });

        this.setTimer(this.data.timer)
    },
    changePauseTime: function(e) {
        this.setData({ pauseTime: e.detail.value });

        this.setPauseTime(this.data.pauseTime)
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getLocalStorage();

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

    }
})