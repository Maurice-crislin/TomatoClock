// app.js
App({
    globalData: {
        NumberCountPerDay: [1,19, 4, 2, 8], //只有五天
        shouldPause:false,


    },
    onLaunch() {

        this.batchInitialization();
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    Initialization: function(key, value) {
        //"Timer" 25 "Todolists" [{
        //goal: "买水果",
        // plannedTime: "2021.06.18 13:14"
        //}]
        //"PauseTime" 5
        try {
            const data = wx.getStorageSync(key);
            if (!data) {
                wx.setStorage({
                    key: key,
                    data: value,
                    success: function() {
                        console.log("store data successfully");
                    },
                    fail: function() {
                        console.log("store data failed")
                    }
                })

            }
        } catch (e) {
            console.log("sync get data failed");
        }

    },
    batchInitialization: function() {

        this.Initialization("Timer", 25)
        this.Initialization("PauseTime", 5)
        this.Initialization("Todolists", [{
            goal: "示例：买水果",
            plannedTime: "2021.06.18 13:14：520"
        }])


    }

})

//     todolists: [{
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买水果",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买水果",
//         plannedTime: "2021.06.18 13:14"
//     }, {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买电池",
//         plannedTime: "2021.06.18 13:14"
//     },
//     {
//         goal: "买水果",
//         plannedTime: "2021.06.18 13:14"
//     },
// ]