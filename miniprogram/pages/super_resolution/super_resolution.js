var util = require('../../utils/util.js');
// pages/super_resolution/super_resolution.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		localImg:null,
		fileID:null,
		needDelete:false,
		loading:false,
		enable:false,
		UUID:null
	},

	// 选择图片并上传
	chooseImg: function(callBack) {
		var that = this;
		if (that.data.needDelete){
			wx.cloud.deleteFile({
				fileList:[that.data.fileID]
			});
			wx.setStorageSync('SR_tmp', null);
			that.setData({needDelete:false})
		}
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function(res) {	
				const imgURL=res.tempFilePaths[0];
				wx.getFileInfo({
					filePath: imgURL,
					success(res){
						if (res.size/1024>2048){
							wx.showToast({
								title: '图片过大',
								image:'../../images/failed.png',
								mask:true
							})
						}
						else{
							let UUID=util.genUUID();
							let cloudPath="super_resolution/"+UUID+imgURL.match(/\.[^.]+?$/)[0];	
							wx.cloud.uploadFile({
								cloudPath:cloudPath,
								filePath:imgURL,
								success:res=>{
									console.log(res);
									that.setData({
										fileID:res.fileID,
										needDelete:true,
										enable:true,
										localImg:imgURL,
										UUID:UUID
									});
									wx.setStorageSync('SR_tmp', res.fileID)
								}
							})
						}	
					}
				})
      }
		});
	},
	
	// 超分辨率
	async handleClick(){
		let that=this;
		that.setData({loading:true})
		const	{needDelete}=that.data;
		const	{fileID}=that.data;
		const	{UUID}=that.data;
		let getMediaId=await wx.cloud.callFunction({
			name:'superResolution',
			data:{
				fileID:fileID,
			}
		})
		const mediaId=getMediaId.result.mediaId;
		console.log(mediaId);
		
		let getToken= await wx.cloud.callFunction({
			name:'getAccessToken'
		})
		const token=getToken.result;
		wx.cloud.callFunction({
			name:'getMedia',
			data:{
				mediaId:mediaId,
				token:token,
				UUID:UUID
			},
			success(res){
				const cloudID=res.result.fileID;
				console.log(cloudID);				
				wx.cloud.downloadFile({
					fileID:cloudID
				}).then(res=>{
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
								wx.cloud.callFunction({
									name:'deleteFile',
									data:{
										fileList:cloudID
									}
								})
							}
							that.setData({loading:false,enable:false,needDelete:false})
						},
						fail:function(res){
							wx.showToast({
								title: '保存失败',
								image:'../../images/failed.png',
								mask: true,
							})
							if(needDelete){
								wx.cloud.callFunction({
									name:'deleteFile',
									data:{
										fileList:cloudID
									}
								})
							}
							that.setData({loading:false})
						}
					})
				}).catch(err=>{
					console.log(err);		
					wx.showToast({
						title: '下载失败',
						image:'../../images/failed.png',
						mask: true,
					})
					if(needDelete){
						wx.cloud.callFunction({
							name:'deleteFile',
							data:{
								fileList:cloudID
							}
						})
					}
					
				})
				// 云函数直接返回buffer
				// console.log(res.result);
				// wx.getFileSystemManager().writeFile({
				// filePath:wx.env.USER_DATA_PATH + "/tmp.jpg",
				// encoding:'binary',
				// data:res.result,
				// success(){
				// 	wx.saveImageToPhotosAlbum({
				// 		filePath: wx.env.USER_DATA_PATH + "/tmp.jpg",
				// 		success:function(){
				// 			wx.showToast({
				// 				title: '已保存至相册',
				// 				icon: 'success',
				// 				mask: true,
				// 			})
				// 			if (needDelete){
				// 				wx.cloud.deleteFile({
				// 					fileList:[fileID]
				// 				})
				// 			}
				// 			that.setData({loading:false,enable:false})
				// 		},
				// 		fail:function(res){
				// 			wx.showToast({
				// 				title: '保存失败',
				// 				image:'../../images/failed.png',
				// 				mask: true,
				// 			})
				// 			that.setData({loading:false})
				// 		}
				// 	})
				// },
				// })
			},
			fail(err){
				console.log(err);
				wx.showToast({
					title: '图片过大',
					image:'../../images/failed.png',
					mask: true,
				});
				that.setData({loading:false,enable:false})
			}
		})
	},

	onShow(){
		const fileID=wx.getStorageSync('SR_tmp');
		if (fileID){
			this.setData({
				needDelete:true,
				fileID:fileID
			})
		}
	},

	onUnload(){
		const {needDelete}=this.data;
		const {fileID}=this.data;
		if (needDelete){
			wx.cloud.deleteFile({
				fileList:[fileID]
			});
			this.setData({needDelete:false});
			wx.setStorageSync('SR_tmp', null);
		}
	}
})