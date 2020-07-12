// pages/user/user.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	onShow: function () {
		this.getTabBar().init();
	},

	toAbout(){
		wx.navigateTo({
			url: '/pages/about/about',
		})
	}

})