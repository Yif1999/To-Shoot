import Toast from '@vant/weapp/toast/toast';
// pages/light_effects/light_effects.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		color: "rgb(0,0,0)",
		id:0,
		light:null
	},

	onLoad(options){
		var id = options.id;
		console.log(id);
		this.setData({
			id
		})
	},

  onShow(){

    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          statusBarHeight:result.statusBarHeight,
          height:result.screenHeight,
          width:result.screenWidth,
        })
      },
    })
    wx.getScreenBrightness({
      success: (option) => {
        this.setData({
          brightness:option.value,
        })
      },
		})
		wx.setScreenBrightness({
			value: 1,
		})
		// 轻提示
		if (this.data.id==1) {
			Toast('点击屏幕爆炸');
		}
		else if (this.data.id==2){
			Toast('按住屏幕开火');
		}
		else if (this.data.id==3){
			Toast('点击屏幕闪光');
		}
		// 警灯效果
		else if (this.data.id==4){
			let time=60,count=0,lighten=false;
			this.data.light=setInterval(() => {
				if (lighten){
					this.setData({color:"black"})
					lighten=false;
				}
				else{
					count++;
					switch(count%4) {
						case 0:case 1:
							this.setData({color:"blue"})
							break;
						case 2:case 3:
							this.setData({color:"red"})
							break;
					} 
					lighten=true;
					
				}
			}, time);
		}
		// 闪光灯群效果
		else if (this.data.id==5){
			let time=50;
			let lighten=false;
			this.data.light=setInterval(() => {
				if (lighten){
					this.setData({color:"black"});
					lighten=false
				}else{
					this.setData({color:"white"});
					lighten=true				
				}
			}, time);
		}
		// 烛光摇曳
		else if (this.data.id==6){
			let time=100,count=0,lighten=false;
			this.data.light=setInterval(() => {
				if (lighten){
					this.setData({color:"rgb(217, 145, 0)"})
					lighten=false;
				}
				else{
					count++;
					switch(count%4) {
						case 0:
							this.setData({color:"rgb(234, 156, 0)"})
							break;
						case 1:
							this.setData({color:"rgb(255, 182, 35)"})
							break;
						case 2:
							this.setData({color:"rgb(239, 175, 48)"})
							break;
						case 3:
							this.setData({color:"rgb(255, 176, 19)"})
							break;
					} 
					lighten=true;
					
				}
			}, time);
		}
		// 全彩渐变
		else if (this.data.id==7){
			let time=50;
			let h=0;
			this.data.light=setInterval(() => {
					h+=1;
				this.setData({
					color: "hsl("+h+",100%,50%)",
				})				
			}, time);
		}
		// 蓝色渐变
		else if (this.data.id==8){
			let time=100;
			let h=250;
			let lighten=true;
			this.data.light=setInterval(() => {
				if(lighten&&h<320){
					h+=1;
				}
				else{
					h-=1;
					if (h<180){
						lighten=true;
					}else{
						lighten=false;
					}
				}
				this.setData({
					color: "hsl("+h+",100%,50%)",
				})				
			}, time);
		}
		// 红色渐变
		else if (this.data.id==9){
			let time=100;
			let h=360;
			let lighten=true;
			this.data.light=setInterval(() => {
				if(lighten&&h<400){
					h+=1;
				}
				else{
					h-=1;
					if (h<320){
						lighten=true;
					}else{
						lighten=false;
					}
				}
				this.setData({
					color: "hsl("+h+",100%,50%)",
				})				
			}, time);
		}
		
	},
	handleBack(){
		wx.navigateBack({
			delta: 0,
		})
	},

	handleTap(){

		// 爆炸效果
		if (this.data.id==1){
			clearInterval(this.data.light);
			console.log("tap");
			let time=20;
			let l=0;
			let lighten=true;
			this.data.light=setInterval(() => {
				if(lighten&&l<80){
					l+=40;
				}else{
					l-=1;
					lighten=false;
				}
				this.setData({
					color: "hsl(45,"+l+"%,"+l+"%)",
				})				
				if (l==0){
					clearInterval(this.data.light);
				}
			}, time);
		}
		// 闪光弹效果
		else if (this.data.id==3){
			clearInterval(this.data.light);
			console.log("tap");
			let time=20;
			let l=0;
			let lighten=true;
			this.data.light=setInterval(() => {
				if(lighten&&l<100){
					l+=50;
				}else{
					l-=4;
					lighten=false;
				}
				this.setData({
					color: "hsl(0,0%,"+l+"%)",
				})				
				if (l==0){
					clearInterval(this.data.light);
				}
			}, time);			
		}
	},

	handleTouchStart(){
		// 枪火开启
		if (this.data.id==2){
			console.log("start");
			let time=45;
			let lighten=false;
			this.data.light=setInterval(() => {
				if (lighten){
					this.setData({color:"black"});
					lighten=false
				}else{
					this.setData({color:"hsl(45,100%,75%)"});
					lighten=true				
				}
			}, time);
		}
	},

	handleTouchEnd(){
		// 枪火关闭
		if (this.data.id==2){
			console.log("end");
			clearInterval(this.data.light);
			this.setData({color:"black"})
		}
	},

  onUnload(){
    wx.setScreenBrightness({
      value: this.data.brightness,
		})
		clearInterval(this.data.light);
  }
})