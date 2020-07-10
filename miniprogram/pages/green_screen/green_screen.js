import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

Page({

	data: {
		bgColor:["#00FF00","#0000FF","#FFFF00"],
		num:0,
		show:true,
		clickNum:3,
		lastTapTime:0,
    checked:true,
    brightness:0.5,
    height:0,
    width:0,
    statusBarHeight:0,
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
  },

  changeBrightness(slide){
    wx.setScreenBrightness({
      value:slide.detail.value,
    })
  },

	showPopup() {
    this.setData({ show: true });
  },

  onClose() {
		this.setData({ show: false });
		Toast('三击屏幕重新打开弹窗');
  },
	
	mutiClick:function(e){
    var me=this;
    var curTime = e.timeStamp 
    var lastTime = me.data.lastTapTime; //第一次获取为零
    
      if (curTime - lastTime < 500) {
        me.setData({clickNum:me.data.clickNum+1})
      }else{
        me.setData({clickNum:1})
      }
      // console.log("me.data.clickNum:",me.data.clickNum);
      if(me.data.clickNum==3){
				console.log("触发成功");
				this.showPopup();
      }
    me.setData({
      lastTapTime: curTime
    })
	},
	
	onChange({ detail }) {
		console.log(detail);
    this.setData({ 
			checked: detail 
		});
  },

  handleBack(e){
    wx.navigateBack({
      delta: 0,
    })
  },

  changeGreen(e){
    this.setData({
      num:0
    })
  },
  changeBlue(e){
    this.setData({
      num:1
    })
  },
  changeYellow(e){
    this.setData({
      num:2
    })
  },
  onUnload(){
    wx.setScreenBrightness({
      value: this.data.brightness,
    })
  }
})