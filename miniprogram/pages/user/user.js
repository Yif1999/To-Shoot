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

	async getUserInfo(e){
		const {userInfo}=e.detail;
		this.setData({userInfo})
		wx.setStorageSync("userinfo", userInfo);
		let openID=await wx.cloud.callFunction({
			name:'getOpenID',
		})
		openID=openID.result.openId
		console.log(openID);
		
		
	},

	toUserInfo(){
		wx.navigateTo({
			url: '/pages/user_info/user_info',
		})
	}

})