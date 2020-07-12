var util = require('../../utils/timer.js');
// pages/clap_stick/clap_stick.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    height:0,
		width:0,
		timer:null,
		clapActive:false
	},

	onShow(){
		wx.getSystemInfo({
      success: (result) => {
        this.setData({
          height:result.screenHeight,
          width:result.screenWidth,
        })
      },
		})
		console.log(this.data);
		var time =null;
		time	= util.formatTime(new Date());
		this.setData({
			time: time
		});	
		this.data.timer=setInterval(() => {
			time	= util.formatTime(new Date());
			this.setData({
				time: time
			});			
		}, 1000);
	},
	
  onUnload(){
		clearInterval(this.data.timer);
  },

	handleBack(){
		wx.navigateBack({
			delta: 0,
		})
	},

	handleClap(){

	}
})