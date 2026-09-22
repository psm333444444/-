Page({
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 1 });
    }
  },

  goMap() {
    wx.openLocation({
      latitude: 39.201,
      longitude: 117.567,
      name: "两航起义展馆",
      address: "天津市东丽区张贵庄老机场",
      scale: 14
    });
  }
});
