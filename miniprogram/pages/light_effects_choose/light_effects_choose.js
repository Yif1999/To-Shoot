// pages/light_effects_choose/light_effects_choose.js
Page({

	data: {

  },
	
	handleOne(){
		wx.navigateTo({
			url: '/pages/screen_light/screen_light',
		})
	},
	handleTwo(){
		wx.navigateTo({
			url: '/pages/light_effects_list/light_effects_list',
		})
	}
})