import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";

Page({

	data: {
    show:true,
		clickNum:3,
		lastTapTime:0,
    brightness:0.5,
    height:0,
    width:0,
    rgb: 'rgb(0,255,0)',//初始值
    pick: false
  },
  
  onShow(){
    wx.getScreenBrightness({
      success: (option) => {
        this.setData({
          brightness:option.value,
        })
      },
    })
    let rgb=wx.getStorageSync('color');
    if (rgb){
      this.setData({
        rgb
      })
    }
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
		Toast('单击屏幕重新打开弹窗');
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
      if(me.data.clickNum==1){
				console.log("触发成功");
				this.showPopup();
      }
    me.setData({
      lastTapTime: curTime
    })
	},

  handleBack(e){
    wx.navigateBack({
      delta: 0,
    })
  },

  toPick: function () {
    this.setData({
      pick: true
    })
  },

  pickColor(e) {
    let rgb = e.detail.color;
    this.setData({
      rgb
    })
  },

  onUnload(){
    wx.setScreenBrightness({
      value: this.data.brightness,
    })
    wx.setStorageSync('color', this.data.rgb)
  }
})