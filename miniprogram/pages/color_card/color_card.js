// pages/color_card/color_card.js
Page({
	data:{

		active: 0,
	},
	
	handleBack(){
		wx.navigateBack({
			delta: 0,
		})
	}
})