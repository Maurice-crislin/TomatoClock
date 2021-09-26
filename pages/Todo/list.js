// pages/Todo/list.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 数据源

        inputText: "",
        todolists: []


    },

    //回到顶部
    goTop: function(e) { // 一键回到顶部

        wx.pageScrollTo({
            scrollTop: 0,
        })
    },
    delList: function(index) {
        var lists = this.data.todolists;
        lists.splice(index, 1); //实质是删除lists数组内容，使for循环少一次
        this.setData({
            todolists: lists,
        })
        this.todolistSetToStorage();
    },
    callBackInput: function(e) {
        this.setData({ inputText: e.detail.value })
    },
    callBacksubmit: function() {
        let dataStr="";
        let toolDate=new Date();
        dataStr+=toolDate.getFullYear()+"."+toolDate.getMonth()+"."+toolDate.getDate()+ " "+toolDate.getHours()+":"+toolDate.getMinutes()+":"+toolDate.getSeconds();
        var lists = this.data.todolists;
        var newData = {
            goal: this.data.inputText,
            plannedTime: dataStr //获取完整的年份(4位,1970-????)
        };
        lists.push(newData); //实质是添加lists数组内容，使for循环多一次
        this.setData({
            todolists: lists,
        })
        this.setData({ inputText: "" })
        this.todolistSetToStorage();

    },

    onBtnClick: function(evt) {
        this.delList(evt.target.id);

    },
    todolistSetToStorage: function() {
        wx.setStorage({
            key: "Todolists",
            data: this.data.todolists,
            success: function() {
                console.log("lists存好了");
            },
            fail: function() {
                console.log("store data failed")
            }
        })

    },

    getTodoListsAndSet: function() {
        try {
            const lists = wx.getStorageSync("Todolists");
            console.log(lists + "初始化从缓存读取")

            console.log("sync get data successfully");
            this.setData({
                todolists: lists,

            })
        } catch (e) {
            console.log("sync get data failed");
        }


    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.getTodoListsAndSet()


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