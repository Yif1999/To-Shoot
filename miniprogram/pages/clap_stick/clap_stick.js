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
				this.setData({
					pro_t:userInput[0],
					rol_t:userInput[1],
					sce_t:userInput[2],
					sho_t:userInput[3],
					tak_t:userInput[4],
					dir_t:userInput[5],
					cam_t:userInput[6]
				})
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
		// console.log(e);		
		const value = e.detail.value
		if (value) {
			const {index}=e.target.dataset;
			const userInput=wx.getStorageSync('userInput');			
			userInput[index]=value;
			console.log(userInput);
			wx.setStorageSync('userInput', userInput);
			switch (index) {
				case 0:
					this.setData({pro_t:value})
					break;
				case 1:
					this.setData({rol_t:value})
					break;
				case 2:
					this.setData({sce_t:value})
					break;
				case 3:
					this.setData({sho_t:value})
					break;
				case 4:
					this.setData({tak_t:value})
					break;
				case 5:
					this.setData({dir_t:value})
					break;
				case 6:
					this.setData({cam_t:value})
					break;
				default:
					break;
			}
		} 
	},

	handleTap(e){
		// console.log(e);
		const {index}=e.target.dataset;
		switch (index) {
			case 0:
				this.setData({pro_f:1});
				console.log('focus');		
				break;
			case 1:
				this.setData({rol_f:1})
				break;
			case 2:
				this.setData({sce_f:1})
				break;
			case 3:
				this.setData({sho_f:1})
				break;
			case 4:
				this.setData({tak_f:1})
				break;
			case 5:
				this.setData({dir_f:1})
				break;
			case 6:
				this.setData({cam_f:1})
				break;
			default:
				break;
		}	
	},

	handleBlur(e){
		// console.log(e);
		const {index}=e.target.dataset;
		switch (index) {
			case 0:
				this.setData({pro_f:0});
				console.log('unfocus');
				break;
			case 1:
				this.setData({rol_f:0})
				break;
			case 2:
				this.setData({sce_f:0})
				break;
			case 3:
				this.setData({sho_f:0})
				break;
			case 4:
				this.setData({tak_f:0})
				break;
			case 5:
				this.setData({dir_f:0})
				break;
			case 6:
				this.setData({cam_f:0})
				break;
			default:
				break;
		}	
	}
})