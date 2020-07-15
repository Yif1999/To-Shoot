// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({env:cloud.DYNAMIC_CURRENT_ENV})

// 云函数入口函数
exports.main = async (event, context) => {
	let fileID=event.fileID;
	let url= await cloud.getTempFileURL({
		fileList:[fileID]
	});
	return await cloud.openapi.img.superresolution({
		imgUrl:url.fileList[0].tempFileURL
	})
	
}