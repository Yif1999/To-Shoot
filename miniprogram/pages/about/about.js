// pages/about/about.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	handleReward(e){
		wx.navigateTo({
			url: '/pages/reward/reward',
		})
	}
})