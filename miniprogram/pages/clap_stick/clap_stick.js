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
		clapActive:false,
		countdown:3,
		mask:false,
		show:false,
		actionTime:null,	
		inputText:[],
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
		const self = this
		let userInput = wx.getStorageSync('userInput')
		if (userInput) {
				self.data.inputText = userInput
				self.setData(self.data)
		}else{
			wx.setStorageSync('userInput', [])
		}
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
		let that=this
		const clapAudio = wx.createInnerAudioContext();
		clapAudio.src = "audios/clap_stick.wav";
		if (!that.data.mask){
			that.setData({
			countdown:3,
			clapActive:true,
			mask:true
		})
		let countdown=4;
		time(3);
		function time() {
			if (countdown>1) {
					countdown--;
					that.setData({
						countdown
					})
					setTimeout(time, 1000);
			} else {
				that.setData({
					actionTime:that.data.time.substring(11,19),
					clapActive:false,
					show:true
				})
				clapAudio.play();
				setTimeout(()=>{
				that.setData({
					show:false,
					mask:false
				})
				},4000)			
				return;
			}
		}
		}	
	},

	handleInput(e){
		console.log(e);
		
		const value = e.detail.value
		if (value) {
			const {index}=e.target.dataset;
			const userInput=wx.getStorageSync('userInput');			
			userInput[index]=value;
			console.log(userInput);
			wx.setStorageSync('userInput', userInput)
		} 
	}
})