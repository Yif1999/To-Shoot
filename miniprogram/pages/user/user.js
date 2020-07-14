Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:null
	},

	onShow: function () {
		this.getTabBar().init();
		const userInfo=wx.getStorageSync('userinfo')
		this.setData({userInfo})
	},

	toAbout(){
		wx.navigateTo({
			url: '/pages/about/about',
		})
	},

	handleLogin(){
		this.setData({show:true})
	},

	onClose() {
    this.setData({ show: false });
  },

	getUserInfo(e){
		console.log(e);
		const {userInfo}=e.detail;
		this.setData({userInfo})
		wx.setStorageSync("userinfo", userInfo);
	},

	toUserInfo(){
		wx.navigateTo({
			url: '/pages/user_info/user_info',
		})
	}

})