Page({
  data: {
    userInfo: null,
    hasLogin: false
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 3 });
    }
    // 检查本地缓存的用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ userInfo, hasLogin: true });
    }
  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        wx.setStorageSync('userInfo', res.userInfo);
        this.setData({ userInfo: res.userInfo, hasLogin: true });
        wx.showToast({ title: '登录成功', icon: 'success' });
      },
      fail: () => {
        wx.showToast({ title: '授权被拒绝', icon: 'none' });
      }
    });
  },

  goHistory() {
    wx.navigateTo({ url: '/pages/history/history' });
  },

  goQuiz() {
    wx.navigateTo({ url: '/pages/quiz/quiz' });
  },

  goFavorite() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goSettings() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goFeedback() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goAbout() {
    wx.showModal({
      title: '关于我们',
      content: '两航起义纪念馆小程序，弘扬爱国主义精神，传承历史文化。',
      showCancel: false
    });
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          this.setData({ userInfo: null, hasLogin: false });
          wx.showToast({ title: '已退出', icon: 'success' });
        }
      }
    });
  }
});
