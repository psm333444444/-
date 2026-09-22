Page({
  data: {
    feedbackType: 0,
    feedbackTypes: ['功能建议', 'BUG反馈', '内容错误', '其他问题'],
    content: '',
    contact: '',
    images: [],
    canSubmit: false
  },

  onLoad() {
    this.checkCanSubmit();
  },

  // 选择反馈类型
  selectType(e) {
    this.setData({ feedbackType: e.detail.value });
  },

  // 输入内容
  onContentInput(e) {
    this.setData({ content: e.detail.value });
    this.checkCanSubmit();
  },

  // 输入联系方式
  onContactInput(e) {
    this.setData({ contact: e.detail.value });
  },

  // 检查是否可提交
  checkCanSubmit() {
    const canSubmit = this.data.content.trim().length >= 10;
    this.setData({ canSubmit });
  },

  // 选择图片
  chooseImage() {
    const remaining = 3 - this.data.images.length;
    if (remaining <= 0) {
      wx.showToast({ title: '最多上传3张图片', icon: 'none' });
      return;
    }

    wx.chooseMedia({
      count: remaining,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = res.tempFiles.map(f => f.tempFilePath);
        this.setData({
          images: [...this.data.images, ...newImages]
        });
      }
    });
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({ images });
  },

  // 预览图片
  previewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: this.data.images
    });
  },

  // 提交反馈
  submitFeedback() {
    if (!this.canSubmit) return;

    const { feedbackType, feedbackTypes, content, contact, images } = this.data;

    // 模拟提交
    wx.showLoading({ title: '提交中...' });

    setTimeout(() => {
      wx.hideLoading();
      
      // 保存到本地
      const feedbackList = wx.getStorageSync('feedbackList') || [];
      feedbackList.unshift({
        id: Date.now(),
        type: feedbackTypes[feedbackType],
        content,
        contact,
        images,
        createTime: new Date().toLocaleString(),
        status: '已提交'
      });
      wx.setStorageSync('feedbackList', feedbackList);

      wx.showModal({
        title: '提交成功',
        content: '感谢您的反馈！我们会认真处理每一条建议。',
        showCancel: false,
        success: () => {
          wx.navigateBack();
        }
      });
    }, 1500);
  },

  // 返回
  goBack() {
    wx.navigateBack();
  }
});
