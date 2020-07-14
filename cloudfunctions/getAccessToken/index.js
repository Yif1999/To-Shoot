// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
cloud.init()
let db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let res= await db.collection('access_token').get();
  const wxContext = cloud.getWXContext()
  const page = event.page
		const scene = event.scene
		const appid = 'wxb36513df41963ea5',
			secret = '363709021e808c6338d66b523fc6018a';
		const AccessToken_options = {
			method: 'GET',
			url: 'https://api.weixin.qq.com/cgi-bin/token',
			qs: {
				appid,
				secret,
				grant_type: 'client_credential'
			},
			json: true
    };
	// 判断是否已有token值
	if (!res.data.length){
    const resultValue = await rp(AccessToken_options);	
    await db.collection('access_token').add({
      data:{
        _openid:wxContext.OPENID,
        accessToken:resultValue.access_token,
        expiresIn:resultValue.expires_in,
        createTime:Date.now(),
      }
    })
    return await (resultValue.access_token);
  }
  // 判断是否已过期
  else if (res.data[0].expiresIn*1000<(Date.now()-res.data[0].createTime)){
    const resultValue = await rp(AccessToken_options);	
    await db.collection('access_token').doc(res.data[0]._id).update({
      data:{
        _openid:wxContext.OPENID,
        accessToken:resultValue.access_token,
        expiresIn:resultValue.expires_in,
        createTime:Date.now(),
      },
    })
    return await (resultValue.access_token);
  }
  //  已有token且有效
  else{
    return await (res.data[0].accessToken);
  }
}
