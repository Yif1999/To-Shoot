var util = require('../../utils/util.js');
// pages/super_resolution/super_resolution.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgURL:null
	},

	chooseImg: function(callBack) {
		var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function(res) {
				that.setData({
					imgURL:res.tempFilePaths[0]
				})
      }
		})
		
	},
	
	handleClick(){
		// let {imgURL}=this.data;
	
		// let cloudPath="super_resolution/"+util.genUUID()+imgURL.match(/\.[^.]+?$/)[0];	
		// wx.cloud.uploadFile({
		// 	cloudPath:cloudPath,
		// 	filePath:imgURL,
		// 	success:res=>{
		// 		console.log(res)
		// 		wx.cloud.callFunction({
		// 			name:'super_resolution'
		// 		}).then(console.log);
				
		// 	}
		// })
		wx.cloud.callFunction({
			name:'super_resolution'
		}).then(console.log);
	}
})