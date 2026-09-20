Page({

  goMap(){
    // 直接打开两航起义展馆地图，不需要拿手机GPS
    wx.openLocation({
      latitude: 39.201,
      longitude: 117.567,
      name:"两航起义展馆",
      address:"天津市东丽区张贵庄老机场",
      scale:14
    })
  },

  goBack(){
    wx.navigateBack()
  }
})