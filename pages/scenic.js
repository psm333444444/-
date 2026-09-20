Page({
  data:{
    tip:""
  },
  getPositionAndNav(){
    this.setData({tip:"正在获取您当前位置，请允许定位权限"});
    wx.getLocation({
      type:"gcj02",
      success: (res)=>{
        this.setData({tip:"定位成功，打开地图规划路线"});
        wx.openLocation({
          latitude: 39.201,
          longitude: 117.567,
          name:"两航起义展馆",
          address:"天津市东丽区张贵庄老机场",
          scale:14
        })
      },
      fail:()=>{
        this.setData({tip:"定位失败，请开启定位权限"})
      }
    })
  },
  goBack(){
    wx.navigateBack()
  }
})