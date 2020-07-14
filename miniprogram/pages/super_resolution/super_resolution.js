var util = require('../../utils/util.js');
// pages/super_resolution/super_resolution.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		localImg:null,
		fileID:null,
		imgURL:null,
		media_id:null,
		needDelete:false,
		loading:false,
	},

	// 选择图片并上传
	chooseImg: function(callBack) {
		var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function(res) {
				const imgURL=res.tempFilePaths[0];
				let cloudPath="super_resolution/"+util.genUUID()+imgURL.match(/\.[^.]+?$/)[0];	
					wx.cloud.uploadFile({
						cloudPath:cloudPath,
						filePath:imgURL,
						success:res=>{
							console.log(res);
							that.setData({
								fileID:res.fileID,
								needDelete:true,
								localImg:imgURL
							})
							wx.cloud.getTempFileURL({
								fileList: [res.fileID],
								success: res => {
									that.setData({
										imgURL:res.fileList[0].tempFileURL
									})
								},
								fail: console.error
							})
						}
					})
      }
		});

		
	},
	
	// 超分辨率请求并下载
	handleClick(){
		let that=this;
		that.setData({loading:true})
		const {imgURL}=this.data;
		const	{needDelete}=this.data;
		const	{fileID}=this.data;
		console.log(imgURL);
		wx.cloud.callFunction({
			name:'getAccessToken',
		}).then((token)=>{
			wx.request({
				url: "https://api.weixin.qq.com/cv/img/superresolution",
				data: {
					img_url: imgURL,
					access_token: token.result,
				},
				method: 'POST',
				dataType: "json",
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success:function(res){
					wx.downloadFile({
						url: "https://api.weixin.qq.com/cgi-bin/media/get?access_token="+token.result+"&media_id="+res.data.media_id,
						success:function(res){	
							wx.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success:function(){
									wx.showToast({
										title: '已保存至相册',
										icon: 'success',
										mask: true,
									})
									if (needDelete){
										wx.cloud.deleteFile({
											fileList:[fileID]
										})
									}
									that.setData({loading:false})
								},
								fail:function(res){
									wx.showToast({
										title: '保存失败',
										image:'../../images/failed.svg',
										mask: true,
									})
									that.setData({loading:false})
								}
							})
						}
					})
				}
			})
		})
	},

	onUnload(){
		const {needDelete}=this.data;
		const {fileID}=this.data;
		if (needDelete){
			wx.cloud.deleteFile({
				fileList:[fileID]
			})
		}
	}


})