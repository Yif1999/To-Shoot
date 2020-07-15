// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp=require('request-promise')
cloud.init({env:cloud.DYNAMIC_CURRENT_ENV})

// 云函数入口函数
exports.main = async (event, context) => {
	try{
		const mediaId=event.mediaId;
		const token=event.token;
		const UUID=event.UUID
		const mediaGet={
			url:'https://api.weixin.qq.com/cgi-bin/media/get?access_token='+token+"&media_id="+mediaId,
			encoding:null,
		}
		const media=await rp(mediaGet);
		const file= await cloud.uploadFile({
			cloudPath:'super_resolution/'+UUID+'tmp.jpg',
			fileContent:media
		})
		return file
	}
	catch(err){
		return err
	}
}