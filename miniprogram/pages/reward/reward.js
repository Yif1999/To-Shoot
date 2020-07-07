// pages/reward/reward.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	handleWeChat(e){
		console.log("红包来了！");
		wx.previewImage({
			urls: ["cloud://develop-hou76.6465-develop-hou76-1302550815/images/WeChat.png"],
		})
	},

	handleAliPay(e){
		console.log("红包来了！");
		wx.previewImage({
			urls: ["cloud://develop-hou76.6465-develop-hou76-1302550815/images/AliPay.png"],
		})
	}

})