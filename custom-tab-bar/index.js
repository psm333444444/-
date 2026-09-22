Component({
  data: {
    active: 0,
    list: [
      { pagePath: "/pages/index/index", text: "首页" },
      { pagePath: "/pages/scenic/scenic", text: "导览" },
      { pagePath: "/pages/ai/ai", text: "AI" },
      { pagePath: "/pages/profile/profile", text: "我的" }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.url;
      wx.switchTab({ url });
    }
  }
});
