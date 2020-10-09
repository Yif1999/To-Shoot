// pages/user/user.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let isShow=wx.getStorageSync('showUpdateInfo')
		console.log(isShow);
		
		if (isShow){
			wx.cloud.downloadFile({
				fileID: 'cloud://develop-hou76.6465-develop-hou76-1302550815/update_info.json'
			}).then(res => {
				console.log(res.tempFilePath);				
				let result = wx.getFileSystemManager().readFileSync(res.tempFilePath,"utf-8");
				let update_info= JSON.parse(result).update_info;
				this.setData({show:true});
				this.setData({update_info});
				console.log(this.data.update_info[0].info);
				
			})
		}		
		
	},

  handleClose(){
		wx.setStorageSync('showUpdateInfo', false)
	}
})