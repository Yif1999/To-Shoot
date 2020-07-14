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
		const {userInfo}=e.detail;
		this.setData({userInfo})
		wx.setStorageSync("userinfo", userInfo);
		wx.login({
			success (res) {
				if (res.code) {
						wx.request({  
							//获取openid接口  
						url: 'https://api.weixin.qq.com/sns/jscode2session',  
						data:{  
							appid:'wxb36513df41963ea5',  
							secret:'363709021e808c6338d66b523fc6018a',  
							js_code:res.code,  
							grant_type:'authorization_code'  
						},  
						method:'GET',  
						success:function(res){  
							wx.setStorage({
								data: {
									OPEN_ID:res.data.openid,
									SESSION_KEY:res.data.session_key
								},
								key: 'ID',
							})
						}  
					}) 
				} else {
					console.log('登录失败！' + res.errMsg)
				}
			}
		})
	},

	toUserInfo(){
		wx.navigateTo({
			url: '/pages/user_info/user_info',
		})
	}

})