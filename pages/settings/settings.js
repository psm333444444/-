Page({
  data: {
    settings: {
      notifications: true,
      autoPlay: false,
      darkMode: false,
      fontSize: 'medium',
      cacheSize: '0KB'
    },
    fontSizes: ['小', '中', '大'],
    fontSizeIndex: 1
  },

  onLoad() {
    this.loadSettings();
    this.getCacheSize();
  },

  // 加载设置
  loadSettings() {
    const settings = wx.getStorageSync('appSettings');
    if (settings) {
      this.setData({ settings });
    }
  },

  // 保存设置
  saveSettings() {
    wx.setStorageSync('appSettings', this.data.settings);
  },

  // 切换通知
  toggleNotifications(e) {
    const settings = this.data.settings;
    settings.notifications = e.detail.value;
    this.setData({ settings });
    this.saveSettings();
    wx.showToast({ 
      title: settings.notifications ? '已开启通知' : '已关闭通知', 
      icon: 'none' 
    });
  },

  // 切换自动播放
  toggleAutoPlay(e) {
    const settings = this.data.settings;
    settings.autoPlay = e.detail.value;
    this.setData({ settings });
    this.saveSettings();
  },

  // 切换深色模式
  toggleDarkMode(e) {
    const settings = this.data.settings;
    settings.darkMode = e.detail.value;
    this.setData({ settings });
    this.saveSettings();
    wx.showToast({ 
      title: settings.darkMode ? '已开启深色模式' : '已关闭深色模式', 
      icon: 'none' 
    });
  },

  // 切换字体大小
  changeFontSize(e) {
    const index = e.detail.value;
    const sizes = ['small', 'medium', 'large'];
    const settings = this.data.settings;
    settings.fontSize = sizes[index];
    this.setData({ 
      settings,
      fontSizeIndex: index
    });
    this.saveSettings();
    wx.showToast({ 
      title: `字体已设为${this.data.fontSizes[index]}`, 
      icon: 'none' 
    });
  },

  // 获取缓存大小
  getCacheSize() {
    try {
      const res = wx.getStorageInfoSync();
      const size = res.currentSize;
      let cacheSize = '';
      if (size < 1024) {
        cacheSize = size + 'KB';
      } else {
        cacheSize = (size / 1024).toFixed(2) + 'MB';
      }
      this.setData({ 'settings.cacheSize': cacheSize });
    } catch (e) {
      console.log('获取缓存大小失败');
    }
  },

  // 清除缓存
  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除所有缓存数据吗？这不会清除您的账号信息。',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '清除中...' });
          setTimeout(() => {
            try {
              const userInfo = wx.getStorageSync('userInfo');
              const feedbackList = wx.getStorageSync('feedbackList');
              wx.clearStorageSync();
              // 恢复重要数据
              if (userInfo) wx.setStorageSync('userInfo', userInfo);
              if (feedbackList) wx.setStorageSync('feedbackList', feedbackList);
              
              this.getCacheSize();
              wx.hideLoading();
              wx.showToast({ title: '清除成功', icon: 'success' });
            } catch (e) {
              wx.hideLoading();
              wx.showToast({ title: '清除失败', icon: 'none' });
            }
          }, 1000);
        }
      }
    });
  },

  // 检查更新
  checkUpdate() {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: (res) => {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(() => {
          wx.showToast({ title: '更新失败，请稍后重试', icon: 'none' });
        });
      } else {
        wx.showToast({ title: '已是最新版本', icon: 'none' });
      }
    });
  },

  // 查看用户协议
  showUserAgreement() {
    wx.showModal({
      title: '用户协议',
      content: '欢迎使用两航起义纪念馆小程序。\n\n本小程序旨在弘扬爱国主义精神，传承历史文化。使用本小程序即表示您同意遵守相关法律法规。',
      showCancel: false
    });
  },

  // 查看隐私政策
  showPrivacyPolicy() {
    wx.showModal({
      title: '隐私政策',
      content: '我们重视您的隐私保护。\n\n• 我们仅收集必要的小程序运行数据\n• 您的个人信息不会分享给第三方\n• 您可以随时在设置中清除缓存',
      showCancel: false
    });
  },

  // 返回
  goBack() {
    wx.navigateBack();
  }
});
