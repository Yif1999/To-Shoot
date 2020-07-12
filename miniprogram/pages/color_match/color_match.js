//index.js
//获取应用实例
import ColorThief from '../../utils/color-thief.js'
import {
  rgbToHex,
  uuid,
  colorsEqual,
  saveBlendent
} from '../../utils/util.js'
const app = getApp()
const STATE_EMPTY = 0;
const STATE_LOADING = 1;
const STATE_SUCCEED = 2;
Page({
  data: {
    imgPath: null,
    colors: [],
    imgInfo: {},
    colorCount: 5,
    state: STATE_EMPTY
  },
  chooseImg: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          imgPath: res.tempFilePaths[0],
          state: STATE_LOADING,
        })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: (imgInfo) => {
            let {
              width,
              height,
              imgPath
            } = imgInfo;
            let scale = 0.8 * this.screenWidth / Math.max(width, height);
            let canvasWidth = Math.floor(scale * width);
            let canvasHeight = Math.floor(scale * height);
            this.setData({
              imgInfo,
              canvasScale: scale,
              canvasWidth,
              canvasHeight
            });
            let quality = 1;
            console.log(quality);
            this.colorThief.getPalette({
              width: canvasWidth,
              height: canvasHeight,
              imgPath: res.tempFilePaths[0],
              colorCount: this.data.colorCount,
              quality
            }, (colors) => {
              console.log('colors', colors);
              if (colors) {
                colors = colors.map((color) => {
                  return ('#' + rgbToHex(color[0], color[1], color[2]))
                })
                this.setData({
                  colors,
                  state: STATE_SUCCEED
                })
              }
            });
          }
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.colorThief = new ColorThief('imageHandler');

    wx.getSystemInfo({
      success: ({
        screenWidth
      }) => {
        this.screenWidth = screenWidth;
      }
    })
  },
  copyColorInfo(){
    wx.setClipboardData({
      data: this.data.colors[0]+'\n'+this.data.colors[1]+'\n'+this.data.colors[2]+'\n'+this.data.colors[3]+'\n'+this.data.colors[4],
    })
  }
})