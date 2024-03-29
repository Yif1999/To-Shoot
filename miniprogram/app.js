//app.js
App({

  onLaunch: function () {
    let that=this;
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）

        env:'release-y6fc5',
        traceUser: true,
      })
    }

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.setStorageSync('showUpdateInfo', true)
      updateManager.applyUpdate();
    })

    updateManager.onUpdateFailed(function () {
    // 新版本下载失败
    })
  }
})
