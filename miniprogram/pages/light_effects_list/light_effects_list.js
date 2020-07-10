// pages/light_effects_list/light_effects_list.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
	},

	showLightEffects(e){

		const {id}=e.currentTarget.dataset;
		wx.navigateTo({
			url: "/pages/light_effects/light_effects?id="+id,
		})
		
	}
	
})